import { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture, type OGLRenderingContext } from 'ogl';

import './FlyingPosters.css';

type GL = OGLRenderingContext;
type OGLProgram = Program;
type OGLMesh = Mesh;
type OGLTransform = Transform;
type OGLPlane = Plane;

interface ScreenSize {
    width: number;
    height: number;
}

interface ViewportSize {
    width: number;
    height: number;
}

interface ScrollState {
    ease: number;
    current: number;
    target: number;
    last: number;
}

interface AutoBindOptions {
    include?: Array<string | RegExp>;
    exclude?: Array<string | RegExp>;
}

interface MediaParams {
    gl: GL;
    geometry: OGLPlane;
    scene: OGLTransform;
    screen: ScreenSize;
    viewport: ViewportSize;
    image: string;
    length: number;
    index: number;
    planeWidth: number;
    planeHeight: number;
    distortion: number;
}

interface CanvasParams {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    items: string[];
    planeWidth: number;
    planeHeight: number;
    distortion: number;
    scrollEase: number;
    cameraFov: number;
    cameraZ: number;
}

const vertexShader = `
precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float uPosition;
uniform float uSpeed;
uniform float uDistortion;
uniform float uTime;

varying vec2 vUv;

void main() {
  vUv = uv;
  
  vec3 newpos = position;
  
  // High-end cinematic distortion - more subtle and organic
  float dist = distance(uv, vec2(0.5));
  float wave = sin(uv.y * 2.0 + uTime * 0.5 + uPosition * 5.0) * 0.02;
  
  newpos.z += wave + sin(dist * 3.0 + uPosition) * (uDistortion * 0.1);
  newpos.x += wave + sin(uv.y * 2.0 + uPosition) * (uSpeed * 0.005);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;

varying vec2 vUv;

void main() {
  vec2 imageSize = uImageSize;
  vec2 planeSize = uPlaneSize;

  float imageAspect = imageSize.x / imageSize.y;
  float planeAspect = planeSize.x / planeSize.y;
  vec2 scale = vec2(1.0, 1.0);

  if (planeAspect > imageAspect) {
      scale.x = imageAspect / planeAspect;
  } else {
      scale.y = planeAspect / imageAspect;
  }

  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;

  gl_FragColor = texture2D(tMap, uv);
}
`;

function AutoBind(self: any, { include, exclude }: AutoBindOptions = {}) {
    const getAllProperties = (object: any): Set<[any, string | symbol]> => {
        const properties = new Set<[any, string | symbol]>();
        do {
            for (const key of Reflect.ownKeys(object)) {
                properties.add([object, key]);
            }
        } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);
        return properties;
    };

    const filter = (key: string | symbol) => {
        const match = (pattern: string | RegExp) =>
            typeof pattern === 'string' ? key === pattern : (pattern as RegExp).test(key.toString());

        if (include) return include.some(match);
        if (exclude) return !exclude.some(match);
        return true;
    };

    for (const [object, key] of getAllProperties(self.constructor.prototype)) {
        if (key === 'constructor' || !filter(key)) continue;
        const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
        if (descriptor && typeof descriptor.value === 'function') {
            self[key] = self[key].bind(self);
        }
    }
    return self;
}

function lerp(p1: number, p2: number, t: number): number {
    return p1 + (p2 - p1) * t;
}

class Media {
    gl: GL;
    geometry: OGLPlane;
    scene: OGLTransform;
    screen: ScreenSize;
    viewport: ViewportSize;
    image: string;
    length: number;
    index: number;
    planeWidth: number;
    planeHeight: number;
    distortion: number;

    program!: OGLProgram;
    plane!: OGLMesh;
    y = 0;
    z = 0;
    rotation = 0;
    stepOffset = 0;

    constructor({
        gl,
        geometry,
        scene,
        screen,
        viewport,
        image,
        length,
        index,
        planeWidth,
        planeHeight,
        distortion
    }: MediaParams) {
        this.gl = gl;
        this.geometry = geometry;
        this.scene = scene;
        this.screen = screen;
        this.viewport = viewport;
        this.image = image;
        this.length = length;
        this.index = index;
        this.planeWidth = planeWidth;
        this.planeHeight = planeHeight;
        this.distortion = distortion;

        this.createShader();
        this.createMesh();
        this.onResize();
    }

    createShader() {
        const texture = new Texture(this.gl, { generateMipmaps: false });
        this.program = new Program(this.gl, {
            depthTest: false,
            depthWrite: false,
            fragment: fragmentShader,
            vertex: vertexShader,
            uniforms: {
                tMap: { value: texture },
                uPosition: { value: 0 },
                uPlaneSize: { value: [0, 0] },
                uImageSize: { value: [0, 0] },
                uSpeed: { value: 0 },
                uDistortion: { value: this.distortion },
                uTime: { value: 0 }
            },
            cullFace: false
        });

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = this.image;
        img.onload = () => {
            texture.image = img;
            this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];
        };
    }

    createMesh() {
        this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        });
        this.plane.setParent(this.scene);
    }

    setScale() {
        this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;
        this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;
        this.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];
    }

    onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: ViewportSize } = {}) {
        if (screen) this.screen = screen;
        if (viewport) this.viewport = viewport;
        
        this.setScale();

        // Full-card step spacing ensures one-card-at-a-time visibility.
        const verticalGap = 0.9;
        this.stepOffset = this.plane.scale.y + verticalGap;
        this.y = -this.index * this.stepOffset;
        this.z = -this.index * 0.4;
        this.rotation = 0;
        
        this.plane.position.x = 0;
        this.plane.position.y = this.y;
        this.plane.position.z = this.z;
        this.plane.rotation.z = this.rotation;
    }

    update(scroll: ScrollState, velocity: number) {
        this.plane.position.y = this.y + (scroll.current * this.stepOffset);
        this.plane.position.z = this.z + (scroll.current * 0.1);

        this.program.uniforms.uPosition.value = scroll.current * 0.02;
        this.program.uniforms.uSpeed.value = velocity * 0.5;
        this.program.uniforms.uTime.value += 0.016;
    }
}

class Canvas {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    items: string[];
    planeWidth: number;
    planeHeight: number;
    distortion: number;
    scroll: ScrollState;
    cameraFov: number;
    cameraZ: number;

    renderer!: Renderer;
    gl!: GL;
    camera!: Camera;
    scene!: OGLTransform;
    planeGeometry!: OGLPlane;
    medias!: Media[];
    screen!: ScreenSize;
    viewport!: ViewportSize;
    isDown = false;
    start = 0;
    maxStep = 0;
    rafId = 0;

    constructor({
        container,
        canvas,
        items,
        planeWidth,
        planeHeight,
        distortion,
        scrollEase,
        cameraFov,
        cameraZ
    }: CanvasParams) {
        this.container = container;
        this.canvas = canvas;
        this.items = items;
        this.planeWidth = planeWidth;
        this.planeHeight = planeHeight;
        this.distortion = distortion;
        this.scroll = {
            ease: scrollEase,
            current: 0,
            target: 0,
            last: 0
        };
        this.cameraFov = cameraFov;
        this.cameraZ = cameraZ;
        this.maxStep = Math.max(items.length - 1, 0);

        AutoBind(this);
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();
        this.createGeometry();
        this.createMedias();
        this.update();
        this.addEventListeners();
    }

    createRenderer() {
        this.renderer = new Renderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio, 2)
        });
        this.gl = this.renderer.gl;
    }

    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = this.cameraFov;
        this.camera.position.z = this.cameraZ;
    }

    createScene() {
        this.scene = new Transform();
    }

    createGeometry() {
        this.planeGeometry = new Plane(this.gl, {
            heightSegments: 20,
            widthSegments: 20
        });
    }

    createMedias() {
        this.medias = this.items.map(
            (image, index) =>
                new Media({
                    gl: this.gl,
                    geometry: this.planeGeometry,
                    scene: this.scene,
                    screen: this.screen,
                    viewport: this.viewport,
                    image,
                    length: this.items.length,
                    index,
                    planeWidth: this.planeWidth,
                    planeHeight: this.planeHeight,
                    distortion: this.distortion
                })
        );
    }

    onResize() {
        const rect = this.container.getBoundingClientRect();
        this.screen = { width: rect.width, height: rect.height };
        this.renderer.setSize(this.screen.width, this.screen.height);

        this.camera.perspective({
            aspect: this.gl.canvas.width / this.gl.canvas.height
        });

        const fov = (this.camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;
        this.viewport = { width, height };

        this.medias?.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }

    setProgress(progress: number) {
        const clamped = Math.max(0, Math.min(progress, 1));
        this.scroll.target = clamped * this.maxStep;
    }

    update = () => {
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
        const velocity = this.scroll.current - this.scroll.last;
        this.scroll.last = this.scroll.current;

        this.medias?.forEach(media => media.update(this.scroll, velocity));
        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.rafId = requestAnimationFrame(this.update);
    }

    addEventListeners() {
        window.addEventListener('resize', this.onResize);
    }

    destroy() {
        window.removeEventListener('resize', this.onResize);
        cancelAnimationFrame(this.rafId);
    }
}

interface FlyingPostersProps extends React.HTMLAttributes<HTMLDivElement> {
    items?: string[];
    planeWidth?: number;
    planeHeight?: number;
    distortion?: number;
    scrollEase?: number;
    cameraFov?: number;
    cameraZ?: number;
}

export default function FlyingPosters({
    items = [],
    planeWidth = 320,
    planeHeight = 320,
    distortion = 3,
    scrollEase = 0.05,
    cameraFov = 45,
    cameraZ = 20,
    className,
    ...props
}: FlyingPostersProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const instanceRef = useRef<Canvas | null>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        instanceRef.current = new Canvas({
            container: containerRef.current,
            canvas: canvasRef.current,
            items,
            planeWidth,
            planeHeight,
            distortion,
            scrollEase,
            cameraFov,
            cameraZ
        });

        return () => {
            instanceRef.current?.destroy();
            instanceRef.current = null;
        };
    }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);

    useEffect(() => {
        let rafId = 0;

        const tick = () => {
            const container = containerRef.current;
            const instance = instanceRef.current;
            if (container && instance) {
                const section = container.closest('[data-why-choose-scroll]') as HTMLElement | null;
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
                    const totalScrollable = Math.max(rect.height - viewportHeight, 1);
                    const rawProgress = (-rect.top) / totalScrollable;
                    instance.setProgress(rawProgress);
                }
            }
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <div ref={containerRef} className={`posters-container ${className ?? ''}`} {...props}>
            <canvas ref={canvasRef} className="posters-canvas" />
        </div>
    );
}
