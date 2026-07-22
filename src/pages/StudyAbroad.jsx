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
   HERO SECTION
───────────────────────────────────────────────────────────── */
const Hero = () => (
    <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Fullscreen background video */}
        <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
        >
            <source src="/study-abroad/STUDY_ABROAD.webm" type="video/webm" />
            <source src="/study-abroad/STUDY_ABROAD.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/70 to-gray-900/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-52 pb-24 w-full">
            <div className="max-w-2xl">
                <span className="inline-block bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-semibold tracking-[0.22em] uppercase px-4 py-2 rounded-full mb-6">
                    Study Abroad Experts
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                    Your Future,{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                        Global
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
                    From university selection to visa approval — we guide every step of your journey to study abroad with proven expertise and personal care.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => navigate('/contact')}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
                    >
                        Book Free Consultation
                    </button>
                    <button
                        onClick={() => navigate('/contact')}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Explore Services
                    </button>
                </div>
            </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
);

/* ─────────────────────────────────────────────────────────────
   TRUST STATS
───────────────────────────────────────────────────────────── */
const stats = [
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M12 13a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
        ),
        number: 500, suffix: '+',
        label: 'Students Placed',
        sub: 'Securing admissions in top international universities',
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        number: 98, suffix: '%',
        label: 'Visa Success Rate',
        sub: 'Expert documentation and interview preparation',
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        number: 10, suffix: '+',
        label: 'Countries Covered',
        sub: 'USA, UK, Canada, Australia, Europe & more',
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        number: 10, suffix: '+',
        label: 'Years of Experience',
        sub: 'Trusted guidance from consultation to departure',
    },
];

const TrustStats = () => (
    <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((s, i) => (
                    <div
                        key={i}
                        className="group text-center p-8 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 mb-5 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                            {s.icon}
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-1 tabular-nums">
                            <CountUp end={s.number} suffix={s.suffix} />
                        </div>
                        <div className="text-base font-semibold text-gray-800 mb-2">{s.label}</div>
                        <p className="text-sm text-gray-500 leading-relaxed">{s.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────────────────────────── */
const highlights = [
    'Personalized university selection guidance',
    'End-to-end visa documentation support',
    'Education loan assistance',
    'Transparent and ethical consultation',
];

const About = () => (
    <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center lg:text-left">

                {/* Content */}
                <div>
                    <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">About Us</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        Your Trusted Partner for{' '}
                        <span className="text-orange-500">Studying Abroad</span>
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                        We provide complete support for students who want to pursue higher education overseas. From university selection to visa approval, we guide you at every step.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        With years of experience and a strong success record, we simplify the entire process so you can focus on your future.
                    </p>

                    <div className="mb-8 flex flex-col items-center lg:items-start">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                        <ul className="space-y-3 text-left">
                            {highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-3 h-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">{h}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        onClick={() => navigate('/contact')}
                        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
                    >
                        Book Your Free Consultation
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   SERVICES GRID
───────────────────────────────────────────────────────────── */
const services = [
    {
        img: 'https://plus.unsplash.com/premium_photo-1682974403236-5c3f97d854d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'University Admissions',
        desc: 'We help you shortlist the right universities and courses based on your profile and career goals.',
    },
    {
        img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
        title: 'Student Visa Assistance',
        desc: 'Complete documentation, SOP guidance, and interview preparation to maximize visa approval chances.',
    },
    {
        img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
        title: 'Education Loan Support',
        desc: 'Guidance for secured and unsecured loans with leading financial institutions.',
    },
    {
        img: 'https://images.unsplash.com/photo-1576078361289-d7c4da40e7cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Immigration & Counseling',
        desc: 'Professional counseling to help you choose the best country and career pathway.',
    },
    {
        img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
        title: 'SOP & LOR Writing',
        desc: 'Expert assistance crafting compelling Statements of Purpose and Letters of Recommendation.',
    },
    {
        img: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=800&q=80',
        title: 'Pre-Departure Briefing',
        desc: 'Complete orientation on accommodation, travel, banking, and cultural adaptation abroad.',
    },
];

const ServicesGrid = () => (
    <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">What We Offer</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Core Services</h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    End-to-end support for every stage of your study abroad journey.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((s, i) => (
                    <div
                        key={i}
                        className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-100 transition-all duration-400 hover:-translate-y-2"
                    >
                        <div className="relative overflow-hidden h-52">
                            <img
                                src={s.img}
                                alt={s.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                        </div>
                        <div className="p-7">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors duration-300">{s.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm mb-5">{s.desc}</p>
                            <button
                                onClick={() => navigate('/contact')}
                                className="inline-flex items-center gap-1.5 text-orange-500 font-semibold text-sm hover:gap-3 transition-all duration-300"
                            >
                                Learn More
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   EDUCATION CATEGORIES
───────────────────────────────────────────────────────────── */
const categories = [
    {
        img: 'https://images.unsplash.com/photo-1762438136297-1393f86696bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHVuZGVyJTIwZ3JhZHVhdGV8ZW58MHx8MHx8fDA%3D',
        title: 'Undergraduate Programs',
        sub: 'Build a strong academic foundation at top global universities.',
    },
    {
        img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
        title: 'Postgraduate Programs',
        sub: 'Advance your career with internationally recognized master\'s degrees.',
    },
    {
        img: 'https://plus.unsplash.com/premium_photo-1682787494977-d013bb5a8773?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Certification Courses',
        sub: 'Short-term and career-focused global programs that create impact.',
    },
    {
        img: 'https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg',
        title: 'Study in USA',
        sub: 'Ivy League to state universities — find your perfect match.',
    },
    {
        img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
        title: 'Study in UK & Europe',
        sub: 'Oxford, Edinburgh, Amsterdam — world-class education awaits.',
    },
    {
        img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
        title: 'Study in Australia & Canada',
        sub: 'PR-friendly destinations with exceptional quality of life.',
    },
];

const EducationCategories = () => (
    <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">Destinations & Programs</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Explore Study Opportunities</h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    Undergraduate, postgraduate, and professional pathways across the globe.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((c, i) => (
                    <div
                        key={i}
                        onClick={() => navigate('/contact')}
                        className="group relative rounded-2xl overflow-hidden h-72 cursor-pointer"
                    >
                        <img
                            src={c.img}
                            alt={c.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-7">
                            <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-orange-300 transition-colors duration-300">{c.title}</h3>
                            <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">{c.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   PROCESS TIMELINE
───────────────────────────────────────────────────────────── */
const steps = [
    {
        n: '01',
        title: 'Free Consultation',
        desc: 'Understand your goals, evaluate your academic profile, and plan the right path forward.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
    },
    {
        n: '02',
        title: 'University Shortlisting',
        desc: 'Select the best-fit universities and courses aligned with your profile and career goals.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
    },
    {
        n: '03',
        title: 'Application & Docs',
        desc: 'Complete application filing, SOP writing, LOR requests, and document preparation.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
    },
    {
        n: '04',
        title: 'Visa & Departure',
        desc: 'Visa application support, mock interviews, and a comprehensive pre-departure briefing.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        ),
    },
];

const Process = () => (
    <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
                <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">How It Works</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Simple 4-Step Process</h2>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">
                    A structured, transparent approach from consultation to departure.
                </p>
            </div>

            {/* Desktop timeline */}
            <div className="hidden lg:block">
                <div className="relative">
                    {/* connector */}
                    <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-100 mx-16" />
                    <div className="absolute top-12 left-0 right-0 h-0.5 mx-16 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-300 to-orange-500 w-full origin-left" style={{ animation: 'grow 1.5s ease-out forwards' }} />
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                        {steps.map((s, i) => (
                            <div key={i} className="relative flex flex-col items-center text-center group">
                                <div className="relative z-10 w-24 h-24 rounded-full border-4 border-white shadow-xl bg-white flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-all duration-300">
                                    <div className="w-16 h-16 rounded-full bg-orange-50 group-hover:bg-orange-400 flex items-center justify-center text-orange-500 group-hover:text-white transition-all duration-300">
                                        {s.icon}
                                    </div>
                                </div>
                                <span className="text-4xl font-black text-gray-100 absolute top-7 left-1/2 -translate-x-1/2 select-none">{s.n}</span>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors duration-300">{s.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile/tablet timeline */}
            <div className="lg:hidden space-y-0">
                {steps.map((s, i) => (
                    <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                        {/* vertical connector */}
                        {i < steps.length - 1 && (
                            <div className="absolute left-6 top-14 w-0.5 h-full bg-orange-100" />
                        )}
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg z-10">
                            {s.icon}
                        </div>
                        <div className="pt-1">
                            <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Step {s.n}</span>
                            <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">{s.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


/* ─────────────────────────────────────────────────────────────
   UNIVERSITY LOGOS
───────────────────────────────────────────────────────────── */
const universities = [
    { name: 'Harvard University', abbr: 'HU' },
    { name: 'MIT', abbr: 'MIT' },
    { name: 'Oxford University', abbr: 'OXF' },
    { name: 'University of Toronto', abbr: 'UofT' },
    { name: 'University of Melbourne', abbr: 'UoM' },
    { name: 'Stanford University', abbr: 'SU' },
    { name: 'Cambridge University', abbr: 'CAM' },
    { name: 'McGill University', abbr: 'MG' },
    { name: 'Columbia University', abbr: 'CU' },
    { name: 'NUS Singapore', abbr: 'NUS' },
];

const countries = ['USA', 'UK', 'Canada', 'Australia', 'Europe', 'Singapore'];

const UniversityLogos = () => (
    <section className="bg-white py-20 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
                <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">Partner Institutions</span>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Students Are Placed In</h2>
                <div className="flex flex-wrap justify-center gap-3 mt-5">
                    {countries.map(c => (
                        <span key={c} className="px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-semibold rounded-full border border-orange-100">
                            {c}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                {universities.map((u, i) => (
                    <div
                        key={i}
                        className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all duration-300 hover:-translate-y-1 cursor-default"
                    >
                        <div className="w-14 h-14 rounded-xl bg-gray-100 group-hover:bg-orange-500 flex items-center justify-center font-black text-gray-400 group-hover:text-white text-xs transition-all duration-300">
                            {u.abbr}
                        </div>
                        <span className="text-xs text-gray-400 group-hover:text-gray-700 font-medium text-center transition-colors duration-300 leading-tight">
                            {u.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────────────────────── */
const FinalCTA = () => (
    <section className="relative py-32 overflow-hidden">
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/study-abroad/study-abroad-background-image.webp')" }}
        />
        <div className="absolute inset-0 bg-gray-950/80" />

        {/* decorative radial */}
        <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-transparent to-transparent" style={{
            background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.15) 0%, transparent 70%)'
        }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-8">
                Start Your Journey Today
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to Study{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                    Abroad?
                </span>
            </h2>
            <p className="text-gray-300 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                Take the first step toward your international education dream. Our experts are ready to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => navigate('/contact')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-5 rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1"
                >
                    Book Free Consultation
                </button>
                <button
                    onClick={() => navigate('/contact')}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-10 py-5 rounded-xl text-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                >
                    Call Us Now
                </button>
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
const StudyAbroad = () => {
    return (
        <>
            <Helmet>
                <title>Study Abroad Services | Expert Guidance for International Education</title>
                <meta name="description" content="Expert study abroad consulting — university admissions, student visa, education loans, and immigration support for USA, UK, Canada, Australia & Europe." />
            </Helmet>

            <style>{`
                @keyframes grow {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(1.02); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>

            <Hero />
            <TrustStats />
            <About />
            <ServicesGrid />
            <EducationCategories />
            <Process />
            <UniversityLogos />
            <FinalCTA />
        </>
    );
};

export default StudyAbroad;
