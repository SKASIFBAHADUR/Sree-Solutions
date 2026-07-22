"use client";

import React, { useMemo } from 'react';
import Reveal from './animations/Reveal';
import FlyingPosters from './FlyingPosters';

const escapeSvgText = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const cardsData = [
  {
    title: ["One Trusted Partner for", "All Essential Services"],
    lines: [
      "From study abroad and travel to legal,",
      "banking, insurance, medical and government",
      "services — we deliver every critical service",
      "through one unified and trusted platform."
    ]
  },
  {
    title: ["Expert-Led, Domain-Specific", "Advisory"],
    lines: [
      "Every engagement is handled by certified",
      "specialists — lawyers, consultants, banking",
      "advisors and healthcare coordinators —",
      "ensuring accurate, compliant & reliable",
      "guidance."
    ]
  },
  {
    title: ["Faster Outcomes Through Proven", "Institutional Networks"],
    lines: [
      "Our established relationships with",
      "universities, banks, hospitals and",
      "government authorities enable smoother",
      "coordination & significantly faster",
      "processing."
    ]
  },
  {
    title: ["End-to-End, Transparent &", "Personalized Support"],
    lines: [
      "From documentation and approvals to",
      "follow-ups and final delivery, we manage",
      "the entire journey with complete transparency",
      "and tailored solutions for every client."
    ]
  }
];

export default function WhyChooseUs() {
  const cardImages = useMemo(() => {
    return cardsData.map((card, index) => {
      const gradientId = `grad-${index}`;
      const colorStart = index % 2 === 0 ? '#a8e063' : '#00f0ff';
      const colorEnd = index % 2 === 0 ? '#2b5876' : '#a8e063';

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
        <defs>
          <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${colorStart}" />
            <stop offset="100%" stop-color="${colorEnd}" />
          </linearGradient>
        </defs>
        
        <rect x="20" y="20" width="560" height="760" rx="40" fill="#ffffff" stroke="url(#${gradientId})" stroke-width="4" />
        
        <!-- Title -->
        <text x="300" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#111827" text-anchor="middle">
          ${card.title.map((t, i) => `<tspan x="300" dy="${i === 0 ? 0 : 45}">${escapeSvgText(t)}</tspan>`).join('')}
        </text>
        
        <line x1="220" y1="280" x2="380" y2="280" stroke="url(#${gradientId})" stroke-width="4" stroke-linecap="round" />
        
        <!-- Description -->
        <text x="300" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="#374151" text-anchor="middle" font-weight="400" line-height="1.6">
          ${card.lines.map((l, i) => `<tspan x="300" dy="${i === 0 ? 0 : 40}">${escapeSvgText(l)}</tspan>`).join('')}
        </text>
        
        <!-- Button -->
        <g transform="translate(180, 640)">
          <rect width="240" height="64" rx="32" fill="url(#${gradientId})" opacity="0.8" />
          <text x="120" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">LEARN MORE</text>
        </g>
      </svg>`;

      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    });
  }, []);

  return (
    <section
      id="why-choose-us"
      className="relative w-full bg-white"
    >
      <div data-why-choose-scroll className="relative h-[400vh]">
        <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center overflow-hidden py-24">
          <div className="text-center z-10 mb-12">
            <Reveal variant="fadeInUp" delay={0.2}>
              <h2 className="text-4xl md:text-6xl font-bold text-black leading-tight">
                Why Choose <span className="text-[#a8e063]">Us?</span>
              </h2>
            </Reveal>
            <Reveal variant="calmFade" delay={0.4}>
              <p className="text-zinc-500 mt-4 text-sm md:text-lg max-w-2xl mx-auto">
                We combine global expertise with deep local knowledge to deliver seamless service experiences.
              </p>
            </Reveal>
          </div>

          <div className="w-full h-[600px] md:h-[800px] relative">
            <FlyingPosters
              items={cardImages}
              planeWidth={350}
              planeHeight={450}
              distortion={2}
              scrollEase={0.08}
              cameraFov={45}
              cameraZ={20}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
