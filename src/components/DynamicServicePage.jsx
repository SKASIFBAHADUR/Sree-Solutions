import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import Reveal from './animations/Reveal';
import {
    ArrowRight, CheckCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { getServiceBySlug } from '../data/servicesData';
import PremiumServiceCard from './PremiumServiceCard';
import { navigateToContact } from '../utils/navigation';
import LazySection from './ui/LazySection';
import ImageWithBlur from './ui/ImageWithBlur';

function ServiceCard({ card }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                transition: `all 0.3s ease`,
                background: "#FFFFFF",
                border: "1px solid #D9EDD6",
                borderRadius: 0,
                overflow: "hidden",
                boxShadow: hovered
                    ? "0 16px 48px rgba(27,94,59,0.18)"
                    : "0 4px 20px rgba(27,94,59,0.07)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
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
                <div style={{ position: "absolute", right: 0, top: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 52px 52px 0", borderColor: `transparent rgba(255,255,255,0.05) transparent transparent` }} />
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
                                href={item.externalUrl || `/contact`}
                                target={item.externalUrl ? "_blank" : "_self"}
                                rel={item.externalUrl ? "noopener noreferrer" : ""}
                                onClick={(e) => {
                                    if (!item.externalUrl) {
                                        e.preventDefault();
                                        navigateToContact(e);
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
                <button
                    onClick={navigateToContact}
                    style={{
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

const DynamicServicePage = ({ serviceSlug }) => {
    const [service, setService] = useState(null);
    const [expandedFaq, setExpandedFaq] = useState(null);

    useEffect(() => {
        const serviceData = getServiceBySlug(serviceSlug);
        setService(serviceData);
    }, [serviceSlug]);

    if (!service) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-4">Service Not Found</h1>
                    <p className="text-secondary-600 mb-8">The requested service could not be found.</p>
                    <a href="/" className="text-primary-600 hover:text-primary-700 font-semibold">Return to Home</a>
                </div>
            </div>
        );
    }

    const defaultIcons = [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200&h=200",
        "https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&q=80&w=200&h=200",
        "https://images.unsplash.com/photo-1454165833772-d996d49513d7?auto=format&fit=crop&q=80&w=200&h=200"
    ];

    const serviceIcons = {
        'insurance': [
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1576091160550-217359f488d5?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=200&h=200"
        ],
        'income-tax': [
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1554224155-1696413575b9?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200&h=200"
        ],
        'kisan-dosth': [
            "https://images.unsplash.com/photo-1592918841444-245842828b61?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1495107334309-fcf20504fa5f?auto=format&fit=crop&q=80&w=200&h=200"
        ],
        'legal-advisor': [
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1589994168171-8bc435372333?auto=format&fit=crop&q=80&w=200&h=200"
        ],
        'medical-assistant': [
            "https://images.unsplash.com/photo-1505751172107-160fa8d6263d?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=200&h=200"
        ],
        'revenue-services': [
            "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200&h=200"
        ],
        'rto-services': [
            "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-154919438c-f4c63eb107d5?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=200&h=200"
        ],
        'epfo': [
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=200&h=200", // Compliance
            "https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&q=80&w=200&h=200", // Trust
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200&h=200"  // Support
        ],
        'esio': [
            "https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1576091160550-217359f488d5?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200&h=200"
        ],
        'sree-seva': [
            "https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200&h=200"
        ],
        'digital-marketing': [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c207?auto=format&fit=crop&q=80&w=200&h=200"
        ],
        'tours-and-travels': [
            "https://images.unsplash.com/photo-1436491865332-7a61a109c0f5?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=200&h=200"
        ],
        'study-abroad': [
            "https://images.unsplash.com/photo-1523050338692-7b835a07973f?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=200&h=200",
            "https://images.unsplash.com/photo-1434039347681-999139108b5f?auto=format&fit=crop&q=80&w=200&h=200"
        ],
        'bank-services': [
            "https://images.unsplash.com/photo-1550565118-3d14293b7fd5?auto=format&fit=crop&q=80&w=200&h=200", // Deposits
            "https://images.unsplash.com/photo-1611974714605-e408544c0628?auto=format&fit=crop&q=80&w=200&h=200", // Investments
            "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=200&h=200", // Credit Cards
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=200&h=200", // Loans
            "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=200&h=200", // Cibil
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=200&h=200"  // Statements
        ]
    };

    const iconMap = serviceIcons[serviceSlug] || defaultIcons;

    return (
        <div className="bg-white min-h-screen">
            <Helmet>
                <title>{service.title} in Hyderabad | Sree Seva Consultancy</title>
                <meta name="description" content={`Best ${service.title} in Hyderabad. ${service.shortDescription} Contact Sree Seva Consultancy for professional help and consultation.`} />
                <link rel="canonical" href={`https://sreesevaconsultancy.com/services/${service.slug}`} />
            </Helmet>
            {/* Hero Section - Video or Text Based */}
            {service.heroVideo && !['legal-service-facilitator', 'income-tax', 'kisan-dosth', 'revenue-services', 'rto-services'].includes(serviceSlug) ? (
                <section className="relative h-screen w-full overflow-hidden">
                    {/* Video Background */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src={service.heroVideo.replace('.mp4', '.webm')} type="video/webm" />
                        <source src={service.heroVideo} type="video/mp4" />
                    </video>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

                    {/* Content Overlay */}
                    <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
                        <div className="max-w-5xl mx-auto text-center text-white">
                            <Reveal variant="fadeInUp" delay={0.2}>
                                <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-6 text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #001F3F, #1E3A8A, #60A5FA)' }}>
                                    {service.category}
                                </p>
                            </Reveal>

                            <Reveal variant="fadeInUp" delay={0.3}>
                                <h1 className="text-white">
                                    {service.title}
                                </h1>
                            </Reveal>

                            <Reveal variant="calmFade" delay={0.5}>
                                <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed text-white/95">
                                    {service.heroSubtitle}
                                </p>
                            </Reveal>

                            <Reveal variant="fadeInUp" delay={0.6}>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <button onClick={navigateToContact} className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center gap-2">
                                        Get Started Today
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                    <button onClick={navigateToContact} className="text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                                        Speak to a Specialist
                                    </button>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto text-center">
                        <Reveal variant="fadeInUp" delay={0.2}>
                            <p className="text-sm font-semibold text-primary-600 tracking-[0.2em] uppercase mb-6">
                                {service.category}
                            </p>
                        </Reveal>

                        <Reveal variant="fadeInUp" delay={0.3}>
                            <h1 className="text-secondary-900 leading-tight mb-8">
                                {service.title}
                            </h1>
                        </Reveal>

                        <Reveal variant="calmFade" delay={0.5}>
                            <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                                {service.heroSubtitle}
                            </p>
                        </Reveal>

                        <Reveal variant="fadeInUp" delay={0.6}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button onClick={navigateToContact} className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2">
                                    Get Started Today
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button onClick={navigateToContact} className="text-secondary-700 px-8 py-4 font-medium hover:text-primary-600 transition-colors">
                                    Speak to a Specialist
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </section>
            )}

            {/* Trust Strip */}
            <LazySection minHeight="20vh">
            <section className="py-16 border-t border-b border-secondary-100 bg-secondary-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal variant="calmFade" delay={0.3}>
                        <p className="text-center text-sm font-semibold tracking-wide uppercase text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #001F3F, #1E3A8A, #60A5FA)' }}>
                            {service.trustStatement}
                        </p>
                    </Reveal>
                </div>
            </section>
            </LazySection>

            {/* Service Overview */}
            {!['legal-service-facilitator', 'income-tax', 'bank-services', 'career-guru', 'kisan-dosth', 'revenue-services', 'rto-services'].includes(serviceSlug) && (
                <LazySection minHeight="60vh">
                <section className="relative py-48 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="grid md:grid-cols-2 gap-16">
                            <Reveal variant="fadeInUp" delay={0.3}>
                                <div>
                                    <h2 className="text-secondary-900">
                                        What This Service Includes
                                    </h2>
                                    <div className="space-y-4 text-secondary-600 leading-relaxed">
                                        {service.overview.description.map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal variant="fadeInUp" delay={0.4}>
                                <div>
                                    <h3 className="text-secondary-900">
                                        Key Outcomes & Benefits
                                    </h3>
                                    <ul className="space-y-4">
                                        {service.overview.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-0.5 border border-slate-100 shadow-sm relative">
                                                    <ImageWithBlur
                                                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=50&h=50"
                                                        alt="Benefit Checkmark"
                                                    />
                                                </div>
                                                <span className="text-secondary-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
                </LazySection>
            )}

            {/* Key Capabilities */}
            {service.capabilities && service.capabilities.length > 0 && (
                <LazySection minHeight="80vh">
                  <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                      <div className={`absolute inset-0 ${['legal-service-facilitator', 'income-tax', 'kisan-dosth', 'revenue-services', 'rto-services'].includes(serviceSlug) ? 'bg-white' : 'bg-secondary-50/30'}`}></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <Reveal variant="fadeInUp" delay={0.2}>
                            <div className="text-center mb-16">
                                <h2 className="text-secondary-900">
                                    Core Capabilities
                                </h2>
                                <p className="text-secondary-600 max-w-2xl mx-auto">
                                    Comprehensive expertise across all aspects of {service.title.toLowerCase()}
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {service.capabilities.map((capability, index) => {
                                const Icon = iconMap[index % iconMap.length];
                                const colorSchemes = ['navy', 'orange'];
                                const colorScheme = colorSchemes[index % colorSchemes.length];
                                return (
                                    <Reveal key={index} variant="liftUp" delay={0.3 + (index * 0.1)}>
                                        <PremiumServiceCard
                                            title={capability.title}
                                            description={capability.description}
                                            imageIcon={Icon}
                                            colorScheme={colorScheme}
                                            slug=""
                                            onClick={navigateToContact}
                                        />
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>
                </LazySection>
            )}

            {/* Custom Income Tax Services Section */}
            {serviceSlug === 'income-tax' && service.incomeTaxCards && (
                <LazySection minHeight="80vh">
                <section style={{ padding: "0 48px 90px", background: "#F4F8F5" }} className="pt-24 min-h-screen">
                    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                        <Reveal variant="fadeInUp" delay={0.2}>
                            <div style={{ marginBottom: 32 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{ flex: 1, height: 1, background: "rgba(27,94,59,0.15)" }} />
                                    <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: "#1B5E3B", fontWeight: 800 }}>Income Tax & Compliance Services</span>
                                    <div style={{ flex: 1, height: 1, background: "rgba(27,94,59,0.15)" }} />
                                </div>
                                <h2 className="text-secondary-900" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, textAlign: "center", marginTop: 16 }}>
                                    Business Setup, Taxation &{" "}
                                    <span style={{ color: "#1B5E3B" }}>Advisory</span>
                                </h2>
                            </div>
                        </Reveal>

                        <div className="epfo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
                            {service.incomeTaxCards.map((card, i) => (
                                <Reveal key={card.id} variant="liftUp" delay={0.3 + (i * 0.1)}>
                                    <ServiceCard card={card} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
                </LazySection>
            )}

            {/* How We Work */}
            <LazySection minHeight="60vh">
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <Reveal variant="fadeInUp" delay={0.2}>
                        <div className="text-center mb-16">
                            <h2 className="text-secondary-900">
                                Our Process
                            </h2>
                            <p className="text-secondary-600 max-w-2xl mx-auto">
                                A structured, transparent approach from consultation to completion
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-2 gap-8">
                        {service.process.map((step, index) => {
                            const colorSchemes = ['navy', 'orange'];
                            const colorScheme = colorSchemes[index % colorSchemes.length];
                            if (isNaN(index)) return null; // Safety check
                            const stepNumber = String(index + 1).padStart(2, '0');
                            return (
                                <Reveal key={index} variant="liftUp" delay={0.3 + (index * 0.15)}>
                                    <PremiumServiceCard
                                        title={`${stepNumber}. ${step.title}`}
                                        description={step.description}
                                        colorScheme={colorScheme}
                                        slug=""
                                        onClick={navigateToContact}
                                    />
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>
            </LazySection>

            {/* Real Impact / Case Study */}
            <LazySection minHeight="50vh">
            <section className={`py-24 px-4 sm:px-6 lg:px-8 ${['legal-service-facilitator', 'income-tax', 'kisan-dosth', 'revenue-services', 'rto-services'].includes(serviceSlug) ? 'bg-white' : 'bg-secondary-50/30'}`}>
                <div className="max-w-5xl mx-auto">
                    <Reveal variant="fadeInUp" delay={0.2}>
                        <div className="text-center mb-16">
                            <h2 className="text-secondary-900">
                                Real Results
                            </h2>
                            <p className="text-secondary-600">
                                Success story from our {service.title.toLowerCase()} engagements
                            </p>
                        </div>
                    </Reveal>

                    <Reveal variant="fadeInUp" delay={0.3}>
                        <div className="bg-white p-12 rounded-lg border border-secondary-200">
                            <div className="grid md:grid-cols-3 gap-12">
                                <div>
                                    <h4 className="text-small font-bold uppercase tracking-wide mb-3 text-primary-600">
                                        Challenge
                                    </h4>
                                    <p className="text-secondary-700">
                                        {service.caseStudy.challenge}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-small font-bold uppercase tracking-wide mb-3 text-secondary-800">
                                        Approach
                                    </h4>
                                    <p className="text-secondary-700">
                                        {service.caseStudy.approach}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-small font-bold uppercase tracking-wide mb-3 text-primary-600">
                                        Outcome
                                    </h4>
                                    <p className="text-secondary-700">
                                        {service.caseStudy.outcome}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
            </LazySection>

            {/* Video Section if available */}
            {service.youtubeVideo && (
                <LazySection minHeight="60vh">
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <Reveal variant="fadeInUp" delay={0.2}>
                            <div className="text-center mb-12">
                                <h2 className="text-secondary-900">
                                    Our Global Impact
                                </h2>
                                <p className="text-secondary-600 max-w-2xl mx-auto text-lg font-light">
                                    Watch how we guide students and professionals to success through our dedicated services.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal variant="calmFade" delay={0.4}>
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-secondary-200 bg-black">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={service.youtubeVideo}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </Reveal>
                    </div>
                </section>
                </LazySection>
            )}


            {/* Why Choose Us */}
            <LazySection minHeight="50vh">
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <Reveal variant="fadeInUp" delay={0.2}>
                        <div className="text-center mb-16">
                            <h2 className="text-secondary-900">
                                Why Choose Us
                            </h2>
                            <p className="text-secondary-600 max-w-2xl mx-auto">
                                Trusted expertise and proven results in {service.title.toLowerCase()}
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-2 gap-12">
                        {service.whyChooseUs.map((pillar, index) => (
                            <Reveal key={index} variant="fadeInUp" delay={0.3 + (index * 0.15)}>
                                <div className={`p-8 border-l-4 border-primary-600 ${['legal-service-facilitator', 'income-tax', 'kisan-dosth', 'revenue-services', 'rto-services'].includes(serviceSlug) ? 'bg-white border border-slate-200' : 'bg-secondary-50/50'}`}>
                                    <h3 className="text-secondary-900 !mb-4">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-secondary-600 leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
            </LazySection>


            {/* Final CTA */}
            <LazySection minHeight="40vh">
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Reveal variant="liftUp" delay={0.2}>
                        <div className="bg-white p-12 rounded-lg border border-secondary-200 text-center">
                            <h2 className="text-secondary-900">
                                Ready to Get Started?
                            </h2>
                            <p className="text-secondary-600 mb-8 max-w-2xl mx-auto">
                                Connect with our specialists to discuss your needs and explore how we can help you achieve your goals.
                            </p>
                            <button onClick={navigateToContact} className="bg-primary-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center gap-2">
                                Start Your Journey
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </Reveal>
                </div>
            </section>
            </LazySection>
        </div>
    );
};

export default DynamicServicePage;
