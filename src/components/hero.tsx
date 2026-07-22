"use client";

import React, { useState, useRef } from 'react';
import MagicRings from './ui/MagicRings';
import LaserFlow from './ui/LaserFlow';
import RotatingText from './ui/RotatingText';

interface VideoThumbnailProps {
  id: number;
  videoSrc: string;
  posterSrc: string;
  className?: string;
}

function VideoThumbnail({ id, videoSrc, posterSrc, className = '' }: VideoThumbnailProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl group border border-white/10 bg-zinc-900 shadow-2xl transition-all hover:-translate-y-1 hover:shadow-emerald-500/20 aspect-[9/16] md:aspect-video ring-1 ring-white/10 ${className}`}>
      {!isPlaying && (
        <div 
           className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
           onClick={handlePlay}
         >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[1] pointer-events-none w-full h-full"></div>
          
          <img 
             src={posterSrc} 
             alt={`Service showcase ${id}`}
             loading="lazy"
             className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 z-0 bg-zinc-800"
          />
          
          {/* Play Button */}
          <div className="relative z-[2] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 group-hover:scale-110 group-hover:bg-emerald-500/80 group-hover:border-emerald-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <svg 
               className="w-5 h-5 md:w-6 md:h-6 text-white ml-1 drop-shadow-md" 
               fill="currentColor" 
               viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        preload="none"
        playsInline
        controls={isPlaying}
        onPause={() => setIsPlaying(false)}
        className={`w-full h-full object-cover bg-black ${isPlaying ? 'block' : 'hidden'}`}
      />
    </div>
  );
}

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen bg-white overflow-hidden">
            {/* MagicRings: sharp, clean concentric black rings */}
            <div className="absolute inset-0 w-full h-full z-0">
                <MagicRings
                    color="#16A34A"
                    colorTwo="#15803D"
                    ringCount={5}
                    speed={0.6}
                    attenuation={60}
                    lineThickness={1.5}
                    baseRadius={0.2}
                    radiusStep={0.1}
                    scaleRate={0.08}
                    opacity={1}
                    blur={0}
                    noiseAmount={0}
                    rotation={0}
                    ringGap={1.6}
                    fadeIn={0.5}
                    fadeOut={0.6}
                    followMouse={false}
                    mouseInfluence={0}
                    hoverScale={1.0}
                    parallax={0}
                    clickBurst={false}
                />
            </div>
            {/* LaserFlow: elegant, sharp vertical purple laser beam */}
            <LaserFlow
                    style={{ zIndex: 10 }}
                    horizontalBeamOffset={0.0}
                    verticalBeamOffset={-0.5}
                    verticalSizing={5.3}
                    horizontalSizing={2.15}
                    wispDensity={1.0}
                    wispIntensity={6.0}
                    wispSpeed={10.0}
                    flowSpeed={0.25}
                    flowStrength={0.15}
                    fogIntensity={0.3}
                    fogScale={0.4}
                    fogFallSpeed={0.4}
                    decay={1.2}
                    falloffStart={1.5}
                    color="#F97316"
                />
            {/* Foreground Content */}
            {/* Foreground Content */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-auto min-h-screen text-center px-4 md:px-8 -mt-[100px]">
                <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 9rem)', lineHeight: 1.1 }} className="flex flex-col xl:flex-row flex-wrap items-center justify-center gap-4 md:gap-8 font-bold tracking-tight text-zinc-800 max-w-[95vw] mx-auto">
                    <span style={{ fontSize: 'inherit' }}>Empowering Businesses with</span>
                    <RotatingText
                      texts={['Digital Marketing', 'Government Services']}
                      mainClassName="px-4 md:px-8 bg-purple-600 text-white py-2 md:py-3 justify-center rounded-full inline-flex mt-4 xl:mt-0"
                      style={{ fontSize: 'clamp(1.5rem, 4vw, 5rem)', lineHeight: 1.2 }}
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-2 md:pb-4"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={3500}
                    />
                </h1>
            </div>
        </section>
    );
}