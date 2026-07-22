import { useState, useEffect, useRef } from "react";

/* ─────────────────────────── DATA ─────────────────────────── */
const EPFO_CARDS = [
    {
        id: "employer",
        icon: "🏢",
        title: "Employer",
        accent: "#1B5E3B",
        tag: "EPFO",
        items: [
            { name: "Registration", slug: "epfo-employer-registration" },
            { name: "ECR Filings", slug: "epfo-employer-ecr-filings" },
            { name: "Monthly Compliance", slug: "epfo-employer-monthly-compliance" },
            { name: "Employee Onboarding & KYC", slug: "epfo-employer-onboarding-kyc" },
            { name: "Auditing & Book Keeping", slug: "epfo-employer-auditing-book-keeping" },
        ],
    },
    {
        id: "employee",
        icon: "👤",
        title: "Employee",
        accent: "#1B5E3B",
        tag: "EPFO",
        items: [
            { name: "UAN Generation & Activation", slug: "epfo-employee-uan-activation", externalUrl: "https://passbook.epfindia.gov.in/MemberPassBook/login" },
            { name: "Member KYC", slug: "epfo-employee-member-kyc", externalUrl: "https://www.epfindia.gov.in/site_en/KYCS.php" },
            { name: "e-Nomination", slug: "epfo-employee-e-nomination", externalUrl: "https://www.epfindia.gov.in/site_hi/index.php" },
            { name: "Claims & Transfer", slug: "epfo-employee-claims-transfer" },
            { name: "Final Settlements", slug: "epfo-employee-final-settlements" },
            { name: "Death & Disability Claims", slug: "epfo-employee-death-disability-claims" },
            { name: "Joint Declaration", slug: "epfo-employee-joint-declaration" },
            { name: "Grievance Registration (EPFiGMS)", slug: "epfo-employee-grievance" },
        ],
    },
    {
        id: "pensioner",
        icon: "🧓",
        title: "Pensioner",
        accent: "#1B5E3B",
        tag: "EPFO",
        items: [
            { name: "Pension Application — Service / Family / Permanent Disability", slug: "epfo-pensioner-application" },
            { name: "Scheme Certificate", slug: "epfo-pensioner-scheme-certificate" },
            { name: "Life Certificate", slug: "epfo-pensioner-life-certificate" },
            { name: "KYC Updates", slug: "epfo-pensioner-kyc-updates" },
        ],
    },
];



const career_guru_services = [
    {
        id: "career guru",
        icon: "🏢",
        title: "Students",
        accent: "#1B5E3B",
        tag: "Career Guru",
        items: [
            { name: "Apaar ID registration", slug: "epfo-employer-registration" },
            { name: "Admissions, scholarship & fee payment, etc", slug: "epfo-employer-ecr-filings" },
            { name: "Certified tech/non-tech courses by IIT Delhi & Mumbai", slug: "epfo-employer-monthly-compliance" },
            { name: "Registration for IIT,JEE,NEEТ", slug: "epfo-employer-onboarding-kyc" },
            {
                name: "Registration and study materials for all competitive exams", slug: "epfo - employer - auditing - book - keeping"
            },
        ],
    },
    {
        id: "career guru",
        icon: "👤",
        title: "Job Seekers",
        accent: "#1B5E3B",
        tag: "Career Guru",
        items: [
            { name: "Job notifications of government and nongovernment", slug: "epfo-employee-uan-activation", externalUrl: "https://passbook.epfindia.gov.in/MemberPassBook/login" },
            { name: "Professional CV making", slug: "epfo-employee-member-kyc", externalUrl: "https://www.epfindia.gov.in/site_en/KYCS.php" },
            {
                name: "Interview Preparation", slug: "epfo - employee - e - nomination", externalUrl: "https://www.epfindia.gov.in/site_hi/index.php"
            },
            {
                name: "Career Guidance (NCS)", slug: "epfo - employee - claims - transfer"
            },
            { name: "Final Settlements", slug: "epfo-employee-final-settlements" },
            { name: "Death & Disability Claims", slug: "epfo-employee-death-disability-claims" },
            { name: "Joint Declaration", slug: "epfo-employee-joint-declaration" },
            { name: "Grievance Registration (EPFiGMS)", slug: "epfo-employee-grievance" },
        ],
    },
    {
        id: "pensioner",
        icon: "🧓",
        title: "Pensioner",
        accent: "#1B5E3B",
        tag: "EPFO",
        items: [
            { name: "Pension Application — Service / Family / Permanent Disability", slug: "epfo-pensioner-application" },
            { name: "Scheme Certificate", slug: "epfo-pensioner-scheme-certificate" },
            { name: "Life Certificate", slug: "epfo-pensioner-life-certificate" },
            { name: "KYC Updates", slug: "epfo-pensioner-kyc-updates" },
        ],
    },
];


const ESIC_ITEMS = [
    { name: "Registration & Filing", slug: "esic-registration-filing" },
    { name: "Hospitalisation Guidance", slug: "esic-hospitalisation-guidance" },
    { name: "E-Pehchan Card", slug: "esic-e-pehchan-card" },
    { name: "e-Nomination", slug: "esic-e-nomination-esic" },
    { name: "Claims — Medical, Maternity, Death & PwB", slug: "esic-claims" },
];


const WHY_ITEMS = [
    { icon: "🔍", title: "Proven Success in Complex Government Cases", desc: "We specialise in resolving complex government service cases that others consider difficult or impossible. Our experience navigating regulatory systems allows us to find solutions where most give up." },
    { icon: "⏱️", title: "Deep Government Process Expertise", desc: "With extensive knowledge of EPFO, ESIC, labour departments, and regulatory frameworks, we understand how government systems actually work — helping clients move forward faster and with confidence." },
    { icon: "📜", title: "Strategic Problem Solving", desc: "Every case is unique.We analyse each situation carefully and develop strategic approaches to resolve complicated compliance and documentation challenges." },
    { icon: "⚖️", title: "Strong Track Record of Results", desc: "Over the years, we have successfully resolved numerous challenging government cases, building a reputation for reliability, persistence, and real results." },
    { icon: "🤝", title: "End-to-End Case Management", desc: "From documentation and submissions to follow-ups and resolution, we manage the entire process so our clients don’t have to navigate complex government systems alone." },
    { icon: "🎓", title: "Trusted by Businesses for Difficult Matters", desc: "Clients approach us when cases become complicated. Our expertise and commitment ensure that even the most challenging matters receive the attention and resolution they deserve." },
];

const PROCESS_STEPS = [
    { num: "01", title: "Consultation", desc: "We listen to your requirement, assess your situation honestly, and explain the full process — free of obligation." },
    { num: "02", title: "Documentation Review", desc: "We audit your existing documents, identify gaps, and guide you in preparing a complete, accurate submission package." },
    { num: "03", title: "Submission & Follow-Up", desc: "We submit through official channels and track progress, liaising with the department professionally on your behalf." },
    { num: "04", title: "Completion & Support", desc: "We confirm resolution, deliver all outcomes to you, and remain available for any subsequent needs or queries." },
];

/* ─────────────────────────── HOOKS ─────────────────────────── */
function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

/* ─────────────────────────── SUB-COMPONENTS ─────────────────────────── */

function SectionLabel({ children, light = false }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, justifyContent: "center" }}>
            <div style={{ width: 28, height: 2, background: light ? "#E8A83A" : "#1B5E3B" }} />
            <span style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase",
                color: light ? "#E8A83A" : "#1B5E3B", fontWeight: 800
            }}>{children}</span>
            <div style={{ width: 28, height: 2, background: light ? "#E8A83A" : "#1B5E3B" }} />
        </div>
    );
}

function ServiceCard({ card, delay = 0, visible }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.65s ease ${delay} s, transform 0.65s ease ${delay} s, box - shadow 0.3s ease`,
                background: "#FFFFFF",
                border: "1px solid #D9EDD6",
                borderRadius: 0,
                overflow: "hidden",
                boxShadow: hovered
                    ? "0 16px 48px rgba(27,94,59,0.18)"
                    : "0 4px 20px rgba(27,94,59,0.07)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div style={{
                background: "linear-gradient(90deg, #1B5E3B 0%, #2E7D52 100%)",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                position: "relative",
                overflow: "hidden",
            }}>
                <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: 6,
                    background: "#E8A83A",
                }} />
                <span style={{ fontSize: 22, marginLeft: 4 }}>{card.icon}</span>
                <div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}>{card.tag}</div>
                    <div style={{ fontFamily: "'Lora', serif", fontSize: 20, fontWeight: 700, color: "#FFFFFF", letterSpacing: 0.3 }}>{card.title}</div>
                </div>
                <div style={{ position: "absolute", right: 0, top: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 52px 52px 0", borderColor: `transparent rgba(255, 255, 255, 0.05) transparent transparent` }} />
            </div>

            <div style={{ padding: "24px 28px 28px", flex: 1 }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                    {card.items.map((item, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                            <span style={{
                                width: 7, height: 7, borderRadius: "50%",
                                background: "#E8A83A",
                                flexShrink: 0, marginTop: 6,
                            }} />
                            <a
                                href={item.externalUrl || `/ services / ${item.slug} `}
                                target={item.externalUrl ? "_blank" : "_self"}
                                rel={item.externalUrl ? "noopener noreferrer" : ""}
                                onClick={(e) => {
                                    if (!item.externalUrl) {
                                        e.preventDefault();
                                        window.history.pushState({}, '', `/ services / ${item.slug} `);
                                        window.dispatchEvent(new Event('popstate'));
                                    }
                                }}
                                style={{
                                    fontFamily: "'Nunito Sans', sans-serif",
                                    fontSize: 14.5, color: "#2C3E30", lineHeight: 1.6, fontWeight: 400,
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "color 0.2s ease",
                                }}
                                onMouseEnter={(e) => e.target.style.color = "#1B5E3B"}
                                onMouseLeave={(e) => e.target.style.color = "#2C3E30"}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{
                padding: "0 28px 20px",
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.3s ease",
            }}>
                <button style={{
                    background: "#1B5E3B", color: "#fff", border: "none",
                    padding: "8px 20px", fontSize: 12, fontFamily: "'Nunito Sans', sans-serif",
                    fontWeight: 700, letterSpacing: 1, cursor: "pointer", width: "100%",
                    textTransform: "uppercase",
                }}>
                    Get Assistance →
                </button>
            </div>
        </div>
    );
}

function ESICCard({ visible }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s, box-shadow 0.3s ease",
                background: "#FFFFFF",
                border: "1px solid #D9EDD6",
                overflow: "hidden",
                boxShadow: hovered ? "0 16px 48px rgba(27,94,59,0.18)" : "0 4px 20px rgba(27,94,59,0.07)",
            }}
        >
            <div style={{
                background: "linear-gradient(90deg, #1B5E3B 0%, #2E7D52 70%, #145230 100%)",
                padding: "18px 32px",
                display: "flex", alignItems: "center", gap: 16,
                position: "relative", overflow: "hidden",
            }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "#E8A83A" }} />
                <span style={{ fontSize: 26, marginLeft: 4 }}>🏥</span>
                <div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: 3.5, textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}>ESIC</div>
                    <div style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: "#FFFFFF" }}>ESIC Services</div>
                </div>
                <div style={{ position: "absolute", right: 0, top: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 72px 72px 0", borderColor: "transparent rgba(255,255,255,0.04) transparent transparent" }} />
            </div>

            <div style={{ padding: "28px 36px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px 40px" }}>
                {ESIC_ITEMS.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#E8A83A", flexShrink: 0, marginTop: 6 }} />
                        <a
                            href={item.externalUrl || `/ services / ${item.slug} `}
                            target={item.externalUrl ? "_blank" : "_self"}
                            rel={item.externalUrl ? "noopener noreferrer" : ""}
                            onClick={(e) => {
                                if (!item.externalUrl) {
                                    e.preventDefault();
                                    window.history.pushState({}, '', `/ services / ${item.slug} `);
                                    window.dispatchEvent(new Event('popstate'));
                                }
                            }}
                            style={{
                                fontFamily: "'Nunito Sans', sans-serif",
                                fontSize: 14.5, color: "#2C3E30", lineHeight: 1.6,
                                textDecoration: "none",
                                cursor: "pointer",
                                transition: "color 0.2s ease",
                            }}
                            onMouseEnter={(e) => e.target.style.color = "#1B5E3B"}
                            onMouseLeave={(e) => e.target.style.color = "#2C3E30"}
                        >
                            {item.name}
                        </a>
                    </div>
                ))}
            </div>

            <div style={{ padding: "0 36px 24px", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "all 0.3s ease" }}>
                <button style={{
                    background: "#1B5E3B", color: "#fff", border: "none",
                    padding: "10px 32px", fontSize: 12, fontFamily: "'Nunito Sans', sans-serif",
                    fontWeight: 700, letterSpacing: 1, cursor: "pointer", textTransform: "uppercase",
                }}>
                    Get ESIC Assistance →
                </button>
            </div>
        </div>
    );
}

/* ─────────────────────────── MAIN PAGE ─────────────────────────── */

export default function GovernmentServices() {
    const [heroRef, heroIn] = useInView(0.1);
    const [introRef, introIn] = useInView(0.1);
    const [epfoRef, epfoIn] = useInView(0.1);
    const [esicRef, esicIn] = useInView(0.1);

    const [whyRef, whyIn] = useInView(0.1);
    const [processRef, processIn] = useInView(0.1);
    const [ctaRef, ctaIn] = useInView(0.1);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div style={{ fontFamily: "'Nunito Sans', sans-serif", background: "#FFFFFF", color: "#1C2B1E", overflowX: "hidden", margin: 0, padding: 0 }}>
            <style>{`
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Nunito+Sans:wght@300;400;600;700;800&display=swap');
        *, *:: before, *::after { box - sizing: border - box; margin: 0; padding: 0; }
        html { scroll - behavior: smooth; }

        .btn - green {
    background: #1B5E3B; color: #fff; border: none;
    padding: 15px 40px; font - family: 'Nunito Sans', sans - serif;
    font - size: 15px; font - weight: 800; letter - spacing: 0.5px;
    cursor: pointer; transition: all 0.3s ease;
    clip - path: polygon(0 0, calc(100 % - 10px) 0, 100 % 10px, 100 % 100 %, 10px 100 %, 0 calc(100 % - 10px));
}
        .btn - green:hover { background: #145230; transform: translateY(-2px); box - shadow: 0 10px 28px rgba(27, 94, 59, 0.4); }

        .btn - outline - green {
    background: transparent; color: #1B5E3B;
    border: 2px solid #1B5E3B; padding: 13px 36px;
    font - family: 'Nunito Sans', sans - serif; font - size: 15px;
    font - weight: 800; cursor: pointer; transition: all 0.3s ease;
}
        .btn - outline - green:hover { background: #1B5E3B; color: #fff; transform: translateY(-2px); }

        .stat - card { text - align: center; padding: 20px 28px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(232, 168, 58, 0.25); }

        .process - step: not(: last - child)::after {
    content: '';
    position: absolute; top: 36px; left: calc(100 % + 16px);
    width: calc(100 % - 32px); height: 2px;
    background: repeating - linear - gradient(90deg, #1B5E3B 0, #1B5E3B 8px, transparent 8px, transparent 16px);
}

@media(max - width: 900px) {
          .epfo - grid { grid - template - columns: 1fr 1fr!important; }
          .why - grid { grid - template - columns: 1fr 1fr!important; }
          .process - grid { grid - template - columns: 1fr 1fr!important; }
          .hero - stats { gap: 20px!important; }
}
@media(max - width: 600px) {
          .epfo - grid { grid - template - columns: 1fr!important; }
          .why - grid { grid - template - columns: 1fr!important; }
          .process - grid { grid - template - columns: 1fr!important; }
}
`}</style>

            {/* ══════════════════ HERO ══════════════════ */}
            <section style={{
                minHeight: "100vh",
                background: "#FFFFFF", // Fallback color changed to white
                display: "flex", alignItems: "center",
                padding: "120px 48px 80px",
                position: "relative", overflow: "hidden",
            }}>
                <div ref={heroRef} style={{ maxWidth: 1200, width: "100%", margin: "0 auto", position: "relative", zIndex: 3 }}>
                    <div style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
                        <span style={{ background: "rgba(27,94,59,0.08)", border: "1px solid rgba(27,94,59,0.25)", color: "#1B5E3B", padding: "5px 16px", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", fontWeight: 800 }}>
                            ✦ Authorised Facilitation Support
                        </span>
                    </div>

                    <div style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(28px)", transition: "all 0.65s ease 0.1s", marginTop: 28 }}>
                        <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(36px, 5.5vw, 70px)", fontWeight: 700, color: "#1C2B1E", lineHeight: 1.12, maxWidth: 820 }}>
                            EPFO & ESIC Assistance<br />
                            <span style={{ color: "#1B5E3B" }}>Made Clear, Compliant</span><br />
                            <span style={{ color: "#1C2B1E" }}>& Accessible.</span>
                        </h1>
                    </div>

                    <div style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(28px)", transition: "all 0.65s ease 0.2s", marginTop: 24 }}>
                        <p style={{ fontSize: "clamp(15px, 1.8vw, 19px)", color: "#4A5C4D", maxWidth: 580, lineHeight: 1.8, fontWeight: 300 }}>
                            We help employers, employees, and pensioners navigate EPFO and ESIC processes with precision and integrity — through official channels, with full transparency, and without shortcuts.
                        </p>
                    </div>

                    <div style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(28px)", transition: "all 0.65s ease 0.3s", marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <button className="btn-green" onClick={() => scrollTo("contact")}>📋 Book Free Consultation</button>
                        <button className="btn-outline-green" style={{ color: "#1B5E3B", borderColor: "#1B5E3B" }} onClick={() => scrollTo("services")}>
                            View All Services
                        </button>
                    </div>

                    <div className="hero-stats" style={{
                        opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(28px)",
                        transition: "all 0.65s ease 0.45s",
                        marginTop: 64, display: "flex", gap: 32, flexWrap: "wrap"
                    }}>
                        {[["6000+", "Cases Handled"], ["4", "Service Categories"], ["100%", "Ethical Process"], ["₹0", "Hidden Charges"]].map(([num, label]) => (
                            <div className="stat-card" key={label} style={{ background: "#F4F8F5", border: "1px solid rgba(27,94,59,0.15)" }}>
                                <div style={{ fontFamily: "'Lora', serif", fontSize: 32, fontWeight: 700, color: "#1B5E3B", lineHeight: 1 }}>{num}</div>
                                <div style={{ fontSize: 11, color: "#5A7060", letterSpacing: 2, textTransform: "uppercase", marginTop: 6, fontWeight: 700 }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════ INTRO ══════════════════ */}
            <section id="intro" style={{ padding: "90px 48px", background: "#FFFFFF" }}>
                <div ref={introRef} style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ opacity: introIn ? 1 : 0, transform: introIn ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease", textAlign: "center" }}>
                        <SectionLabel>What We Do</SectionLabel>
                        <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 700, color: "#1C2B1E", marginTop: 10 }}>
                            Simplifying India's Most Important<br />
                            <span style={{ color: "#1B5E3B" }}>Social Security Systems</span>
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", marginTop: 56 }} className="epfo-grid">
                        <div style={{ opacity: introIn ? 1 : 0, transform: introIn ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.15s" }}>
                            <div style={{ borderLeft: "3px solid #1B5E3B", paddingLeft: 24, marginBottom: 28 }}>
                                <div style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 600, color: "#1B5E3B", marginBottom: 10 }}>EPFO — Employees' Provident Fund Organisation</div>
                                <p style={{ fontSize: 15.5, color: "#4A5C4D", lineHeight: 1.8, fontWeight: 300 }}>
                                    EPFO manages India's provident fund, pension, and insurance schemes for the organised workforce. Navigating its portals — from UAN activation to final settlements — can be complex and time-sensitive. We ensure your EPFO requirements are handled correctly, completely, and on time.
                                </p>
                            </div>
                            <div style={{ borderLeft: "3px solid #E8A83A", paddingLeft: 24 }}>
                                <div style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 600, color: "#C47E0A", marginBottom: 10 }}>ESIC — Employees' State Insurance Corporation</div>
                                <p style={{ fontSize: 15.5, color: "#4A5C4D", lineHeight: 1.8, fontWeight: 300 }}>
                                    ESIC provides medical, maternity, disability, and death benefits to employees. Getting registered, raising claims, and maintaining compliance requires careful documentation. We guide you through every ESIC process with clarity and accuracy.
                                </p>
                            </div>
                        </div>

                        <div style={{ opacity: introIn ? 1 : 0, transform: introIn ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.25s", display: "flex", flexDirection: "column", gap: 16 }}>
                            {[
                                ["🏛️", "Official Channels Only", "We submit exclusively through authorised government portals and offices."],
                                ["📋", "Accurate Documentation", "We review every document meticulously to prevent rejections before they happen."],
                                ["🔒", "Confidential & Secure", "Your personal and financial data is handled with strict professional confidentiality."],
                                ["📞", "Responsive Follow-Up", "We track and report progress proactively — you are never left wondering."],
                            ].map(([icon, title, desc]) => (
                                <div key={title} style={{ display: "flex", gap: 16, padding: "18px 20px", background: "#F4F8F5", borderLeft: "3px solid #1B5E3B" }}>
                                    <span style={{ fontSize: 24 }}>{icon}</span>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 15, color: "#1C2B1E", marginBottom: 4 }}>{title}</div>
                                        <div style={{ fontSize: 13.5, color: "#5A7060", lineHeight: 1.6, fontWeight: 300 }}>{desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════ SERVICES — EPFO ══════════════════ */}
            <section id="services" style={{ padding: "90px 48px", background: "#FFFFFF" }}>
                <div ref={epfoRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ opacity: epfoIn ? 1 : 0, transform: epfoIn ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease", marginBottom: 42 }}>
                        <SectionLabel>Our Services</SectionLabel>
                        <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 700, color: "#1C2B1E", textAlign: "center" }}>
                            Complete EPFO Services<br />
                            <span style={{ color: "#1B5E3B" }}>Employer · Employee · Pensioner</span>
                        </h2>
                        <p style={{ textAlign: "center", fontSize: 16, color: "#5A7060", maxWidth: 540, margin: "14px auto 0", lineHeight: 1.75, fontWeight: 300 }}>
                            End-to-end assistance for all EPFO-related requirements — managed ethically, accurately, and in full compliance with government procedures.
                        </p>
                    </div>

                    <div className="epfo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
                        {EPFO_CARDS.map((card, i) => (
                            <ServiceCard key={card.id} card={card} delay={i * 0.12} visible={epfoIn} />
                        ))}
                    </div>

                    <div style={{ marginTop: 24, padding: "14px 24px", background: "rgba(27,94,59,0.06)", border: "1px solid rgba(27,94,59,0.15)", display: "flex", alignItems: "center", gap: 12, opacity: epfoIn ? 1 : 0, transition: "opacity 0.6s ease 0.4s" }}>
                        <span style={{ fontSize: 16 }}>ℹ️</span>
                        <span style={{ fontSize: 13.5, color: "#3A5C40", fontWeight: 400 }}>
                            All EPFO services are facilitated exclusively through the official <strong>Unified Portal (unifiedportal-mem.epfindia.gov.in)</strong> and authorised EPFO offices. We do not bypass any official process.
                        </span>
                    </div>
                </div>
            </section>

            {/* ══════════════════ SERVICES — ESIC ══════════════════ */}
            <section style={{ padding: "0 48px 90px", background: "#FFFFFF" }}>
                <div ref={esicRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ marginBottom: 32, opacity: esicIn ? 1 : 0, transform: esicIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ flex: 1, height: 1, background: "rgba(27,94,59,0.15)" }} />
                            <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: "#1B5E3B", fontWeight: 800 }}>ESIC Services</span>
                            <div style={{ flex: 1, height: 1, background: "rgba(27,94,59,0.15)" }} />
                        </div>
                        <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, color: "#1C2B1E", textAlign: "center", marginTop: 16 }}>
                            Employees' State Insurance{" "}
                            <span style={{ color: "#1B5E3B" }}>Services</span>
                        </h2>
                    </div>

                    <ESICCard visible={esicIn} />

                    <div style={{ marginTop: 20, padding: "14px 24px", background: "rgba(232,168,58,0.07)", border: "1px solid rgba(232,168,58,0.25)", display: "flex", alignItems: "center", gap: 12, opacity: esicIn ? 1 : 0, transition: "opacity 0.6s ease 0.4s" }}>
                        <span style={{ fontSize: 16 }}>ℹ️</span>
                        <span style={{ fontSize: 13.5, color: "#5A4010", fontWeight: 400 }}>
                            All ESIC services are processed through the <strong>ESIC Portal (esic.gov.in)</strong> and linked authorised hospitals & offices. Our team ensures all claims and filings meet official requirements.
                        </span>
                    </div>
                </div>
            </section>



            {/* ══════════════════ WHY CHOOSE US ══════════════════ */}
            <section id="why-us" style={{ padding: "90px 48px", background: "#FFFFFF" }}>
                <div ref={whyRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 56, opacity: whyIn ? 1 : 0, transform: whyIn ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease" }}>
                        <SectionLabel>Why Choose Us</SectionLabel>
                        <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 700, color: "#1C2B1E", marginTop: 10 }}>
                            A Service Built on{" "}
                            <span style={{ color: "#1B5E3B" }}>Trust & Compliance</span>
                        </h2>
                    </div>

                    <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                        {WHY_ITEMS.map(({ icon, title, desc }, i) => {
                            const [hov, setHov] = useState(false);
                            return (
                                <div key={title}
                                    onMouseEnter={() => setHov(true)}
                                    onMouseLeave={() => setHov(false)}
                                    style={{
                                        opacity: whyIn ? 1 : 0,
                                        transform: whyIn ? "translateY(0)" : "translateY(28px)",
                                        transition: `opacity 0.6s ease ${(i % 3) * 0.1}s, transform 0.6s ease ${(i % 3) * 0.1}s, box-shadow 0.3s ease`,
                                        background: hov ? "#F4F8F5" : "#FFFFFF",
                                        border: `1px solid ${hov ? "#1B5E3B" : "#D9EDD6"}`,
                                        padding: "32px 28px",
                                        cursor: "default",
                                    }}>
                                    <div style={{ fontSize: 36, marginBottom: 18 }}>{icon}</div>
                                    <h3 style={{ fontFamily: "'Lora', serif", fontSize: 19, fontWeight: 600, color: "#1C2B1E", marginBottom: 10 }}>{title}</h3>
                                    <p style={{ fontSize: 14.5, color: "#5A7060", lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════ PROCESS ══════════════════ */}
            <section id="process" style={{ padding: "90px 48px", background: "#FFFFFF" }}>
                <div ref={processRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 60, opacity: processIn ? 1 : 0, transform: processIn ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease" }}>
                        <SectionLabel>Our Process</SectionLabel>
                        <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 700, color: "#1C2B1E", marginTop: 10 }}>
                            4 Clear Steps From{" "}
                            <span style={{ color: "#1B5E3B" }}>Enquiry to Resolution</span>
                        </h2>
                    </div>

                    <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }}>
                        {PROCESS_STEPS.map(({ num, title, desc }, i) => (
                            <div key={num}
                                className="process-step"
                                style={{
                                    position: "relative",
                                    opacity: processIn ? 1 : 0,
                                    transform: processIn ? "translateY(0)" : "translateY(28px)",
                                    transition: `opacity 0.6s ease ${i * 0.12} s, transform 0.6s ease ${i * 0.12} s`,
                                }}>
                                <div style={{
                                    width: 64, height: 64,
                                    background: i % 2 === 0 ? "#1B5E3B" : "#E8A83A",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    marginBottom: 20, position: "relative", zIndex: 1,
                                }}>
                                    <span style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>{num}</span>
                                </div>
                                <h3 style={{ fontFamily: "'Lora', serif", fontSize: 19, fontWeight: 600, color: "#1C2B1E", marginBottom: 10 }}>{title}</h3>
                                <p style={{ fontSize: 14.5, color: "#5A7060", lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>

                                {i < PROCESS_STEPS.length - 1 && (
                                    <div style={{
                                        position: "absolute", top: 31, left: "calc(64px + 12px)",
                                        width: "calc(100% + 28px - 64px - 12px)", height: 2,
                                        background: "repeating-linear-gradient(90deg, rgba(27,94,59,0.3) 0, rgba(27,94,59,0.3) 6px, transparent 6px, transparent 12px)",
                                    }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════ CTA ══════════════════ */}
            <section id="contact" ref={ctaRef} style={{
                padding: "90px 48px",
                background: "#FFFFFF",
                position: "relative", overflow: "hidden",
            }}>
                <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
                    <div style={{ opacity: ctaIn ? 1 : 0, transform: ctaIn ? "scale(1)" : "scale(0.95)", transition: "all 0.6s ease" }}>
                        <span style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#1B5E3B", fontWeight: 800 }}>Get Started Today</span>
                        <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, color: "#1C2B1E", marginTop: 16, lineHeight: 1.2 }}>
                            Your EPFO & ESIC<br />
                            <span style={{ color: "#1B5E3B" }}>Matter Deserves Expert Attention.</span>
                        </h2>
                        <p style={{ fontSize: 17, color: "#4A5C4D", maxWidth: 520, margin: "20px auto 0", lineHeight: 1.8, fontWeight: 300 }}>
                            Don't let paperwork delays or process confusion hold you back. Start with a free, honest consultation — no commitment required.
                        </p>

                        <div style={{ marginTop: 44, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                            <button style={{
                                background: "#E8A83A", color: "#1C2B1E", border: "none",
                                padding: "17px 44px", fontFamily: "'Nunito Sans', sans-serif",
                                fontSize: 16, fontWeight: 800, cursor: "pointer", letterSpacing: 0.3,
                                transition: "all 0.3s ease",
                                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                            }}
                                onMouseEnter={e => { e.target.style.background = "#C47E0A"; e.target.style.transform = "translateY(-2px)"; }}
                                onMouseLeave={e => { e.target.style.background = "#E8A83A"; e.target.style.transform = "translateY(0)"; }}
                                onClick={() => scrollTo("contact")}
                            >
                                📅 Book Free Consultation
                            </button>
                            <button style={{
                                background: "transparent", color: "#1B5E3B",
                                border: "1.5px solid #1B5E3B",
                                padding: "17px 44px", fontFamily: "'Nunito Sans', sans-serif",
                                fontSize: 16, fontWeight: 700, cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                                onMouseEnter={e => { e.target.style.background = "#F4F8F5"; }}
                                onMouseLeave={e => { e.target.style.background = "transparent"; }}
                                onClick={() => window.location.href = "tel:+910000000000"}
                            >
                                📞 Call Us Directly
                            </button>
                        </div>

                        <div style={{ marginTop: 36, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
                            {["Free Initial Consultation", "No Hidden Charges", "100% Lawful Process", "Timely Follow-Up"].map(p => (
                                <div key={p} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ color: "#1B5E3B", fontSize: 14 }}>✓</span>
                                    <span style={{ fontSize: 13, color: "#4A5C4D", fontWeight: 600, letterSpacing: 0.3 }}>{p}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
