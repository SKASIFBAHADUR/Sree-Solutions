import React from 'react';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import {
    ChevronRight,
    Settings,
    Users,
    Monitor,
    GraduationCap,
    CheckCircle,
    ArrowRight,
    Stethoscope,
    Database,
    Clock,
    Shield
} from 'lucide-react';
import { getServiceBySlug } from '../data/servicesData';
import { navigateToContact } from '../utils/navigation';
import Button from '../components/ui/Button';

const MediGenie = () => {
    const service = getServiceBySlug('medical-assistant');

    if (!service) return null;

    const highlightIcons = {
        Settings: Settings,
        Users: Users,
        Monitor: Monitor,
        GraduationCap: GraduationCap
    };

    return (
        <div className="bg-[#F8FAFC] min-h-screen font-sans">
            <Helmet>
                <title>Medical Assistant Services | Sree Solutions</title>
                <meta name="description" content="Professional healthcare operations & digital support partner. From hospital digitalization to patient coordination." />
            </Helmet>

            {/* Section 1 — Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white to-emerald-50/30 -z-10" />

                {/* Decorative Elements */}
                <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary-100/50 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Reveal variant="fadeInLeft">
                            <div className="max-w-2xl">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
                                    Healthcare Operations & Digital Support
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E293B] leading-tight mb-6">
                                    Medical Assistant – Your Complete Healthcare Operations & Digital Support Partner
                                </h1>
                                <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                                    From hospital digitalization to patient coordination, our services ensure seamless healthcare management — from admissions to discharge.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={navigateToContact}
                                        className="px-8 py-4 bg-[#2563EB] text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        Schedule Consultation
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={navigateToContact}
                                        className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all text-center"
                                    >
                                        Partner With Us
                                    </button>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal variant="fadeInRight" delay={0.2}>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary-600 rounded-2xl rotate-3 group-hover:rotate-2 transition-transform opacity-10" />
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-white aspect-[4/3]">
                                    <img
                                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200"
                                        alt="Hospital staff using digital dashboard"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Medical Dashboard Overlay Mockup */}
                                    <div className="absolute bottom-6 right-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                                                <Database className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-800">Hospital Management System</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-3/4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Section 2 — ABOUT MEDICAL ASSISTANT */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <Reveal variant="fadeInUp">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-6">Meet Your Medical Assistant</h2>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Our medical assistant services are designed to simplify hospital operations and enhance patient care. We combine digital tools, operational expertise, and trained professionals to support hospitals in managing diagnostics, appointments, admissions, and patient coordination efficiently.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {service.highlights.map((item, idx) => {
                            const IconComp = highlightIcons[item.icon];
                            return (
                                <Reveal key={idx} variant="liftUp" delay={idx * 0.1}>
                                    <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/20 transition-all group">
                                        <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm mb-6 group-hover:bg-primary-600 transition-colors">
                                            <IconComp className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1E293B] mb-2">{item.title}</h3>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Section 3 — OUR SERVICES */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <Reveal variant="fadeInUp">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">Comprehensive Healthcare Services</h2>
                            <p className="text-slate-600">Tailored solutions for modern hospitals and healthcare institutions.</p>
                        </Reveal>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.capabilities.map((item, idx) => (
                            <Reveal key={idx} variant="fadeInUp" delay={idx * 0.05}>
                                <div className="h-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                            <Stethoscope className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1E293B]">{item.title}</h3>
                                    </div>
                                    <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
                                        {item.description}
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        {item.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-700">
                                                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={navigateToContact}
                                        className="text-[#2563EB] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                                    >
                                        Learn more
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4 — HOW IT WORKS */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-20 text-center">
                        <Reveal variant="fadeInUp">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B]">How It Works</h2>
                            <p className="text-slate-600 mt-4">A structured path to digital excellence in healthcare.</p>
                        </Reveal>
                    </div>

                    <div className="relative">
                        {/* Desktop Connector Line */}
                        <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-slate-100" />

                        <div className="grid lg:grid-cols-5 gap-12 relative z-10">
                            {service.process.map((step, idx) => (
                                <Reveal key={idx} variant="fadeInUp" delay={idx * 0.1}>
                                    <div className="text-center lg:text-left">
                                        <div className="w-20 h-20 rounded-2xl bg-primary-600 text-white flex items-center justify-center text-2xl font-bold mb-6 mx-auto lg:mx-0 shadow-lg shadow-primary-200">
                                            {idx + 1}
                                        </div>
                                        <h3 className="text-lg font-bold text-[#1E293B] mb-2">{step.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5 — WHY CHOOSE & SECTION 6 — BENEFITS */}
            <section className="py-24 bg-[#1E293B] text-white overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20">
                        {/* Section 5 — Why Choose */}
                        <Reveal variant="fadeInLeft">
                            <div>
                                <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                                    <span className="w-12 h-1 bg-emerald-500 rounded-full" />
                                    Why Choose Our Services
                                </h2>
                                <div className="space-y-6">
                                    {service.whyChooseUs.map((pillar, idx) => (
                                        <div key={idx} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                                <Shield className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold mb-2">{pillar.title}</h3>
                                                <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                        {/* Section 6 — Benefits for Hospitals */}
                        <Reveal variant="fadeInRight">
                            <div className="lg:pt-0 pt-12">
                                <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                                    <span className="w-12 h-1 bg-primary-500 rounded-full" />
                                    Benefits for Hospitals
                                </h2>
                                <div className="bg-white/5 rounded-3xl p-10 border border-white/10">
                                    <p className="text-slate-300 mb-10 italic">Hospitals using our services can achieve significant operational milestones:</p>
                                    <div className="space-y-6">
                                        {[
                                            'Faster patient processing',
                                            'Reduced administrative workload',
                                            'Better record management',
                                            'Improved patient experience',
                                            'Digital hospital infrastructure'
                                        ].map((benefit, idx) => (
                                            <div key={idx} className="flex items-center gap-4">
                                                <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle className="w-4 h-4 text-primary-400" />
                                                </div>
                                                <span className="text-lg font-medium text-slate-200">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                                        <div className="flex items-center gap-4 mb-2">
                                            <Clock className="w-5 h-5 text-emerald-400" />
                                            <span className="font-bold text-emerald-400">Efficiency Boost</span>
                                        </div>
                                        <p className="text-sm text-slate-400">Our clients report an average of 40% reduction in discharge processing time within the first month.</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Section 7 — CALL TO ACTION */}
            <section className="py-24 bg-white relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4">
                    <Reveal variant="liftUp">
                        <div className="bg-[#2563EB] rounded-3xl p-12 text-center text-white shadow-2xl overflow-hidden relative">
                            {/* Decorative flare */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Hospital Operations?</h2>
                            <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
                                Partner with us to digitalize your healthcare services and improve patient care today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={navigateToContact}
                                    className="px-10 py-5 bg-white text-primary-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-xl"
                                >
                                    Schedule Consultation
                                </button>
                                <button
                                    onClick={navigateToContact}
                                    className="px-10 py-5 border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
                                >
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>
                <div className="pt-40 text-center">
                    <Reveal variant="calmFade" delay={0.5}>
                        <p className="text-slate-400 text-sm">
                            © {new Date().getFullYear()} Sree Solutions | Healthcare Protocol v2.1
                        </p>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default MediGenie;
