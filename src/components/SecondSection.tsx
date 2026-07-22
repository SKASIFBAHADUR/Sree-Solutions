"use client";

import React from 'react';
import styles from './SecondSection.module.css';
import Reveal from './animations/Reveal';

export default function SecondSection() {
  return (
    <section className={styles.section}>
      {/* Background Shapes */}
      <div className={styles.shapeBottomLeft}>
        <img
          src="/OurVission/image-shape-1.webp"
          alt="Bottom Left Shape"
          width={600}
          height={300}
        />
      </div>
      <div className={styles.shapeTopRight}>
        <img
          src="/OurVission/image-shape-3.webp"
          alt="Top Right Shape"
          width={400}
          height={400}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.visionHeader}>
          <Reveal variant="clipReveal" delay={0.1}>
            <h3 className={styles.floatHeading}>
              OUR VISION
            </h3>
          </Reveal>
        </div>

        <div className={styles.paragraph}>
          <Reveal variant="fadeInUp" delay={0.3}>
            <p className={styles.floatParagraph}>
              We envision an India where every citizen is empowered, every youth finds their potential, and every dream is within reach.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
