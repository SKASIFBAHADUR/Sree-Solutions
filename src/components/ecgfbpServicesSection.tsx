"use client";

import React from 'react';
import GenericServicesSection from './GenericServicesSection';

const educationItems = [
  { image: "/services/study-abroad.png",  title: "Study Abroad & Immigration",  subtitle: "Visa, Admissions & Overseas Support", url: "/services/study-abroad" },
  { image: "/services/sree-seva.png",     title: "Career Guidance",              subtitle: "Pathfinding & Professional Advice",   url: "/services/career-guru" },
  { image: "/services/career-guru.png",   title: "SREE Academy",                 subtitle: "Skill Development & Training",        url: "/services/career-guru" },
  { image: "/services/recruitment.png",   title: "Recruitment & Placement",      subtitle: "Jobs, Hiring & Career Connect",       url: "/recruitment" },
];

export default function EcgfbpServicesSection() {
  return (
    <GenericServicesSection
      id="ecgfbp-services"
      bgWhite={true}
      title={
        <>
          Education &amp; <br />
          Career Services
        </>
      }
      items={educationItems}
      silkProps={{
        speed: 1.6,
        scale: 0.3,
        color: "#d946ef",
        noiseIntensity: 1.4,
        rotation: 0.6
      }}
      gridProps={{
        radius: 280,
        columns: 4,
        rows: 1,
        damping: 0.4,
        fadeOut: 0.5
      }}
    />
  );
}
