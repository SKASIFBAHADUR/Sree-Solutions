import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { optimize as optimizeSvg } from "svgo";
import ffmpegPath from "ffmpeg-static";
import { spawn } from "node:child_process";

const root = process.cwd();
const publicDir = path.join(root, "public");
const reportPath = path.join(root, "media-optimization-report.json");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const SVG_EXT = ".svg";
const VIDEO_EXTS = new Set([".mp4", ".mov", ".m4v", ".avi", ".webm"]);

const results = {
  processed: [],
  skipped: [],
  errors: [],
};

function classifyImage(filePath) {
  const lower = filePath.toLowerCase();
  if (lower.includes("hero")) return 1920;
  if (
    lower.includes("thumb") ||
    lower.includes("icon") ||
    lower.includes("logo") ||
    lower.includes("client")
  ) {
    return 400;
  }
  return 1200;
}

function isBackgroundVideo(filePath) {
  const lower = filePath.toLowerCase();
  return lower.includes("hero") || lower.includes("background") || lower.includes("bg");
}

async function getAllFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return getAllFiles(fullPath);
      return fullPath;
    })
  );
  return files.flat();
}

async function sizeOf(filePath) {
  const stat = await fs.stat(filePath);
  return stat.size;
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    if (!ffmpegPath) {
      reject(new Error("ffmpeg-static binary not available"));
      return;
    }
    const child = spawn(ffmpegPath, args, { stdio: "ignore" });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg failed with code ${code}`));
    });
  });
}

async function optimizeRasterImage(filePath, ext) {
  const originalSize = await sizeOf(filePath);
  const maxWidth = classifyImage(filePath);
  const parsed = path.parse(filePath);
  const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);
  const avifPath = path.join(parsed.dir, `${parsed.name}.avif`);

  const image = sharp(filePath, { failOn: "none" }).rotate();
  const meta = await image.metadata();

  const width =
    meta.width && meta.width > maxWidth
      ? maxWidth
      : meta.width || maxWidth;

  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    await image
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 70, effort: 6 })
      .toFile(webpPath);

    await sharp(filePath, { failOn: "none" })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 50, effort: 8 })
      .toFile(avifPath);
  } else if (ext === ".webp") {
    const tmp = path.join(parsed.dir, `${parsed.name}.tmp.webp`);
    await image
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 70, effort: 6 })
      .toFile(tmp);
    const tmpSize = await sizeOf(tmp);
    if (tmpSize < originalSize) await fs.rename(tmp, filePath);
    else await fs.unlink(tmp);
  } else if (ext === ".avif") {
    const tmp = path.join(parsed.dir, `${parsed.name}.tmp.avif`);
    await image
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 50, effort: 8 })
      .toFile(tmp);
    const tmpSize = await sizeOf(tmp);
    if (tmpSize < originalSize) await fs.rename(tmp, filePath);
    else await fs.unlink(tmp);
  }

  let generatedSize = 0;
  if (await exists(webpPath)) generatedSize += await sizeOf(webpPath);
  if (await exists(avifPath)) generatedSize += await sizeOf(avifPath);

  results.processed.push({
    type: "image",
    file: path.relative(root, filePath),
    originalSize,
    generatedSize,
    maxWidth,
  });
}

async function optimizeVectorImage(filePath) {
  const original = await fs.readFile(filePath, "utf8");
  const before = Buffer.byteLength(original, "utf8");
  const optimized = optimizeSvg(original, {
    multipass: true,
    plugins: ["preset-default"],
  });

  if (!optimized.data) {
    results.skipped.push({
      type: "svg",
      file: path.relative(root, filePath),
      reason: "SVGO produced empty output",
    });
    return;
  }

  const after = Buffer.byteLength(optimized.data, "utf8");
  if (after < before) {
    await fs.writeFile(filePath, optimized.data, "utf8");
    results.processed.push({
      type: "svg",
      file: path.relative(root, filePath),
      originalSize: before,
      optimizedSize: after,
    });
  } else {
    results.skipped.push({
      type: "svg",
      file: path.relative(root, filePath),
      reason: "No size improvement",
    });
  }
}

async function optimizeVideo(filePath, ext) {
  const originalSize = await sizeOf(filePath);
  const parsed = path.parse(filePath);
  const sourcePath = filePath;
  const outputMp4 = path.join(parsed.dir, `${parsed.name}.mp4`);
  const outputWebm = path.join(parsed.dir, `${parsed.name}.webm`);
  const tempMp4 = path.join(parsed.dir, `${parsed.name}.tmp.mp4`);

  const background = isBackgroundVideo(filePath);
  const crfMp4 = background ? "30" : "27";
  const bitrateMp4 = background ? "1200k" : "1800k";
  const crfWebm = background ? "35" : "31";
  const bitrateWebm = background ? "900k" : "1400k";
  const scaleFilter = "scale='min(1920,iw)':-2";

  await runFfmpeg([
    "-y",
    "-i",
    sourcePath,
    "-map_metadata",
    "-1",
    "-vf",
    scaleFilter,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    crfMp4,
    "-b:v",
    bitrateMp4,
    "-maxrate",
    bitrateMp4,
    "-bufsize",
    `${Number.parseInt(bitrateMp4, 10) * 2}k`,
    "-movflags",
    "+faststart",
    "-c:a",
    "aac",
    "-b:a",
    background ? "96k" : "128k",
    tempMp4,
  ]);

  await runFfmpeg([
    "-y",
    "-i",
    sourcePath,
    "-map_metadata",
    "-1",
    "-vf",
    scaleFilter,
    "-c:v",
    "libvpx-vp9",
    "-crf",
    crfWebm,
    "-b:v",
    bitrateWebm,
    "-row-mt",
    "1",
    "-deadline",
    "good",
    "-cpu-used",
    "2",
    "-c:a",
    "libopus",
    "-b:a",
    background ? "80k" : "96k",
    outputWebm,
  ]);

  await fs.rename(tempMp4, outputMp4);

  const optimizedMp4Size = await sizeOf(outputMp4);
  const optimizedWebmSize = await sizeOf(outputWebm);

  // Keep .mov as source fallback but prefer .mp4/.webm.
  if (ext === ".mov") {
    results.skipped.push({
      type: "video",
      file: path.relative(root, filePath),
      reason: "Original .mov retained as legacy fallback",
    });
  }

  results.processed.push({
    type: "video",
    file: path.relative(root, filePath),
    originalSize,
    optimizedMp4Size,
    optimizedWebmSize,
    background,
  });
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const files = await getAllFiles(publicDir);

  for (const filePath of files) {
    const ext = path.extname(filePath).toLowerCase();
    try {
      if (IMAGE_EXTS.has(ext)) {
        await optimizeRasterImage(filePath, ext);
      } else if (ext === SVG_EXT) {
        await optimizeVectorImage(filePath);
      } else if (VIDEO_EXTS.has(ext)) {
        await optimizeVideo(filePath, ext);
      } else {
        results.skipped.push({
          type: "other",
          file: path.relative(root, filePath),
          reason: "Unsupported extension",
        });
      }
    } catch (error) {
      results.errors.push({
        file: path.relative(root, filePath),
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  await fs.writeFile(reportPath, JSON.stringify(results, null, 2), "utf8");
  console.log(`Optimization complete. Report: ${path.relative(root, reportPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
