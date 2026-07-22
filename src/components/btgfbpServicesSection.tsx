"use client";

import React from 'react';
import GenericServicesSection from './GenericServicesSection';

const businessItems = [
  { image: "/services/medical-advisor.png",  title: "Medical Assistance",  subtitle: "Healthcare & Hospital Support",      url: "/services/medical-assistant" },
  { image: "/services/tours-travels.png",    title: "Travel & Tourism",    subtitle: "Domestic & International Trips",      url: "/tours-and-travels" },
];

export default function BtgfbpServicesSection() {
  return (
    <GenericServicesSection
      id="btgfbp-services"
      bgWhite={true}
      title={
        <>
          Healthcare &amp; <br />
          Lifestyle Services
        </>
      }
      items={businessItems}
      silkProps={{
        speed: 2.0,
        scale: 0.5,
        color: "#f59e0b",
        noiseIntensity: 1.8,
        rotation: 0.2
      }}
      gridProps={{
        radius: 320,
        columns: 2,
        rows: 1,
        damping: 0.4,
        fadeOut: 0.6
      }}
    />
  );
}
