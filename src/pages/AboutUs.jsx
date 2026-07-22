import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
    ArrowRight,
    Heart,
    Zap,
    Shield,
    GraduationCap,
    Globe,
    MessageSquare,
    Users,
    TrendingUp,
    Leaf,
    Lightbulb,
    Target
} from 'lucide-react';
import LazySection from '../components/ui/LazySection';
import ImageWithBlur from '../components/ui/ImageWithBlur';

// --- Components ---

const Reveal = ({ children, variant = "fadeInUp", delay = 0 }) => {
    const variants = {
        fadeInUp: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
        fadeInLeft: { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } },
        fadeInRight: { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 } },
        scaleUp: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
    };

    return (
        <motion.div
            initial={variants[variant].initial}
            whileInView={variants[variant].animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
        >
            {children}
        </motion.div>
    );
};

// --- Page Component ---

const AboutUs = () => {
    return (
        <div className="bg-white min-h-screen selection:bg-primary-100 selection:text-primary-900">
            <Helmet>
                <title>Not a Consultancy. We Are a Movement. | About Us</title>
                <meta name="description" content="Sree Seva is a mission-driven movement built to empower India's youth and farmers. Educate. Encourage. Empower." />
            </Helmet>

            {/* 1. HERO - MOVEMENT STATEMENT */}
            <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/about-us/hero.webp"
                        alt="Indian Youth"
                        loading="eager"
                        fetchpriority="high"
                        className="w-full h-full object-cover grayscale brightness-[0.3]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-900/40 to-secondary-900" />
                </div>

                <div className="max-w-[1244px] mx-auto px-6 md:px-12 relative z-10 pt-20">
                    <Reveal delay={0.2}>
                        <h1 className="text-white text-[48px] md:text-[64px] font-bold leading-[1.1] mb-8 max-w-3xl">
                            We Are Not a Consultancy.<br />
                            <span className="text-primary-500">We Are a Movement.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <div className="flex items-center gap-4 mb-8">
                            <span className="h-[2px] w-12 bg-primary-500"></span>
                            <p className="text-primary-400 font-bold uppercase tracking-[0.2em] text-[15px]">Educate. Encourage. Empower.</p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.6}>
                        <p className="text-[18px] md:text-[22px] text-secondary-200 mb-12 max-w-2xl leading-relaxed font-light">
                            India stands at a crossroads. While the world looks at our potential, we look at our people.
                            We don't sell services; we provide direction. We don't solve problems; we build capacity.
                            We are the catalyst for a stronger, self-reliant India.
                        </p>
                    </Reveal>
                    <Reveal delay={0.8}>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <a href="/contact" className="bg-primary-600 text-white px-10 py-5 rounded-full font-bold text-[16px] hover:bg-primary-700 transition-all shadow-2xl shadow-primary-900/40 text-center">
                                Join the Mission
                            </a>
                            <a href="#identity" className="border-2 border-white/20 text-white px-10 py-5 rounded-full font-bold text-[16px] hover:bg-white/10 backdrop-blur-sm transition-all text-center">
                                Stand for India
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>




            {/* 3. WHO WE ARE - MISSION & PHILOSOPHY */}
            <LazySection minHeight="80vh">
            <section id="identity" className="py-[120px] bg-secondary-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-600/5 rotate-12 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/5 -translate-x-32 translate-y-32 blur-[120px]" />

                <div className="max-w-[1244px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <Reveal variant="fadeInLeft">
                            <div className="relative">
                                <div className="aspect-square rounded-[40px] bg-gradient-to-br from-primary-600/5 to-secondary-800 border border-white/5 flex items-center justify-center p-12 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                                    <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-700">
                                        <ImageWithBlur
                                            src="/sree solution logo.png"
                                            alt="Sree Solutions Logo"
                                            className="w-full h-auto max-w-[320px] object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-500 rounded-full animate-ping" />
                                        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-primary-400 rounded-full animate-ping delay-300" />
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal variant="fadeInRight">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full" />
                                    <span className="text-[12px] font-bold uppercase tracking-wider text-primary-200">Who We Are</span>
                                </div>
                                <h2 className="text-[40px] md:text-[56px] font-bold leading-tight">
                                    A Mission to <span className="text-primary-500">Empower Citizens</span>
                                </h2>
                                <div className="space-y-6 text-[18px] text-secondary-300 leading-relaxed font-light">
                                    <p>
                                        Sree Solutions is more than a consulting service — it is a mission dedicated to empowering citizens with knowledge, guidance, and access to essential government services.
                                    </p>
                                    <p>
                                        Founded with a vision to strengthen India at the grassroots level, Sree Solutions works to bridge the gap between complex government systems and the people who depend on them. We believe that no citizen should feel helpless in front of bureaucracy or miss opportunities due to lack of awareness or guidance.
                                    </p>
                                    <p>
                                        Through a unique blend of human expertise and digital systems, we simplify processes, resolve challenges, and ensure that individuals and businesses receive the support they deserve.
                                    </p>
                                    <p className="text-white font-medium">
                                        Our goal is not simply to provide services, but to educate, encourage, and empower every individual to move forward with confidence.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
            </LazySection>
            <LazySection minHeight="40vh">
            <section className="py-[120px] bg-secondary-50/50">
                <div className="max-w-[720px] mx-auto px-6 text-center">
                    <Reveal>
                        <h2 className="text-[32px] md:text-[40px] font-bold text-secondary-900 mb-8">Beyond Business. Beyond Profit.</h2>
                        <p className="text-[18px] text-secondary-600 leading-[1.8] mb-12 italic">
                            "We do not exist to fill ledgers; we exist to fill voids in the lives of people who have been told that their dreams are too expensive or too unrealistic. Every rupee earned is reinvested into building a stronger India."
                        </p>
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-secondary-200">
                            <div>
                                <div className="text-[28px] font-bold text-primary-600">Free</div>
                                <p className="text-[12px] uppercase font-bold tracking-widest text-secondary-500">Advisory</p>
                            </div>
                            <div>
                                <div className="text-[28px] font-bold text-primary-600">Zero</div>
                                <p className="text-[12px] uppercase font-bold tracking-widest text-secondary-500">Corporate Debt</p>
                            </div>
                            <div>
                                <div className="text-[28px] font-bold text-primary-600">100%</div>
                                <p className="text-[12px] uppercase font-bold tracking-widest text-secondary-500">Mission Driven</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
            </LazySection>


            {/* 8. WHY CHOOSE US - TRUST & RESULTS */}
            <LazySection minHeight="80vh">
            <section className="py-[120px] bg-secondary-900 relative overflow-hidden">
                <div className="max-w-[1244px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-20">
                        <Reveal>
                            <span className="text-primary-500 font-bold uppercase tracking-[0.3em] text-[12px] mb-4 block">Why Choose Us</span>
                            <h2 className="text-[36px] md:text-[56px] font-bold text-white mb-6">Why Choose Sree Solutions</h2>
                            <p className="text-secondary-400 max-w-2xl mx-auto text-lg font-light">Combining deep domain expertise with an unwavering commitment to citizen welfare.</p>
                        </Reveal>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Shield size={32} />,
                                title: "Proven Expertise in Government Services",
                                desc: "With deep knowledge of government procedures and compliance systems, we help individuals and businesses navigate complex processes with confidence."
                            },
                            {
                                icon: <Zap size={32} />,
                                title: "Strategic Problem Solving",
                                desc: "We don't just process forms; we solve problems. Every case is analyzed strategically to ensure the most efficient path to resolution."
                            },
                            {
                                icon: <Users size={32} />,
                                title: "Citizen-Centric Approach",
                                desc: "Our focus is always on the individual. We bridge the gap between bureaucracy and the people, making services accessible to all."
                            },
                            {
                                icon: <Globe size={32} />,
                                title: "End-to-End Case Management",
                                desc: "From documentation to final resolution, we handle the entire lifecycle of your request, keeping you informed at every step."
                            },
                            {
                                icon: <TrendingUp size={32} />,
                                title: "Verified Track Record",
                                desc: "Years of successful resolutions and thousands of satisfied clients stand as a testament to our reliability and persistence."
                            },
                            {
                                icon: <MessageSquare size={32} />,
                                title: "Transparent & Ethical",
                                desc: "We operate with absolute integrity. No shortcuts, no hidden charges — just honest guidance and professional service."
                            }
                        ].map((feature, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className="p-10 rounded-[32px] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/30 transition-all duration-500 backdrop-blur-sm group h-full">
                                    <div className="w-16 h-16 bg-primary-600/20 rounded-2xl flex items-center justify-center text-primary-500 mb-8 group-hover:scale-110 transition-transform duration-500">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-[22px] font-bold text-white mb-4 leading-tight">{feature.title}</h4>
                                    <p className="text-secondary-400 leading-relaxed font-light">{feature.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
            </LazySection>
            <LazySection minHeight="60vh">
            <section className="py-[120px] bg-white">
                <div className="max-w-[1244px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-20">
                        <Reveal>
                            <h2 className="text-[36px] md:text-[48px] font-bold text-secondary-900 mb-4">A Different Way to Function</h2>
                            <p className="text-secondary-600">Dismantling the traditional consulting model for true impact.</p>
                        </Reveal>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Users size={32} />,
                                title: "Guidance Model",
                                desc: "Not generic advice; but human-to-human guidance built on years of lived experience and deep domain knowledge."
                            },
                            {
                                icon: <MessageSquare size={32} />,
                                title: "Community Model",
                                desc: "Connecting our members into a powerful ecosystem where youth can learn from veterans and farmers can support each other."
                            },
                            {
                                icon: <TrendingUp size={32} />,
                                title: "Impact Model",
                                desc: "No quarterly profits. We reinvest every success into scaling our rural and youth reach across the nation."
                            }
                        ].map((model, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className="p-10 rounded-3xl bg-secondary-50 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-secondary-100 group h-full">
                                    <div className="text-primary-600 mb-8 p-4 bg-white rounded-2xl w-fit group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                        {model.icon}
                                    </div>
                                    <h4 className="text-[22px] font-bold text-secondary-900 mb-4">{model.title}</h4>
                                    <p className="text-secondary-600 leading-relaxed text-[16px]">{model.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
            </LazySection>

            {/* 10. FINAL CTA - JOIN THE MOVEMENT */}
            <LazySection minHeight="50vh">
            <section className="py-[120px] bg-primary-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
                </div>

                <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                    <Reveal>
                        <h2 className="text-[40px] md:text-[56px] font-bold leading-tight mb-8">
                            This Is Not a Company. <br className="hidden md:block" />
                            This Is a Responsibility.
                        </h2>
                        <p className="text-[20px] text-white/80 mb-12 max-w-xl mx-auto font-light">
                            If you believe that India's potential is its greatest asset, it's time to act. Join us in building a future that reflects our true strength.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-secondary-900 text-white px-12 py-6 rounded-full font-bold text-[18px] hover:bg-white hover:text-secondary-900 transition-all shadow-2xl shadow-secondary-900/40"
                        >
                            Join the Mission Today
                        </a>
                    </Reveal>
                </div>
            </section>
            </LazySection>
        </div>
    );
};

export default AboutUs;
