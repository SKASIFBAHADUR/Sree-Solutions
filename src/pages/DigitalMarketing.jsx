import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import CountUp from '../components/ui/CountUp';

/* ─────────────────────────────────────────────────────────────
   NAVIGATION HELPER
───────────────────────────────────────────────────────────── */
const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
};



/* ─────────────────────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────────────────────── */
const Icon = {
    search: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    social: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M12 13a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
    ),
    ads: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
    ),
    content: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    ),
    web: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
    ),
    email: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    sem: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    ),
    influencer: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
    app: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
    ),
    digital: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
    ),
    branding: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4l2 3h4a2 2 0 012 2v11a4 4 0 01-4 4H7z" />
        </svg>
    ),
    print: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
    ),
    check: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    ),
    arrow: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
    ),
};

/* ─────────────────────────────────────────────────────────────
   1. HERO — dark video background, left-aligned
───────────────────────────────────────────────────────────── */
const Hero = () => (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: '860px' }}>
        <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/digital-marketing/digital-marketing.mp4"
            autoPlay muted loop playsInline
        />
        <div className="absolute inset-0 bg-gray-950/72" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(17,24,39,0.95) 0%, rgba(17,24,39,0.65) 65%, rgba(17,24,39,0.20) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-2xl">
                <span className="inline-block border border-orange-400/40 bg-orange-500/15 text-orange-300 text-xs font-semibold tracking-[0.22em] uppercase px-5 py-2 rounded-full mb-8 backdrop-blur-sm">
                    Performance-Driven Digital Marketing
                </span>
                <h1 className="font-bold text-white leading-[1.08] mb-7" style={{ fontSize: 'clamp(44px,5.5vw,72px)' }}>
                    Grow Your Business{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                        Online
                    </span>{' '}
                    with Confidence
                </h1>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                    Data-driven strategies that help you scale with clarity and performance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <button
                        onClick={() => navigate('/contact')}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-0.5"
                    >
                        Book Free Strategy Call
                    </button>
                    <button
                        onClick={() => {
                            const el = document.getElementById('dm-services');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-8 py-4 rounded-xl text-base backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                    >
                        View Services
                    </button>
                </div>
                <div className="flex flex-wrap gap-6">
                    {['Performance-Driven', 'ROI Focused', 'End-to-End Digital Growth'].map((t, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-gray-300 text-sm font-medium">
                            <div className="w-5 h-5 rounded-full bg-green-700 flex items-center justify-center flex-shrink-0">
                                {Icon.check}
                            </div>
                            {t}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
);

/* ─────────────────────────────────────────────────────────────
   1.5 STATS — Repositioned after Hero, enlarged
───────────────────────────────────────────────────────────── */
const StatsSection = () => (
    <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { n: 300, suffix: '%', label: 'Average Lead Growth' },
                    { n: 5, suffix: 'x', label: 'Average ROAS' },
                    { n: 50, suffix: '+', label: 'Brands Served' },
                ].map((s, i) => (
                    <div key={i} className="text-center group">
                        <div className="text-6xl md:text-7xl font-black text-gray-900 mb-3 group-hover:text-orange-500 transition-colors duration-300">
                            <CountUp end={s.n} suffix={s.suffix} />
                        </div>
                        <div className="text-gray-500 text-sm md:text-base font-bold uppercase tracking-wider">{s.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   2. ABOUT + WHAT WE DO — 7/5 split, light background
───────────────────────────────────────────────────────────── */
const whatWeDo = [
    'SEO strategies that drive organic traffic and sustainable rankings on Google',
    'Comprehensive SEM & PPC management for instant visibility and lead generation',
    'End-to-end Social Media Management to build brand community and engagement',
    'High-performance Meta & Google Ads optimized for maximum ROI and scale',
    'Professional Content Making and storytelling that converts your audience',
    'Strategic Influencer Marketing to amplify reach and build credible trust',
];

const AboutSection = () => (
    <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left — 7 cols */}
                <div className="lg:col-span-7">
                    <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">About Our Digital Marketing</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        Accelerate Your Business with{' '}
                        <span className="text-orange-500">Digital Excellence</span>
                    </h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                        <p>We help businesses build a powerful online presence and drive revenue through strategic digital marketing campaigns. From ranking high on search engines to creating viral social media content, our holistic approach ensures your brand reaches the right audience at the right time.</p>
                        <p>We focus on ROI, using advanced analytics to optimize campaigns and deliver tangible leads and sales growth. Every strategy is custom-built to align with your industry, budget, and growth objectives — not a templated playbook.</p>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-5">What We Do</h3>
                    <ul className="space-y-3">
                        {whatWeDo.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-orange-500">
                                    {Icon.check}
                                </div>
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => navigate('/contact')}
                        className="mt-10 inline-flex items-center gap-2 bg-gray-900 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
                    >
                        Book Free Strategy Call {Icon.arrow}
                    </button>
                </div>

                {/* Right — 5 cols */}
                <div className="lg:col-span-5">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
                            alt="Digital Marketing Analytics"
                            className="w-full h-[480px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                        {/* floating badge */}
                        <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white flex-shrink-0">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-lg font-black text-gray-900">300%</div>
                                <div className="text-xs text-gray-500 font-medium">Average Lead Growth</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   3. SERVICES GRID — 3-col, modal expand, light gray bg
───────────────────────────────────────────────────────────── */
const servicesData = [
    {
        icon: Icon.search,
        title: 'Search Engine Optimisation',
        short: 'Rank #1 on Google and drive qualified organic traffic that converts.',
        detail: 'Our SEO service covers technical site audits, keyword research, on-page optimization, link building, and local SEO. We focus on sustainable rankings that deliver compounding growth over time. Our team monitors algorithm updates and adapts your strategy to keep you ahead of the competition.',
    },
    {
        icon: Icon.sem,
        title: 'Search Engine Marketing',
        short: 'Dominate search results with targeted paid search campaigns.',
        detail: 'We manage your Google Ads (SEM) campaigns to ensure you appear at the very top of search results for high-intent keywords. We focus on lowering your cost-per-click while maximizing conversion rates through expert bidding and ad copy.',
    },
    {
        icon: Icon.social,
        title: 'Social Media Management',
        short: 'Engage and grow your audience across Instagram, LinkedIn & Facebook.',
        detail: 'We manage your social media presence end-to-end — content calendar, creative production, community management, and analytics reporting. Our strategies build genuine brand communities that convert followers into loyal customers.',
    },
    {
        icon: Icon.ads,
        title: 'Meta Ads & Google Ads',
        short: 'High-performance ad campaigns that generate instant, high-quality leads.',
        detail: 'We run ROI-first campaigns across Google Search, Display, YouTube, Facebook, and Instagram. Our team handles everything from audience targeting and ad copy to conversion tracking and weekly optimization.',
    },
    {
        icon: Icon.content,
        title: 'Content Making',
        short: 'Authority-building content that educates audiences and drives inbound leads.',
        detail: 'Our team creates SEO-optimized blogs, long-form guides, infographics, and social content aligned to your brand voice. Every piece is designed to rank, engage, and convert — positioning your brand as a trusted authority.',
    },
    {
        icon: Icon.influencer,
        title: 'Influencer Marketing',
        short: 'Partner with the right voices to amplify your brand message.',
        detail: 'We identify and collaborate with influencers who truly resonate with your target audience. From contract negotiation to campaign execution, we ensure your brand gets authentic exposure and high engagement.',
    },
    {
        icon: Icon.email,
        title: 'Email & WhatsApp Marketing',
        short: 'Intelligent automation that nurtures leads and maximizes customer value.',
        detail: 'We build complete automated systems — from email list segmentation to WhatsApp broadcast campaigns. We deliver the right message at the right time to consistently improve retention and revenue.',
    },
    {
        icon: Icon.web,
        title: 'Web design and Development',
        short: 'Conversion-optimized websites built for speed, SEO, and stunning UX.',
        detail: 'We design and build high-performance websites that are visually premium and technically sound. Every site includes mobile-first design, Core Web Vitals optimization, and conversion-focused architecture.',
    },
    {
        icon: Icon.app,
        title: 'App development',
        short: 'Custom mobile applications designed for seamless user experiences.',
        detail: 'We develop robust, scalable mobile apps for iOS and Android. Our process focuses on intuitive UI/UX design, performance optimization, and seamless integration with your existing business systems.',
    },
    {
        icon: Icon.digital,
        title: 'Digitalisation of business',
        short: 'Modernize your operations with integrated digital solutions.',
        detail: 'We help you transition traditional business processes into the digital age. From CRM implementation to automated workflows, we empower your business with the tools needed to scale efficiently in a digital-first world.',
    },
    {
        icon: Icon.branding,
        title: 'Branding (Out Door/In Door)',
        short: 'Build a powerful, consistent brand identity across all touchpoints.',
        detail: 'We craft compelling brand stories and visual identities. Whether it is indoor signage or outdoor billboards, we ensure your branding is memorable, professional, and consistent across all platforms.',
    },
    {
        icon: Icon.print,
        title: 'Print media',
        short: 'High-quality print solutions for your physical marketing needs.',
        detail: 'From brochures and business cards to large-scale banners, our print media services ensure your physical marketing materials are as impactful as your digital ones, with premium design and finishing.',
    },
];

const ServiceModal = ({ item, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const fn = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', fn); };
    }, [onClose]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-gray-950/70 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8"
                onClick={e => e.stopPropagation()}
                style={{ animation: 'modalIn 0.3s ease-out' }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-all duration-200"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-5">
                    {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-7">{item.detail}</p>
                <button
                    onClick={() => { onClose(); navigate('/contact'); }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
                >
                    Get Started with {item.title}
                </button>
            </div>
        </div>
    );
};

const ServicesSection = () => {
    const [modal, setModal] = useState(null);
    return (
        <section id="dm-services" className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">What We Offer</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">A full-stack digital marketing suite — from SEO to paid ads to automation.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((s, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
                        >
                            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-5 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                {s.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors duration-300">{s.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{s.short}</p>
                            <button
                                onClick={() => setModal(s)}
                                className="inline-flex items-center gap-1.5 text-orange-500 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                            >
                                Read More {Icon.arrow}
                            </button>
                        </div>
                    ))}
                </div>

                {/* CTA strip */}
                <div className="mt-14 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-white text-lg font-medium text-center md:text-left">
                        Let's build a growth strategy for your business.
                    </p>
                    <button
                        onClick={() => navigate('/contact')}
                        className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
                    >
                        Talk to an Expert
                    </button>
                </div>
            </div>
            {modal && <ServiceModal item={modal} onClose={() => setModal(null)} />}
        </section>
    );
};

/* ─────────────────────────────────────────────────────────────
   4. PROCESS TIMELINE — light background
───────────────────────────────────────────────────────────── */
const processSteps = [
    { n: '01', title: 'Strategy Planning', desc: 'Deep-dive audit of your brand, competitors, and market. We craft a bespoke growth roadmap aligned to your goals.' },
    { n: '02', title: 'Campaign Execution', desc: 'Our team builds creatives, writes ad copy, configures targeting, and launches campaigns across all chosen channels.' },
    { n: '03', title: 'Monitoring & Optimization', desc: 'We A/B test ads, track KPIs in real time, and iteratively optimize to reduce cost-per-lead and maximize ROAS.' },
    { n: '04', title: 'Growth & Scaling', desc: 'As campaigns stabilize, we reinvest learnings to scale winning strategies, expand audiences, and compound growth.' },
];

const ProcessSection = () => (
    <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
                <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">How We Work</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Process</h2>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">A structured, transparent process from discovery to scaled growth.</p>
            </div>

            {/* Desktop horizontal */}
            <div className="hidden lg:block">
                <div className="relative">
                    <div className="absolute top-10 left-20 right-20 h-px bg-gray-100" />
                    <div className="absolute top-10 left-20 right-20 h-px overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-300 to-orange-500" style={{ animation: 'grow 1.5s ease-out forwards' }} />
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        {processSteps.map((s, i) => (
                            <div key={i} className="group relative flex flex-col items-center text-center pt-2">
                                <div className="relative z-10 w-20 h-20 rounded-full bg-white border-4 border-gray-100 shadow-lg flex items-center justify-center mb-6 group-hover:border-orange-400 transition-all duration-300">
                                    <span className="text-2xl font-black text-gray-200 group-hover:text-orange-400 transition-colors duration-300">{s.n}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors duration-300">{s.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile vertical */}
            <div className="lg:hidden space-y-0">
                {processSteps.map((s, i) => (
                    <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                        {i < processSteps.length - 1 && <div className="absolute left-6 top-14 w-px h-full bg-orange-100" />}
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shadow-lg z-10 text-sm">
                            {s.n}
                        </div>
                        <div className="pt-1.5">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   5. WHY CHOOSE US — dark background
───────────────────────────────────────────────────────────── */
const whyPoints = [
    { title: 'Result-Driven Strategy', desc: 'Every campaign is engineered around leads, conversions, and measurable revenue — not vanity metrics.' },
    { title: 'Experienced Experts', desc: 'Our team brings 10+ years of combined digital marketing experience across industries and budgets.' },
    { title: 'Affordable Packages', desc: 'Enterprise-grade execution at SME-friendly pricing. Transparent retainers with zero hidden fees.' },
    { title: 'Flexible Solutions', desc: 'From one-time campaign setups to ongoing monthly retainers, our engagements fit your workflow.' },
    { title: 'Real Support', desc: 'A dedicated account manager keeps you informed with monthly reporting and always-on communication.' },
];

const testimonials = [
    { name: 'CEO, Real Estate Firm', quote: 'Our leads increased significantly after they took over our social media. The ROI has been fantastic — 5x return in 3 months.', rating: 5 },
    { name: 'Boutique Owner, Fashion Brand', quote: 'They built a beautiful website and ran Instagram ads that actually converted to sales. Very happy with the results and the team!', rating: 5 },
];

const WhyChooseUs = () => (
    <section className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="inline-block border border-orange-400/30 bg-orange-500/10 text-orange-400 text-sm font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Our Advantage</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Why Choose Us</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">The principles that guide everything we do for our clients.</p>
            </div>

            {/* Two-col bullet layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
                {whyPoints.map((p, i) => (
                    <div
                        key={i}
                        className="group flex items-start gap-4 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-orange-400/30 rounded-2xl p-6 transition-all duration-300"
                    >
                        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            {Icon.check}
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1.5 group-hover:text-orange-400 transition-colors duration-300">{p.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((t, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-7">
                        <div className="flex gap-1 mb-4">
                            {Array.from({ length: t.rating }).map((_, j) => (
                                <svg key={j} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-5 text-sm">"{t.quote}"</p>
                        <div className="text-orange-400 font-semibold text-sm">{t.name}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   6. FINAL CTA — clean light section, centered narrow
───────────────────────────────────────────────────────────── */
const FinalCTA = () => (
    <section className="bg-white py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-6">Let's Get Started</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Ready to Scale Your{' '}
                <span className="text-orange-500">Business?</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
                Let's build a strategy tailored to your growth goals. Our first consultation is completely free — no strings attached.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => navigate('/contact')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-5 rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1"
                >
                    Schedule Free Consultation
                </button>
                <button
                    onClick={() => navigate('/contact')}
                    className="border-2 border-gray-900 hover:bg-gray-900 text-gray-900 hover:text-white font-bold px-10 py-5 rounded-xl text-lg transition-all duration-300 hover:-translate-y-1"
                >
                    View Our Work
                </button>
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
const DigitalMarketing = () => (
    <>
        <Helmet>
            <title>Digital Marketing Services | Data-Driven Growth — Sree Solutions</title>
            <meta name="description" content="Performance-driven digital marketing — SEO, social media, Google Ads, content marketing, website development & email automation. Book a free strategy call today." />
        </Helmet>

        <style>{`
            @keyframes grow {
                from { transform: scaleX(0); }
                to   { transform: scaleX(1); }
            }
            @keyframes modalIn {
                from { opacity: 0; transform: scale(0.93) translateY(10px); }
                to   { opacity: 1; transform: scale(1)  translateY(0);    }
            }
        `}</style>

        <Hero />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <WhyChooseUs />
        <FinalCTA />
    </>
);

export default DigitalMarketing;
