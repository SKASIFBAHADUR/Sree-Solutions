"use client";

import React from 'react';
import Silk from './Silk';
import styles from './ServicesSection.module.css';
import ChromaGrid, { ChromaItem } from './ChromaGrid';
import Reveal from './animations/Reveal';

interface GenericServicesSectionProps {
  id: string;
  title: React.ReactNode;
  items: ChromaItem[];
  bgWhite?: boolean;
  silkProps?: {
    speed?: number;
    scale?: number;
    color?: string;
    noiseIntensity?: number;
    rotation?: number;
  };
  gridProps?: {
    radius?: number;
    columns?: number;
    rows?: number;
    damping?: number;
    fadeOut?: number;
  };
}

export default function GenericServicesSection({
  id,
  title,
  items,
  bgWhite = false,
  silkProps = {},
  gridProps = {}
}: GenericServicesSectionProps) {
  return (
    <section className={`${styles.section} ${bgWhite ? styles.bgWhite : ''}`} id={id}>
      {!bgWhite && (
        <div className={styles.silkContainer}>
          <Silk
            speed={silkProps.speed ?? 1.5}
            scale={silkProps.scale ?? 0.2}
            color={silkProps.color ?? "#ffffff"}
            noiseIntensity={silkProps.noiseIntensity ?? 1.2}
            rotation={silkProps.rotation ?? 0.4}
          />
        </div>
      )}

      <div className={styles.container}>
        <Reveal variant="fadeInUp" delay={0.1}>
          <h2 className={`${styles.sectionTitle} ${bgWhite ? styles.titleDark : ''}`}>{title}</h2>
        </Reveal>

        <div className="w-full flex justify-center" style={{ marginTop: '4rem' }}>
          <ChromaGrid
            items={items}
            radius={gridProps.radius ?? 300}
            columns={gridProps.columns ?? 3}
            rows={gridProps.rows ?? 1}
            damping={gridProps.damping ?? 0.4}
            fadeOut={gridProps.fadeOut ?? 0.5}
          />
        </div>
      </div>
    </section>
  );
}
