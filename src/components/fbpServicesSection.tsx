"use client";

import React from 'react';
import GenericServicesSection from './GenericServicesSection';

const fbpItems = [
  { image: "/services/digital-marketing.png", title: "Digital Marketing",               subtitle: "Growth & Online Presence",        url: "/services/digital-marketing" },
  { image: "/services/banking.png",            title: "Banking & Financial Services",    subtitle: "Loans, Accounts & Advisory",      url: "/services/bank-services" },
  { image: "/services/income-tax.png",         title: "Income Tax & Business Compliance", subtitle: "Filing, GST & Audit Support",      url: "/services/income-tax" },
  { image: "/services/insurance-advisor.png",  title: "Insurance Services",              subtitle: "Life, Health & General Cover",    url: "/services/insurance" },
  { image: "/services/epfo-esio.png",          title: "EPFO & ESIC Services",            subtitle: "PF, ESI & Labour Compliance",     url: "/services/epfo" },
];

export default function FbpServicesSection() {
  return (
    <GenericServicesSection
      id="fbp-services"
      bgWhite={true}
      title={
        <>
          Business &amp; <br />
          Financial Services
        </>
      }
      items={fbpItems}
      silkProps={{
        speed: 1.5,
        scale: 0.2,
        color: "#6366f1",
        noiseIntensity: 1.2,
        rotation: 0.4
      }}
      gridProps={{
        radius: 300,
        columns: 5,
        rows: 1,
        damping: 0.4,
        fadeOut: 0.5
      }}
    />
  );
}
