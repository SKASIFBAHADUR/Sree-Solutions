"use client";

import React, { useEffect, useRef, forwardRef } from 'react';
import gsap from 'gsap';
import styles from './PillLink.module.css';

type PillLinkProps = {
  href?: string;
  onClick?: (e: any) => void;
  className?: string;
  isButton?: boolean;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> & 
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export const PillLink = forwardRef<HTMLAnchorElement | HTMLButtonElement, PillLinkProps>(({ href, onClick, className = '', isButton = false, children, ...props }, forwardedRef) => {
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const pillRef = useRef<any>(null);

  useEffect(() => {
    const layout = () => {
      const circle = circleRef.current;
      const pill = pillRef.current;
      if (!circle || !pill) return;

      const rect = pill.getBoundingClientRect();
      const { width: w, height: h } = rect;
      
      if (w === 0 || h === 0) return; // Not visible
      
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`
      });

      const labelEl = pill.querySelector(`.${styles.pillLabel}`);
      const whiteEl = pill.querySelector(`.${styles.pillLabelHover}`);

      if (labelEl) gsap.set(labelEl, { y: 0 });
      if (whiteEl) gsap.set(whiteEl, { y: h + 12, opacity: 0 });

      tlRef.current?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.8, ease: 'power3.out' }, 0);

      if (labelEl) {
        tl.to(labelEl, { y: -(h + 8), duration: 0.8, ease: 'power3.out' }, 0);
      }

      if (whiteEl) {
        tl.to(whiteEl, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0);
      }

      tlRef.current = tl;
    };

    setTimeout(layout, 100);
    window.addEventListener('resize', layout);
    return () => window.removeEventListener('resize', layout);
  }, [children]);

  const handleEnter = () => {
    tlRef.current?.play();
  };

  const handleLeave = () => {
    tlRef.current?.reverse();
  };

  const commonProps = {
    className: `${styles.pill} ${className}`,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onClick,
    ...props
  };

  const inner = (
    <>
      <span className={styles.hoverCircle} aria-hidden="true" ref={circleRef} />
      <span className={styles.labelStack}>
        <span className={styles.pillLabel}>{children}</span>
        <span className={styles.pillLabelHover} aria-hidden="true">{children}</span>
      </span>
    </>
  );

  const setRefs = (el: any) => {
    pillRef.current = el;
    if (typeof forwardedRef === 'function') forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  if (isButton) {
    return (
      <button ref={setRefs} type="button" {...(commonProps as any)}>
        {inner}
      </button>
    );
  }

  return (
    <a ref={setRefs} href={href || '/'} {...(commonProps as any)}>
      {inner}
    </a>
  );
});
