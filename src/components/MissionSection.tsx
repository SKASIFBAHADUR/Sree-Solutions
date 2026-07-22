"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './MissionSection.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MissionSection() {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Initial setup to prevent flash
    gsap.set([ringRef.current, textRef.current], { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Animates when 80% of the section is in view
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(ringRef.current,
      { x: 150, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(textRef.current,
        { x: -150, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=1" // Overlap animations by 1 second
      );
  }, { scope: containerRef });

  return (
    <section id="about-us" ref={containerRef} className={styles.section}>
      <div className={styles.backgroundQuotes}>
        <span className={styles.quoteMarkLeft}>&ldquo;</span>
        <span className={styles.quoteMarkRight}>&rdquo;</span>
      </div>

      <div className={styles.contentWrapper}>
        <div ref={ringRef} className={styles.ringContainer}>
          <img
            src="/OurMission/Circular-Ring.webp"
            alt="Cinematic Smoke Ring"
            width={800}
            height={800}
            className={styles.smokeRing}
            style={{ height: 'auto' }}
          />
        </div>

        <div ref={textRef} className={styles.textContent}>
          <div className={styles.iconQuote}>&ldquo;</div>
          <h2 className={styles.heading}>OUR MISSION</h2>
          <div className={styles.paragraph}>
            <p>Our objective is to establish an independent Bharat where knowledge becomes actual power.</p>
            <p className={styles.highlight}>SREE SOLUTIONS IS A MOVEMENT TO MAKE EVERY INDIAN UNSTOPPABLE.</p>
          </div>
          <div className={styles.signature}>Sree Solutions</div>
        </div>
      </div>

      <div className={styles.glowCircle}></div>
    </section>
  );
}
