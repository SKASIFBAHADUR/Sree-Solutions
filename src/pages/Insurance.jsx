import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import CountUp from '../components/ui/CountUp';
import { Shield, Heart, Plane, Activity, Anchor, Sprout, Briefcase, User, Award, CheckCircle, ShieldCheck } from 'lucide-react';

// Navigation Helper
const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
};

// --- DATA ---
const insuranceOverview = {
    title: "Comprehensive Insurance Protection",
    text: "With our extensive insurance services, we help you safeguard your possessions, business, life, and health from unforeseen circumstances. Our expert advisors navigate the complexities of coverage to build a customized safety net, ensuring total peace of mind for you and your family."
};

const insuranceTypes = [
    {
        icon: <Shield className="w-8 h-8" />,
        title: "Vehicle Insurance",
        summary: "Comprehensive and third-party liability coverage for cars and bikes.",
        details: "Protect your vehicles against accidents, theft, and natural disasters. We provide end-to-end guidance from selecting the best premium rates to ensuring quick and hassle-free claim settlements."
    },
    {
        icon: <Heart className="w-8 h-8" />,
        title: "Life Insurance",
        summary: "Protect your family's future and cover financial liabilities.",
        details: "Ensure financial stability for your loved ones with tailored term plans and whole life policies. We help you choose the right sum assured based on your life goals and liabilities."
    },
    {
        icon: <Plane className="w-8 h-8" />,
        title: "Travel Insurance",
        summary: "Coverage for medical emergencies and trip cancellations abroad.",
        details: "Stay protected durante your international and domestic travels. Our plans cover medical expenses, loss of passport, baggage delay, and flight cancellations for a worry-free journey."
    },
    {
        icon: <Activity className="w-8 h-8" />,
        title: "Health Insurance",
        summary: "Comprehensive medical coverage for you and your family.",
        details: "Access the best healthcare without financial stress. Our health plans cover hospitalization, day-care procedures, critical illnesses, and pre/post-hospitalization expenses."
    },
    {
        icon: <Anchor className="w-8 h-8" />,
        title: "Marine Insurance",
        summary: "Protection for goods and vessels durante transit at sea.",
        details: "Essential for businesses involved in international trade. We cover damage or loss of cargo, ships, and terminals, ensuring your supply chain remains resilient."
    },
    {
        icon: <Sprout className="w-8 h-8" />,
        title: "Crop and Cattle Insurance",
        summary: "Financial security for farmers against agricultural risks.",
        details: "Minimize the impact of natural calamities on your livelihood. Our plans safeguard crops against weather fluctuations and protect livestock against accidental death or diseases."
    },
    {
        icon: <Briefcase className="w-8 h-8" />,
        title: "Business Insurance",
        summary: "Liability, asset protection, and employee coverage for enterprises.",
        details: "Shield your business operations from unforeseen interruptions and liabilities. We offer property insurance, professional indemnity, and workers' compensation customized to your industry."
    },
    {
        icon: <User className="w-8 h-8" />,
        title: "Personal Accident Insurance",
        summary: "Coverage against accidental injuries and disabilities.",
        details: "Ensure financial support in case of accidental death or permanent disability. This plan provides a lump sum payment to the insured or their family to manage lost income and medical costs."
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "Pravasi Bharatiya Bima Yojana (PBBY)",
        summary: "Mandatory insurance for Indian workers with ECR passports traveling abroad.",
        details: "The Pravasi Bharatiya Bima Yojana (PBBY) is a mandatory insurance policy for Indian workers with Emigration Check Required (ECR) passports traveling abroad for employment. Revised in 2017, it provides ₹10 lakhs coverage for accidental death or permanent disability, medical insurance up to ₹1 lakh, and repatriation costs for a 2-3 year term."
    }
];

const includes = [
    "Customized life and term insurance plans",
    "Comprehensive health coverage with cashless hospitalization",
    "Vehicle insurance with quick claim processing",
    "Business liability and asset protection",
    "Hassle-free policy renewal and management"
];

const benefits = [
    "Complete transparency in policy terms",
    "Significant premium savings through tailored plans",
    "Dedicated 24/7 emergency support",
    "Minimized out-of-pocket expenses during crises",
    "Unbiased evaluation of competing policies"
];

const capabilities = [
    { title: "Life Insurance", desc: "Term plans, endowment policies, and whole life coverage for financial security." },
    { title: "Health Insurance", desc: "Individual and family floaters covering hospitalization and critical illnesses." },
    { title: "Vehicle Insurance", desc: "Comprehensive and third-party liability coverage for cars and bikes." },
    { title: "General Insurance", desc: "Protection for home, travel, and miscellaneous risks." },
    { title: "Claim Assistance", desc: "Dedicated support for filing and tracking insurance claims seamlessly." },
    { title: "Policy Audit", desc: "Reviewing existing policies to optimize coverage and reduce premiums." }
];

const processSteps = [
    { n: "01", title: "Risk Assessment", desc: "Evaluating your personal or business risk profile to determine coverage needs." },
    { n: "02", title: "Policy Comparison", desc: "Comparing policies from top insurers for the best features and premiums." },
    { n: "03", title: "Application & Issuance", desc: "Handling all documentation and coordination for rapid policy issuance." },
    { n: "04", title: "Claims Support", desc: "Guiding you through the claim process for a smooth and fair settlement." }
];

const realResults = [
    { label: "Challenge", text: "A family faced significant medical expenses due to a sudden illness, but their existing health policy had multiple exclusions and long waiting periods." },
    { label: "Approach", text: "We reviewed their portfolio and migrated them to a comprehensive plan with wider coverage, no hidden clauses, and shorter waiting periods." },
    { label: "Outcome", text: "The family saved 30% on out-of-pocket expenses during a subsequent hospitalization, fully supported by our dedicated cashless claim assistance." }
];

const whyChooseUs = [
    { title: "Unbiased Advice", desc: "We recommend policies based purely on your needs, not on agent commissions.", icon: "⚖️" },
    { title: "Claim Advocacy", desc: "We stand by your side during claims, fighting for your right to a fair settlement.", icon: "🛡️" },
    { title: "Wide Network", desc: "Access to products from all leading public and private insurance providers.", icon: "🌐" },
    { title: "Digital Management", desc: "Easy online access to all your policy documents and automated renewal reminders.", icon: "📱" }
];

// --- COMPONENTS ---

const Hero = () => (
    <section className="relative min-h-[850px] flex items-center pt-[80px] bg-slate-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img
                src="https://images.unsplash.com/photo-1542361345-89e58247f2d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Family Protection"
                className="w-full h-full object-cover origin-center"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-900/80 to-gray-900/40"></div>
        </div>

        {/* Content Container - 1440px desktop width rule */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-[120px]">
            {/* Grid 12 columns context */}
            <div className="max-w-[720px]">
                <span className="block text-blue-400 font-semibold tracking-widest uppercase text-sm mb-6">Premium Insurance Advisory</span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.15] mb-6">
                    Insurance Services
                </h1>
                <h2 className="text-2xl md:text-3xl text-gray-200 font-medium leading-snug mb-8">
                    Protect What Matters Most
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-12">
                    Comprehensive coverage strategies tailored to safeguard your family, your health, and your business against life's uncertainties. Expert advisory you can trust.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                    <button onClick={() => navigate('/contact')} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center justify-center px-8 py-4 rounded-xl text-button transition-all shadow-xl shadow-blue-500/20">
                        Start Your Policy Consultation
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold flex items-center justify-center px-8 py-4 rounded-xl text-button transition-all">
                        Explore Insurance Types
                    </button>
                </div>

                {/* Inline trust highlights */}
                <div className="flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
                    {[
                        { icon: "✓", text: "IRDAI Certified" },
                        { icon: "🛡️", text: "Unbiased Advisory" },
                        { icon: "⏱️", text: "Cashless Claims" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">{item.icon}</span>
                            <span className="text-gray-300 font-medium text-sm">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const InsuranceOverview = () => (
    <section className="py-[120px] bg-white">
        {/* Container: 1200px equivalent padding for 1440px screen */}
        <div className="w-full max-w-[1248px] mx-auto px-6 sm:px-8">
            <div className="flex flex-col lg:flex-row gap-[24px]">
                {/* Left (5 columns equivalent) */}
                <div className="w-full lg:w-5/12">
                    <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1602449204748-331279a2ed37?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Umbrella Protection"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                    </div>
                </div>

                {/* Right (7 columns equivalent) */}
                <div className="w-full lg:w-7/12 flex flex-col justify-center lg:pl-12">
                    <span className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">Coverage That Counts</span>
                    <h2 className="text-4xl text-gray-900 font-extrabold leading-tight mb-[32px]">
                        {insuranceOverview.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-[1.8] max-w-[720px]">
                        {insuranceOverview.text}
                    </p>
                </div>
            </div>
        </div>
    </section>
);

const TypesCard = ({ item }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="bg-white rounded-[12px] p-[24px] border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full">
            <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                {item.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed mb-6 flex-grow">{item.summary}</p>

            <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[200px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-600 text-sm leading-relaxed pb-2 border-t border-gray-100 pt-4">{item.details}</p>
            </div>

            <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 font-semibold text-sm flex items-center gap-2 mt-auto hover:text-blue-800 transition-colors w-max"
            >
                {expanded ? 'Show Less' : 'View Details'}
                <svg className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    );
};

const TypesOfInsurance = () => (
    <section className="py-[100px] bg-slate-50">
        <div className="w-full max-w-[1248px] mx-auto px-6 sm:px-8">
            <div className="text-center mb-[64px]">
                <h2 className="text-4xl font-extrabold text-gray-900">Types of Insurance Offered</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
                {insuranceTypes.map((item, i) => (
                    <TypesCard key={i} item={item} />
                ))}
            </div>
        </div>
    </section>
);


const OurProcess = () => (
    <section className="py-[120px] bg-white">
        <div className="w-full max-w-[1248px] mx-auto px-6 sm:px-8">
            <div className="text-center mb-[96px]">
                <h2 className="text-4xl font-extrabold text-gray-900">Our Process</h2>
            </div>

            <div className="relative">
                {/* Horizontal Line for Desktop */}
                <div className="hidden md:block absolute top-[48px] left-0 w-full h-[2px] bg-gray-100 -z-10"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-[48px] md:gap-[24px]">
                    {processSteps.map((s, i) => (
                        <div key={i} className="relative bg-white md:bg-transparent">
                            <div className="w-24 h-24 mx-auto rounded-full bg-white border-4 border-gray-50 shadow-[0_0_20px_rgba(0,0,0,0.03)] flex items-center justify-center mb-6 relative z-10">
                                <span className="text-4xl font-black text-gray-200">{s.n}</span>
                            </div>
                            <div className="text-center px-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const RealResultsSection = () => (
    <section className="py-[120px] bg-slate-50 border-y border-gray-200">
        <div className="w-full max-w-[1248px] mx-auto px-6 sm:px-8">
            <div className="text-center mb-[64px]">
                <h2 className="text-4xl font-extrabold text-gray-900">Real Results</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
                {realResults.map((r, i) => (
                    <div key={i} className="bg-white rounded-[12px] p-[48px] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-sm tracking-widest uppercase mb-6">{r.label}</span>
                        <p className="text-gray-700 leading-relaxed">{r.text}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


const TrustMetrics = () => (
    <section className="py-[100px] bg-blue-600 text-white">
        <div className="w-full max-w-[1248px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[48px] text-center">
                {[
                    { val: 10000, suffix: "+", lbl: "Policies Issued" },
                    { val: 98, suffix: "%", lbl: "Claim Success" },
                    { val: 25, suffix: "+", lbl: "Insurance Partners" },
                    { val: 15, suffix: "+", lbl: "Years Experience" }
                ].map((s, i) => (
                    <div key={i}>
                        <div className="text-[48px] sm:text-[56px] font-black tracking-tight mb-2 drop-shadow-sm">
                            <CountUp end={s.val} suffix={s.suffix} />
                        </div>
                        <div className="text-blue-100 font-medium text-lg">{s.lbl}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const OurCredentials = () => (
    <section className="py-[120px] bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 rotate-12 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 -translate-x-32 translate-y-32 blur-[120px]" />

        <div className="w-full max-w-[1248px] mx-auto px-6 sm:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-[64px]">
                <div className="w-full lg:w-6/12">
                    <span className="text-blue-400 font-bold uppercase tracking-wider text-sm mb-4 block">Certified Trust</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-8">
                        Our Credentials
                    </h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                                <Award size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">IRDAI Certified Partner</h4>
                                <p className="text-gray-400 leading-relaxed">
                                    We are officially certified by the **Insurance Regulatory and Development Authority of India (IRDAI)**. This certification ensures that our advisory follows the highest standards of ethics and compliance in the insurance industry.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Verified Compliance</h4>
                                <p className="text-gray-400 leading-relaxed">
                                    Our processes and recommendations are regularly audited to maintain absolute transparency and protect the interests of our clients.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-6/12 flex justify-center lg:justify-end">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-slate-800 border border-white/10 p-12 rounded-3xl flex flex-col items-center text-center">
                            <div className="w-32 h-32 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 mb-6">
                                <Shield size={64} strokeWidth={1} />
                            </div>
                            <div className="text-3xl font-black mb-2 tracking-tight">IRDAI</div>
                            <div className="text-blue-400 font-bold uppercase tracking-widest text-sm">Certified Advisor</div>
                            <div className="mt-8 pt-8 border-t border-white/5 w-full text-gray-500 text-xs italic">
                                Sree Solutions adheres to all regulatory guidelines<br />mandated by the Government of India.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const WhyChooseUsSection = () => (
    <section className="py-[120px] bg-white">
        <div className="w-full max-w-[1248px] mx-auto px-6 sm:px-8">
            <div className="flex flex-col md:flex-row gap-[64px]">
                <div className="w-full md:w-5/12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Why Choose Us</h2>
                    <p className="text-lg text-gray-500 max-w-[400px]">Experience advisory that prioritizes your peace of mind and financial security above all else.</p>
                </div>

                <div className="w-full md:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[48px]">
                    {whyChooseUs.map((w, i) => (
                        <div key={i} className="flex flex-col">
                            <div className="text-[32px] mb-4">{w.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{w.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{w.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const FinalCTA = () => (
    <section className="py-[120px] bg-gray-900" style={{ background: "radial-gradient(circle at center, #1e3a8a 0%, #0f172a 100%)" }}>
        <div className="w-full max-w-[700px] mx-auto px-6 text-center text-white">
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">Ready to Secure Your Future?</h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">Book a free consultation with our expert advisors and let us design a safety net built around your life.</p>
            <button
                onClick={() => navigate('/contact')}
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-10 py-5 rounded-xl text-lg transition-all shadow-xl shadow-white/10"
            >
                Start Consultation Now
            </button>
        </div>
    </section>
);


export default function Insurance() {
    return (
        <div className="antialiased selection:bg-blue-500 selection:text-white font-sans bg-white overflow-x-hidden">
            <Helmet>
                <title>Insurance Services | Premium Advisory | Sree Solutions</title>
                <meta name="description" content="Safeguard your future with our comprehensive insurance services. Unbiased advisory for life, health, auto, and business insurance." />
            </Helmet>

            <Hero />
            <OurCredentials />
            <InsuranceOverview />
            <TypesOfInsurance />
            <OurProcess />
            <TrustMetrics />
            <WhyChooseUsSection />
            <FinalCTA />
        </div>
    );
}
