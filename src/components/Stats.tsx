"use client";

import React from 'react';
import MagicBento from './MagicBento';

export default function Stats() {
  return (
    <section id="stats" className="w-full min-h-screen flex items-center justify-center bg-white py-24">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <MagicBento 
          textAutoHide={true}
          enableStars={false}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={400}
          particleCount={12}
          glowColor="168, 224, 99"
          disableAnimations={false}
        />
      </div>
    </section>
  );
}
