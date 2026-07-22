"use client";
// Force Vite HMR

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./ServicesSection.module.css";
import chromaStyles from "./ChromaGrid.module.css";
import starImg from "../images/star.png";

interface CardItem {
  image: string;
  title: string;
  subtitle: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

const row1Items: CardItem[] = [
  {
    image: "/services/sree-seva.png",
    title: "Sree Seva",
    subtitle: "Government & citizen services",
    gradient: "linear-gradient(145deg, #1a2a1a, #0d1f0d)",
    borderColor: "#22c55e",
    url: "/services/sree-seva",
  },
  {
    image: "/services/legal-advisor.png",
    title: "Legal Facilitator",
    subtitle: "Documentation & legal support",
    gradient: "linear-gradient(145deg, #1a1a2a, #0d0d1f)",
    borderColor: "#6366f1",
    url: "/services/legal-service-facilitator",
  },
];

const row2Items: CardItem[] = [
  {
    image: "/services/banking.png",
    title: "Finance & Protection",
    subtitle: "Banking, insurance & medical support",
    gradient: "linear-gradient(145deg, #18181b, #09090b)",
    url: "/services/bank-services",
  },
  {
    image: "/services/career-guru.png",
    title: "Career & Education",
    subtitle: "Guidance & global study paths",
    gradient: "linear-gradient(145deg, #18181b, #09090b)",
    url: "/services/career-guru",
  },
  {
    image: "/services/digital-marketing.png",
    title: "Business & Growth",
    subtitle: "Digital marketing & ventures",
    gradient: "linear-gradient(145deg, #18181b, #09090b)",
    url: "/services/digital-marketing",
  },
];

function ServiceCard({ card }: { card: CardItem }) {
  const handleMouseMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleClick = () => {
    if (!card.url) return;
    if (card.url.startsWith("http")) {
      window.open(card.url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = card.url;
    }
  };

  return (
    <article
      className={chromaStyles.chromaCard}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={
        {
          "--card-border": card.borderColor || "transparent",
          "--card-gradient": card.gradient || "linear-gradient(145deg, #18181b, #09090b)",
          cursor: card.url ? "pointer" : "default",
        } as React.CSSProperties
      }
    >
      <div className={chromaStyles.imgWrapper}>
        <img src={card.image} alt={card.title} />
      </div>
      <footer className={chromaStyles.info}>
        <h3 className={chromaStyles.title}>{card.title}</h3>
        <p className={chromaStyles.subtitle}>{card.subtitle}</p>
      </footer>
    </article>
  );
}

export default function ServicesSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const setX = gsap.quickSetter(el, "--x", "px");
    const setY = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    setX(width / 2);
    setY(height / 2);
  }, []);

  return (
    <section className={`${styles.section} ${styles.bgWhite}`} id="services">
      <div className={styles.container}>

        {/* Top row: 2 cards on left + heading on right */}
        <div className={styles.topRow}>
          <div className={styles.row1Cards}>
            {row1Items.map((card, i) => (
              <ServiceCard key={i} card={card} />
            ))}
          </div>
          <div
            className={`${styles.headingCol} ${styles.headingImg}`}
            style={{ backgroundImage: `url(${starImg})` }}
          >
            <h2 className={`${styles.sectionTitle} ${styles.titleDark}`}>
              Government &<br />
              Legal Services
            </h2>
          </div>
        </div>

        {/* Bottom row: 3 existing cards */}
        <div
          ref={rootRef}
          className={`${chromaStyles.chromaGrid} ${styles.row2Grid}`}
          style={{ "--cols": 3 } as React.CSSProperties}
        >
          {row2Items.map((card, i) => (
            <ServiceCard key={i} card={card} />
          ))}
        </div>

      </div>
    </section>
  );
}
