import { useState, useEffect, useRef } from "react";


const SERVICES = [
    { icon: "📋", title: "Government Documentation", desc: "We help you understand, prepare, and submit documents for government schemes, certificates, and official applications — correctly and completely." },
    { icon: "🏛️", title: "Certificate Services", desc: "Assistance with caste, income, nativity, birth, death, and other essential certificates through proper channels." },
    { icon: "🏢", title: "Municipal Services Support", desc: "Guidance on property tax, trade licenses, building permits, and local body applications without confusion." },
    { icon: "📂", title: "Application Processing Guidance", desc: "We walk you through government portals, forms, and procedures — step by step — so nothing is missed or misunderstood." },
    { icon: "💼", title: "Business Compliance Assistance", desc: "Support for business registrations, GST documents, MSME enrollment, and regulatory compliance paperwork." },
    { icon: "⚖️", title: "Legal & Compliance Guidance", desc: "Helping citizens understand their legal rights and obligations when dealing with government offices and public processes." },
];

const PROCESS = [
    { step: "01", title: "Free Consultation", desc: "We start by listening. You explain your need, and we assess what's required — honestly and without hidden commitments." },
    { step: "02", title: "Document Preparation", desc: "We guide you in gathering, organizing, and correctly completing all necessary documents as per official requirements." },
    { step: "03", title: "Submission & Follow-Up", desc: "We ensure your application reaches the right desk. We track progress and follow up on your behalf through proper channels." },
    { step: "04", title: "Completion & Ongoing Support", desc: "We confirm successful completion and remain available if any further clarification or re-submission is needed." },
];

const TESTIMONIALS = [
    { name: "Ramaiah K.", role: "Retired Teacher, Hyderabad", text: "I struggled for months trying to get my income certificate sorted. Sree Seva helped me understand exactly what was needed and guided me through the entire process. No shortcuts — just proper, honest help.", stars: 5 },
    { name: "Priya Venkatesh", role: "Small Business Owner, Vijayawada", text: "Getting my MSME registration felt impossible until I approached Sree Seva Services. They explained every step clearly. I never felt lost or misled. Truly citizen-first service.", stars: 5 },
    { name: "Mohammed Farooq", role: "Student, Warangal", text: "I needed my caste certificate urgently for a scholarship application. The team was professional, transparent about timelines, and helped me get it done through the right process. Highly recommended.", stars: 5 },
    { name: "Sulochana Devi", role: "Senior Citizen, Nellore", text: "At my age, government processes felt very overwhelming. The team at Sree Seva was patient, respectful, and explained everything simply. My pension documents were handled with care and honesty.", stars: 5 },
    { name: "Arun Teja", role: "Property Owner, Guntur", text: "Property tax corrections can be a nightmare. Sree Seva guided me through the municipal process professionally. No false promises — just clear guidance and genuine follow-up.", stars: 5 },
];


function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

function Stars({ count }) {
    return <span style={{ color: "#C8A84B", letterSpacing: 2 }}>{"★".repeat(count)}</span>;
}

function SectionLabel({ children }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 2, background: "#C8A84B" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#C8A84B", fontWeight: 600 }}>{children}</span>
        </div>
    );
}

export default function SreeSeva() {


    const [heroRef, heroIn] = useInView(0.1);
    const [missionRef, missionIn] = useInView();
    const [problemRef, problemIn] = useInView();
    const [processRef, processIn] = useInView();
    const [servicesRef, servicesIn] = useInView();
    const [whyRef, whyIn] = useInView();
    const [testiRef, testiIn] = useInView();

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FFFFFF", color: "#1A1A2E", margin: 0, padding: 0, overflowX: "hidden" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        .fade-up { opacity: 0; transform: translateY(36px); transition: opacity 0.75s ease, transform 0.75s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up.d1 { transition-delay: 0.1s; }
        .fade-up.d2 { transition-delay: 0.2s; }
        .fade-up.d3 { transition-delay: 0.3s; }
        .fade-up.d4 { transition-delay: 0.4s; }
        .fade-up.d5 { transition-delay: 0.5s; }
        .btn-primary { background: #C8A84B; color: #1A1A2E; border: none; padding: 16px 36px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; letter-spacing: 0.5px; cursor: pointer; transition: all 0.3s ease; clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }
        .btn-primary:hover { background: #B8963B; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,168,75,0.35); }
        .btn-outline { background: transparent; color: #C8A84B; border: 1.5px solid #C8A84B; padding: 14px 32px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .btn-outline:hover { background: #C8A84B; color: #1A1A2E; transform: translateY(-2px); }
        .service-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(26,26,46,0.12); }
        .service-card { transition: all 0.35s ease; }
        .faq-item { border-bottom: 1px solid #E8E4DA; }
        .process-line { position: absolute; top: 32px; left: 50%; width: calc(100% - 0px); height: 1px; background: linear-gradient(90deg, #C8A84B, transparent); z-index: 0; }
        @media(max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .testi-grid { grid-template-columns: 1fr !important; }
          .problems-grid { grid-template-columns: 1fr !important; }
        .pill { display: inline-block; background: rgba(200,168,75,0.12); color: #C8A84B; border: 1px solid rgba(200,168,75,0.3); padding: 4px 14px; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; border-radius: 2px; }
        .ornament { color: #C8A84B; font-size: 48px; line-height: 1; font-family: 'Playfair Display', serif; opacity: 0.2; position: absolute; top: -10px; left: -4px; }
      `}</style>


            {/* HERO */}
            <section id="hero" style={{ minHeight: "100vh", background: "#FFFFFF", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "120px 48px 80px" }}>
                <div ref={heroRef} style={{ maxWidth: 1200, width: "100%", margin: "0 auto" }}>
                    <div className={`fade-up${heroIn ? " visible" : ""}`}>
                        <span className="pill">Transparent · Ethical · Citizen-First</span>
                    </div>
                    <div className={`fade-up d1${heroIn ? " visible" : ""}`} style={{ marginTop: 28 }}>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6vw, 76px)", fontWeight: 800, color: "#1A1A2E", lineHeight: 1.1, maxWidth: 800 }}>
                            Your Right to Fair<br />
                            <span style={{ color: "#C8A84B" }}>Government Services</span><br />
                            Starts Here.
                        </h1>
                    </div>
                    <div className={`fade-up d2${heroIn ? " visible" : ""}`} style={{ marginTop: 24 }}>
                        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(26,26,46,0.7)", maxWidth: 580, lineHeight: 1.75, fontWeight: 300 }}>
                            Sree Seva Services helps citizens navigate government processes with clarity, honesty, and dignity. No shortcuts. No manipulation. Just proper, ethical, and professional guidance — every step of the way.
                        </p>
                    </div>
                    <div className={`fade-up d3${heroIn ? " visible" : ""}`} style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <button className="btn-primary" onClick={() => scrollTo("contact")}>Book Free Consultation</button>
                        <button className="btn-outline" onClick={() => scrollTo("services")}>Explore Services</button>
                    </div>
                    <div className={`fade-up d4${heroIn ? " visible" : ""}`} style={{ marginTop: 64, display: "flex", gap: 48, flexWrap: "wrap" }}>
                        {[["500+", "Citizens Assisted"], ["100%", "Ethical Practices"], ["0", "Hidden Charges"]].map(([num, label]) => (
                            <div key={label}>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#C8A84B" }}>{num}</div>
                                <div style={{ fontSize: 13, color: "rgba(26,26,46,0.5)", letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MISSION */}
            <section id="mission" style={{ padding: "100px 48px", background: "#fff", position: "relative" }}>
                <div ref={missionRef} style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 1 }} className="hero-grid">
                    <div>
                        <div className={`fade-up${missionIn ? " visible" : ""}`}><SectionLabel>Our Mission</SectionLabel></div>
                        <div className={`fade-up d1${missionIn ? " visible" : ""}`}>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 700, lineHeight: 1.2, color: "#1A1A2E" }}>
                                Every Citizen Deserves<br />Fair Treatment.
                            </h2>
                        </div>
                        <div className={`fade-up d2${missionIn ? " visible" : ""}`} style={{ marginTop: 24 }}>
                            <p style={{ fontSize: 17, lineHeight: 1.85, color: "#4A4A5E", fontWeight: 300 }}>
                                Sree Seva Services was founded on one simple belief: government services exist to serve the people, and every citizen has the right to access them fairly, transparently, and without confusion.
                            </p>
                            <p style={{ fontSize: 17, lineHeight: 1.85, color: "#4A4A5E", fontWeight: 300, marginTop: 16 }}>
                                We bridge the gap between citizens and government offices — not by manipulating the system, but by empowering you to navigate it correctly. We help you understand processes, prepare accurate documents, and ensure your applications receive the attention they deserve.
                            </p>
                            <p style={{ fontSize: 17, lineHeight: 1.85, color: "#4A4A5E", fontWeight: 300, marginTop: 16 }}>
                                Our work is guided by transparency, ethics, and respect for both citizens and public institutions. We believe that when citizens are properly supported, the system works better for everyone.
                            </p>
                        </div>
                    </div>
                    <div className={`fade-up d2${missionIn ? " visible" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {[["Fairness", "We ensure your case is presented correctly and completely — giving it the best legitimate chance of success."], ["Transparency", "No hidden fees. No vague promises. We tell you exactly what we do, what it costs, and what to expect."], ["Citizen Rights", "We believe informed citizens are empowered citizens. We educate while we assist."]].map(([title, text]) => (
                            <div key={title} style={{ background: "#fff", padding: "28px 32px", borderLeft: "3px solid #C8A84B", boxShadow: "0 4px 20px rgba(26,26,46,0.06)" }}>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: "#1A1A2E", marginBottom: 8 }}>{title}</div>
                                <div style={{ fontSize: 15, color: "#6A6A7E", lineHeight: 1.7, fontWeight: 300 }}>{text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROBLEMS */}
            <section id="problems" style={{ padding: "100px 48px", background: "#FFFFFF" }}>
                <div ref={problemRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className={`fade-up${problemIn ? " visible" : ""}`} style={{ textAlign: "center" }}>
                        <SectionLabel>The Reality</SectionLabel>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 700, color: "#1A1A2E", marginTop: 8 }}>
                            Why Citizens Struggle with<br /><span style={{ color: "#C8A84B" }}>Government Processes</span>
                        </h2>
                        <p style={{ fontSize: 17, color: "rgba(26,26,46,0.6)", maxWidth: 560, margin: "16px auto 0", lineHeight: 1.75, fontWeight: 300 }}>
                            Navigating government procedures is genuinely difficult. These are the challenges most citizens face — and exactly what we are here to solve.
                        </p>
                    </div>
                    <div className="problems-grid" style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
                        {[
                            { icon: "🔄", title: "Confusing & Changing Procedures", desc: "Government processes change frequently, vary by office, and are rarely explained clearly. Most people simply don't know where to begin or which documents are truly required." },
                            { icon: "⏳", title: "Unexplained Delays & Rejections", desc: "Applications get rejected or delayed for minor documentation errors. Without guidance, citizens repeat the cycle endlessly — losing time, money, and morale." },
                            { icon: "🚪", title: "Lack of Accessible Information", desc: "Critical process information is scattered across government portals, outdated websites, and unhelpful offices. The knowledge gap is real and costly." },
                            { icon: "😓", title: "Stress, Anxiety & Exploitation", desc: "Uncertainty breeds anxiety. Without proper guidance, citizens become vulnerable to misinformation or predatory middlemen who charge without delivering." },
                        ].map(({ icon, title, desc }, i) => (
                            <div key={title} className={`fade-up d${i + 1}${problemIn ? " visible" : ""}`} style={{ background: "#FFFFFF", border: "1px solid rgba(200,168,75,0.25)", padding: "36px 32px", display: "flex", gap: 20 }}>
                                <div style={{ fontSize: 32, flexShrink: 0, marginTop: 4 }}>{icon}</div>
                                <div>
                                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: "#1A1A2E", marginBottom: 10 }}>{title}</div>
                                    <div style={{ fontSize: 15, color: "#6A6A7E", lineHeight: 1.75, fontWeight: 300 }}>{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW WE HELP */}
            <section style={{ padding: "100px 48px", background: "#FFFFFF" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 60 }}>
                        <SectionLabel>How We Help</SectionLabel>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 700, color: "#1A1A2E", marginTop: 8 }}>
                            Professional Guidance.<br /><span style={{ color: "#C8A84B" }}>Ethical Support. Real Results.</span>
                        </h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="hero-grid">
                        <div>
                            <p style={{ fontSize: 17, lineHeight: 1.85, color: "#4A4A5E", fontWeight: 300 }}>
                                Sree Seva Services acts as your knowledgeable, ethical companion through the government process. We do not replace official procedures — we make them accessible to you.
                            </p>
                            <p style={{ fontSize: 17, lineHeight: 1.85, color: "#4A4A5E", fontWeight: 300, marginTop: 16 }}>
                                We study your specific requirement carefully, identify what is needed, and explain each step in simple language. We help you prepare complete, accurate documentation so your application stands on solid ground from day one.
                            </p>
                            <p style={{ fontSize: 17, lineHeight: 1.85, color: "#4A4A5E", fontWeight: 300, marginTop: 16 }}>
                                Our follow-up is professional and persistent — through official channels only. We monitor your application's progress, respond to department queries on your behalf, and keep you informed at every stage.
                            </p>
                            <div style={{ marginTop: 32 }}>
                                <button className="btn-primary" onClick={() => scrollTo("contact")}>Start With a Free Consultation</button>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {["We assess your situation honestly — with no commitment to proceed.", "We identify the exact documents and procedures required.", "We prepare or guide document completion to avoid rejection.", "We submit applications through official channels and track progress.", "We follow up professionally and report to you transparently.", "We celebrate completion — and remain available for future needs."].map((pt, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#C8A84B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                                        <span style={{ color: "#1A1A2E", fontSize: 12, fontWeight: 700 }}>✓</span>
                                    </div>
                                    <span style={{ fontSize: 15, color: "#4A4A5E", lineHeight: 1.65, fontWeight: 400 }}>{pt}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section id="process" style={{ padding: "100px 48px", background: "#fff" }}>
                <div ref={processRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className={`fade-up${processIn ? " visible" : ""}`} style={{ textAlign: "center", marginBottom: 70 }}>
                        <SectionLabel>Our Process</SectionLabel>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 700, color: "#1A1A2E", marginTop: 8 }}>
                            A Clear, Structured Path<br /><span style={{ color: "#C8A84B" }}>From Problem to Resolution</span>
                        </h2>
                    </div>
                    <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
                        {PROCESS.map(({ step, title, desc }, i) => (
                            <div key={step} className={`fade-up d${i + 1}${processIn ? " visible" : ""}`} style={{ position: "relative" }}>
                                <div style={{ width: 64, height: 64, border: "2px solid #C8A84B", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, position: "relative", background: "#fff", zIndex: 1 }}>
                                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#C8A84B" }}>{step}</span>
                                </div>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: "#1A1A2E", marginBottom: 12 }}>{title}</h3>
                                <p style={{ fontSize: 15, color: "#6A6A7E", lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>
                                {i < PROCESS.length - 1 && (
                                    <div style={{ position: "absolute", top: 30, left: "calc(100% + 4px)", right: -28, height: 2, background: "linear-gradient(90deg, #C8A84B, rgba(200,168,75,0.2))", zIndex: 0 }} className="process-connector" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section id="why-us" style={{ padding: "100px 48px", background: "#FFFFFF" }}>
                <div ref={whyRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className={`fade-up${whyIn ? " visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
                        <SectionLabel>Why Choose Us</SectionLabel>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 700, color: "#1A1A2E", marginTop: 8 }}>
                            Not Just a Service — A<br /><span style={{ color: "#C8A84B" }}>Commitment to You</span>
                        </h2>
                    </div>
                    <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
                        {[
                            { icon: "🔍", title: "Complete Transparency", desc: "We explain exactly what we will do, what it costs, and what outcome is realistic. No vague assurances. No inflated promises." },
                            { icon: "⚖️", title: "100% Ethical Practices", desc: "We operate entirely within the law. We do not offer, suggest, or engage in any form of bribery, manipulation, or process circumvention." },
                            { icon: "💰", title: "No Hidden Charges", desc: "Our fee structure is shared upfront. What we quote is what you pay. You will never encounter surprise bills or unexplained additional costs." },
                            { icon: "👥", title: "Citizen-First Philosophy", desc: "Every decision we make is guided by your best interest. We are not aligned with government departments — we are aligned with you, the citizen." },
                            { icon: "📞", title: "Responsive & Accountable", desc: "We provide regular updates and are available to answer questions throughout the process. We treat your concern as our priority." },
                            { icon: "🎓", title: "Experienced Support Team", desc: "Our team has in-depth knowledge of government procedures, documentation requirements, and departmental processes across multiple service areas." },
                        ].map(({ icon, title, desc }, i) => (
                            <div key={title} className={`service-card fade-up d${(i % 3) + 1}${whyIn ? " visible" : ""}`} style={{ background: "#FFFFFF", border: "1px solid rgba(200,168,75,0.25)", padding: "36px 28px" }}>
                                <div style={{ fontSize: 36, marginBottom: 20 }}>{icon}</div>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: "#1A1A2E", marginBottom: 12 }}>{title}</h3>
                                <p style={{ fontSize: 15, color: "#6A6A7E", lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" style={{ padding: "100px 48px", background: "#FFFFFF" }}>
                <div ref={servicesRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className={`fade-up${servicesIn ? " visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
                        <SectionLabel>Our Services</SectionLabel>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 700, color: "#1A1A2E", marginTop: 8 }}>
                            What We Can<br /><span style={{ color: "#C8A84B" }}>Help You With</span>
                        </h2>
                        <p style={{ fontSize: 17, color: "#6A6A7E", maxWidth: 520, margin: "16px auto 0", lineHeight: 1.75, fontWeight: 300 }}>
                            From certificates to compliance, we provide end-to-end guidance for a wide range of government-related needs.
                        </p>
                    </div>
                    <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
                        {SERVICES.map(({ icon, title, desc }, i) => (
                            <div key={title} className={`service-card fade-up d${(i % 3) + 1}${servicesIn ? " visible" : ""}`} style={{ background: "#fff", border: "1px solid #EBE8E0", padding: "36px 28px", cursor: "default" }}>
                                <div style={{ fontSize: 36, marginBottom: 20 }}>{icon}</div>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: "#1A1A2E", marginBottom: 12 }}>{title}</h3>
                                <p style={{ fontSize: 15, color: "#6A6A7E", lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>
                                <div style={{ marginTop: 20 }}>
                                    <span style={{ fontSize: 13, color: "#C8A84B", fontWeight: 600, letterSpacing: 0.5, cursor: "pointer" }} onClick={() => scrollTo("contact")}>Enquire Now →</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section id="testimonials" style={{ padding: "100px 48px", background: "#FFFFFF" }}>
                <div ref={testiRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className={`fade-up${testiIn ? " visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
                        <SectionLabel>Testimonials</SectionLabel>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 700, color: "#1A1A2E", marginTop: 8 }}>
                            Words From the Citizens<br /><span style={{ color: "#C8A84B" }}>We Have Served</span>
                        </h2>
                    </div>
                    <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                        {TESTIMONIALS.slice(0, 3).map(({ name, role, text, stars }, i) => (
                            <div key={name} className={`fade-up d${i + 1}${testiIn ? " visible" : ""}`} style={{ background: "#FFFFFF", border: "1px solid rgba(200,168,75,0.25)", padding: "36px 28px", position: "relative" }}>
                                <div style={{ position: "absolute", top: 16, right: 24, fontFamily: "'Playfair Display', serif", fontSize: 72, color: "rgba(200,168,75,0.1)", lineHeight: 1 }}>"</div>
                                <Stars count={stars} />
                                <p style={{ fontSize: 15, color: "#6A6A7E", lineHeight: 1.8, fontWeight: 300, marginTop: 16, fontStyle: "italic" }}>{text}</p>
                                <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(200,168,75,0.15)" }}>
                                    <div style={{ fontWeight: 600, color: "#1A1A2E", fontSize: 15 }}>{name}</div>
                                    <div style={{ fontSize: 13, color: "#C8A84B", marginTop: 2 }}>{role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginTop: 24 }}>
                        {TESTIMONIALS.slice(3).map(({ name, role, text, stars }, i) => (
                            <div key={name} className={`fade-up d${i + 1}${testiIn ? " visible" : ""}`} style={{ background: "#FFFFFF", border: "1px solid rgba(200,168,75,0.25)", padding: "36px 28px", position: "relative" }}>
                                <div style={{ position: "absolute", top: 16, right: 24, fontFamily: "'Playfair Display', serif", fontSize: 72, color: "rgba(200,168,75,0.1)", lineHeight: 1 }}>"</div>
                                <Stars count={stars} />
                                <p style={{ fontSize: 15, color: "#6A6A7E", lineHeight: 1.8, fontWeight: 300, marginTop: 16, fontStyle: "italic" }}>{text}</p>
                                <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(200,168,75,0.15)" }}>
                                    <div style={{ fontWeight: 600, color: "#1A1A2E", fontSize: 15 }}>{name}</div>
                                    <div style={{ fontSize: 13, color: "#C8A84B", marginTop: 2 }}>{role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA BAND */}
            <section id="contact" style={{ padding: "100px 48px", background: "#FFFFFF", position: "relative", overflow: "hidden" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", position: "relative" }}>
                    <span style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#C8A84B", fontWeight: 600 }}>Ready to Begin?</span>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 56px)", fontWeight: 800, color: "#1A1A2E", marginTop: 16, lineHeight: 1.2 }}>
                        Get the Help You Deserve.<br />Start With an Honest Conversation.
                    </h2>
                    <p style={{ fontSize: 18, color: "rgba(26,26,46,0.7)", maxWidth: 560, margin: "20px auto 0", lineHeight: 1.75, fontWeight: 300 }}>
                        No pressure. No commitment. Just a free, clear assessment of your situation and an honest explanation of how we can help.
                    </p>
                    <div style={{ marginTop: 44, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                        <button style={{ background: "#C8A84B", color: "#1A1A2E", border: "none", padding: "18px 44px", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease", letterSpacing: 0.5 }}
                            onMouseEnter={e => e.target.style.background = "#B8963B"}
                            onMouseLeave={e => e.target.style.background = "#C8A84B"}>
                            📅 Book Free Consultation
                        </button>
                        <button style={{ background: "transparent", color: "#1A1A2E", border: "2px solid #1A1A2E", padding: "18px 44px", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease" }}
                            onMouseEnter={e => e.target.style.background = "rgba(26,26,46,0.06)"}
                            onMouseLeave={e => e.target.style.background = "transparent"}>
                            📞 Call Us Directly
                        </button>
                    </div>
                    <p style={{ marginTop: 24, fontSize: 13, color: "rgba(26,26,46,0.55)" }}>Free initial consultation · Transparent pricing · No obligation to proceed</p>
                </div>
            </section>

        </div>
    );
}
