import { useEffect, useRef } from "react";

const clients = [
  {
    id: 1,
    src: "/gallery/IMG_7030.JPG",
    alt: "Experience Dubai Skyline with Sree Seva Consultancy",
    featured: true,
  },
  {
    id: 2,
    src: "/gallery/IMG_7169.JPG",
    alt: "Explore the beauty of Bali with our curated tours",
  },
  {
    id: 3,
    src: "/gallery/IMG_7288.JPG",
    alt: "Professional business summits in Paris",
  },
  {
    id: 4,
    src: "/gallery/IMG_7309.JPG",
    alt: "Modern Singapore skyline during our trade visit",
  },
  {
    id: 5,
    src: "/gallery/IMG_7334.JPG",
    alt: "Majestic Swiss Alps corporate retreat",
  },
  {
    id: 6,
    src: "/gallery/IMG_7566.JPG",
    alt: "Innovation and culture in Tokyo",
  },
  {
    id: 7,
    src: "/gallery/IMG_7594.JPG",
    alt: "Strategic forums in New York City",
  },
];

/* ─── Star ornament SVG ─── */
const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: 18, height: 18, fill: "#c9a96e", opacity: 0.8 }}
  >
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

/* ─── Arrow SVG ─── */
const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 14, height: 14, transition: "transform 0.3s ease" }}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ─── Single Card ─── */
const ClientCard = ({ client, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (!("IntersectionObserver" in window)) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
          observer.unobserve(card);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const staggerDelay = [0.05, 0.12, 0.2, 0.28, 0.36, 0.44, 0.52][index] ?? 0;

  return (
    <article
      ref={cardRef}
      aria-label={client.alt}
      role="listitem"
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow:
          "0 4px 16px rgba(26,22,18,.07), 0 12px 40px rgba(26,22,18,.06)",
        opacity: 0,
        transform: "translateY(36px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${staggerDelay}s,
                     transform 0.7s cubic-bezier(0.22,1,0.36,1) ${staggerDelay}s,
                     box-shadow 0.55s cubic-bezier(0.22,1,0.36,1)`,
        gridRow: client.featured ? "span 2" : undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.012)";
        e.currentTarget.style.boxShadow =
          "0 8px 30px rgba(26,22,18,.12), 0 24px 60px rgba(26,22,18,.10)";
        const img = e.currentTarget.querySelector("img");
        const overlay = e.currentTarget.querySelector(".trc-r-overlay");
        if (img) {
          img.style.transform = "scale(1.07)";
          img.style.filter = "brightness(1.02) saturate(1.08)";
        }
        if (overlay && !client.featured) overlay.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow =
          "0 4px 16px rgba(26,22,18,.07), 0 12px 40px rgba(26,22,18,.06)";
        const img = e.currentTarget.querySelector("img");
        const overlay = e.currentTarget.querySelector(".trc-r-overlay");
        if (img) {
          img.style.transform = "scale(1)";
          img.style.filter = "brightness(.96) saturate(.92)";
        }
        if (overlay && !client.featured) overlay.style.opacity = "0";
      }}
    >
      <img
        src={client.src}
        alt={client.alt}
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          minHeight: client.featured ? 600 : 280,
          objectFit: "cover",
          transition:
            "transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease",
          filter: "brightness(.96) saturate(.92)",
        }}
      />

      {/* Overlay */}
      <div
        className="trc-r-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: client.featured
            ? "linear-gradient(to top, rgba(26,22,18,.72) 0%, rgba(26,22,18,.12) 42%, transparent 100%)"
            : "linear-gradient(to top, rgba(26,22,18,.78) 0%, rgba(26,22,18,.18) 50%, transparent 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "26px 24px",
          opacity: client.featured ? 0.3 : 0,
          transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </article>
  );
};

/* ─── Main Section Component ─── */
export default function ToursClientsSection() {
  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <section
        aria-label="Our Tours & Travels Clients"
        style={{
          background: "#faf8f4",
          padding: "clamp(80px, 10vw, 140px) clamp(20px, 6vw, 100px)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Background glow — top-right */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #e8d5b0 0%, transparent 70%)",
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />
        {/* Background glow — bottom-left */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -200,
            left: -140,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #e8d5b0 0%, transparent 70%)",
            opacity: 0.25,
            pointerEvents: "none",
          }}
        />

        {/* ── Header ── */}
        <header
          style={{
            textAlign: "center",
            maxWidth: 680,
            margin: "0 auto clamp(52px, 7vw, 90px)",
            position: "relative",
          }}
        >
          {/* Label */}
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#c9a96e",
              marginBottom: 18,
            }}
          >
            <span
              style={{
                display: "block",
                width: 32,
                height: 1,
                background: "#c9a96e",
                opacity: 0.7,
              }}
            />
            Our Client Experiences
            <span
              style={{
                display: "block",
                width: 32,
                height: 1,
                background: "#c9a96e",
                opacity: 0.7,
              }}
            />
          </p>

          {/* Title */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(38px, 5.5vw, 68px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#1a1612",
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
            }}
          >
            Our Tours &amp;{" "}
            <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Travels</em>{" "}
            Clients
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "clamp(15px, 1.4vw, 17px)",
              color: "#7a7060",
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            Real moments captured from our valued clients as they explore the
            world—guided by expertise, elevated by trust.
          </p>
        </header>

        {/* ── Ornament ── */}
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            margin: "0 auto 52px",
          }}
        >
          <span
            style={{
              display: "block",
              width: 60,
              height: 1,
              background: "linear-gradient(to right, transparent, #c9a96e)",
            }}
          />
          <StarIcon />
          <span
            style={{
              display: "block",
              width: 60,
              height: 1,
              background: "linear-gradient(to left, transparent, #c9a96e)",
            }}
          />
        </div>

        {/* ── Grid ── */}
        <div
          role="list"
          className="trc-r-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(16px, 2vw, 28px)",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          {clients.map((client, index) => (
            <ClientCard key={client.id} client={client} index={index} />
          ))}
        </div>

        {/* ── CTA ── */}
        <div
          style={{
            textAlign: "center",
            marginTop: "clamp(48px, 6vw, 80px)",
            position: "relative",
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "#7a7060",
              margin: "0 0 20px",
              letterSpacing: "0.04em",
              fontWeight: 300,
            }}
          >
            Over 200+ client journeys crafted worldwide
          </p>
          <a
            href="#contact"
            aria-label="Plan your client journey"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 36px",
              background: "#1a1612",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: "none",
              borderRadius: 50,
              cursor: "pointer",
              textDecoration: "none",
              transition: "background 0.35s ease, transform 0.3s ease, box-shadow 0.35s ease",
              boxShadow: "0 6px 24px rgba(26,22,18,.18)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#c9a96e";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 10px 32px rgba(201,169,110,.35)";
              const arrow = e.currentTarget.querySelector("svg");
              if (arrow) arrow.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1a1612";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 6px 24px rgba(26,22,18,.18)";
              const arrow = e.currentTarget.querySelector("svg");
              if (arrow) arrow.style.transform = "translateX(0)";
            }}
          >
            Plan Your Journey
            <ArrowIcon />
          </a>
        </div>

        {/* ── Responsive styles injected via <style> tag ── */}
        <style>{`
          @media (max-width: 900px) {
            .trc-r-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 560px) {
            .trc-r-grid {
              grid-template-columns: 1fr !important;
            }
            .trc-r-overlay {
              opacity: 1 !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}

