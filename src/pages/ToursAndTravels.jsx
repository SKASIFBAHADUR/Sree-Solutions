import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import CountUp from '../components/ui/CountUp';
import ToursClientsSection from '../components/ui/ToursClientsSection';

/* ─────────────────────────────────────────────────────────────
   NAVIGATION HELPER
───────────────────────────────────────────────────────────── */
const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
};



/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
const Hero = () => (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '820px' }}>
        <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay muted loop playsInline
        >
            <source src="/tours-and-travels/tours-travels.webm" type="video/webm" />
            <source src="/tours-and-travels/tours-travels.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/65 via-gray-900/55 to-gray-950/80" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-52 pb-24">
            <span className="inline-block border border-orange-400/50 bg-orange-500/15 text-orange-300 text-xs font-semibold tracking-[0.22em] uppercase px-5 py-2 rounded-full mb-8 backdrop-blur-sm">
                Sree Solutions — Travel Division
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Tours &amp; Travel —{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                    Sree Solutions
                </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
                Experience the World with Seamless Travel Solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                <button
                    onClick={() => navigate('/contact')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-9 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1"
                >
                    Plan Your Trip
                </button>
                <button
                    onClick={() => navigate('/contact')}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold px-9 py-4 rounded-xl text-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                >
                    Speak to Travel Expert
                </button>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                {['Trusted Travel Partner', 'Custom Packages', 'Secure Bookings'].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                        <div className="w-5 h-5 rounded-full bg-green-700 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        {t}
                    </div>
                ))}
            </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
);


/* ─────────────────────────────────────────────────────────────
   CORE CAPABILITIES — MODAL CARDS
───────────────────────────────────────────────────────────── */
const capabilities = [
    {
        img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
        title: 'International Tours',
        summary: 'World-class global tour packages with complete trip management.',
        detail: 'Fly to your dream destination with our fully managed international tour packages. We cover Europe, Southeast Asia, Middle East, USA, Canada, and beyond. Services include visa assistance, airport transfers, guided tours, accommodation, and 24/7 on-ground assistance. Every package is customizable to your budget and preferences.',
    },
    {
        img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
        title: 'Domestic Tours',
        summary: 'Explore every corner of India with tailored domestic packages.',
        detail: 'Discover the incredible diversity of India — from the Himalayan ranges in the north to the tranquil backwaters of Kerala in the south. Our domestic tour experts plan every detail: hotels, transport, guide, sightseeing permits, and local experiences. Group tours and private packages both available.',
    },
    {
        img: '/tours-and-travels/devotional-tour.webp',
        title: 'Devotional Tours',
        summary: 'Sacred pilgrimage itineraries with complete spiritual support.',
        detail: 'Embark on a soulful pilgrimage with our carefully curated devotional tour packages. We cover Char Dham, Vaishno Devi, Tirupati, Shirdi, Rameshwaram, and international pilgrimages. Special arrangements include puja bookings, priest accompaniment, accessible accommodation, and priority darshan passes.',
    },
    {
        img: '/tours-and-travels/booking.webp',
        title: 'Travel Bookings',
        summary: 'Flights, hotels, trains — all bookings at best-guaranteed rates.',
        detail: 'We are your one-stop booking platform for all travel needs. Book domestic and international flights, luxury and budget hotels, train tickets, bus passes, and event tickets through us. Our exclusive deals and negotiated rates ensure you always get the best value with confirmed, secure reservations.',
    },
    {
        img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
        title: 'Cab & Car Rentals',
        summary: 'Premium vehicle fleet — city, outstation, and corporate travel.',
        detail: 'Our verified and GPS-tracked vehicle fleet covers all travel needs. Choose from economy sedans, SUVs, premium cars, and 12-seater tempo travellers for group tours. Services include airport pickup/drop, city rides, outstation packages, and dedicated corporate accounts. All drivers are police-verified with professional training.',
    },
    {
        img: '/tours-and-travels/darshanam.webp',
        title: 'Temple Darshan Tickets',
        summary: 'Priority darshan passes — skip queues at top temples.',
        detail: 'We procure official VIP and special entry darshan tickets for the most sought-after temples — Tirupati Balaji, Shirdi Sai Baba, Vaishno Devi, ISKCON temples, and more. Our team ensures timely pass delivery with step-by-step darshan guidance so you have a serene, blessed experience without long waits.',
    },
];

const Modal = ({ item, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
    }, [onClose]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-gray-950/70 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
                onClick={e => e.stopPropagation()}
                style={{ animation: 'modalIn 0.3s ease-out' }}
            >
                <div className="relative h-56 overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                    <h3 className="absolute bottom-5 left-6 text-2xl font-bold text-white">{item.title}</h3>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-8">
                    <p className="text-gray-600 leading-relaxed mb-6">{item.detail}</p>
                    <button
                        onClick={() => { onClose(); navigate('/contact'); }}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
                    >
                        Book This Service
                    </button>
                </div>
            </div>
        </div>
    );
};

const CoreCapabilities = () => {
    const [activeModal, setActiveModal] = useState(null);
    return (
        <section className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">Expertise</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Core Capabilities</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Click any card to explore the full service in detail.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {capabilities.map((c, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-100/80 transition-all duration-400 hover:-translate-y-2 cursor-pointer"
                            onClick={() => setActiveModal(c)}
                        >
                            <div className="relative overflow-hidden h-52">
                                <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                            </div>
                            <div className="p-7">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">{c.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-5">{c.summary}</p>
                                <span className="inline-flex items-center gap-1.5 text-orange-500 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                                    Explore More
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {activeModal && <Modal item={activeModal} onClose={() => setActiveModal(null)} />}
        </section>
    );
};

/* ─────────────────────────────────────────────────────────────
   OUR PROCESS
───────────────────────────────────────────────────────────── */
const processSteps = [
    { n: '01', title: 'Planning', desc: 'We understand your travel goals, budget, dates, and preferences to craft a bespoke itinerary.' },
    { n: '02', title: 'Booking', desc: 'Our team secures the best flights, hotels, and experiences — confirmed with full documentation.' },
    { n: '03', title: 'Documentation', desc: 'We assist with visas, travel insurance, permits, and all paperwork for a smooth journey.' },
    { n: '04', title: 'Journey', desc: 'Travel worry-free with 24/7 on-ground support, guided assistance, and emergency coordination.' },
];

const Process = () => (
    <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
                <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">How We Work</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Simple 4-Step Process</h2>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">A structured journey from planning to departure.</p>
            </div>

            {/* Desktop */}
            <div className="hidden lg:block">
                <div className="relative">
                    <div className="absolute top-12 left-24 right-24 h-px bg-gray-200" />
                    <div className="absolute top-12 left-24 right-24 h-px overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-300 to-orange-500" style={{ animation: 'grow 1.5s ease-out forwards' }} />
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        {processSteps.map((s, i) => (
                            <div key={i} className="relative flex flex-col items-center text-center group">
                                <div className="relative z-10 w-24 h-24 rounded-full bg-white border-4 border-gray-100 shadow-xl flex items-center justify-center mb-6 group-hover:border-orange-400 transition-all duration-300">
                                    <span className="text-3xl font-black text-gray-200 group-hover:text-orange-400 transition-all duration-300">{s.n}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors duration-300">{s.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="lg:hidden space-y-0">
                {processSteps.map((s, i) => (
                    <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                        {i < processSteps.length - 1 && <div className="absolute left-6 top-14 w-px h-full bg-orange-100" />}
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold z-10 shadow-lg">
                            {s.n}
                        </div>
                        <div className="pt-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1.5">{s.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-16">
                <button
                    onClick={() => navigate('/contact')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
                >
                    Start Your Journey
                </button>
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   REAL RESULTS
───────────────────────────────────────────────────────────── */
const resultStats = [
    {
        n: 1000, suffix: '+',
        label: 'Happy Travelers',
        sub: 'Successfully served across India and globally',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M12 13a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
        ),
    },
    {
        n: 95, suffix: '%',
        label: 'Customer Satisfaction',
        sub: 'Rated excellent by our travelers consistently',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        ),
    },
    {
        n: 24, suffix: '/7',
        label: 'Support Assistance',
        sub: 'Round-the-clock help for every travel emergency',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },
];

const RealResults = () => (
    <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">Track Record</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Real Results</h2>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">Numbers that reflect our commitment to every traveler's satisfaction.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {resultStats.map((s, i) => (
                    <div
                        key={i}
                        className="group text-center p-10 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                            {s.icon}
                        </div>
                        <div className="text-5xl font-black text-gray-900 mb-2 tabular-nums">
                            <CountUp end={s.n} suffix={s.suffix} />
                        </div>
                        <div className="text-xl font-bold text-gray-800 mb-2">{s.label}</div>
                        <p className="text-gray-400 text-sm leading-relaxed">{s.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   WHY CHOOSE US
───────────────────────────────────────────────────────────── */
const whyCards = [
    {
        icon: '🏆',
        title: 'One-Stop Service',
        desc: 'From visa to accommodation to sightseeing — we handle every detail of your trip so you travel without worry.',
    },
    {
        icon: '💰',
        title: 'Affordable Packages',
        desc: 'Premium travel experiences at honest prices. Our negotiated rates with partners ensure you get the most value for every rupee.',
    },
    {
        icon: '⭐',
        title: 'Trusted Experience',
        desc: 'Over a decade of organizing tours with a 95% satisfaction rate. Our expertise translates into seamless, memorable journeys.',
    },
    {
        icon: '🎯',
        title: 'Personalized Trips',
        desc: 'Every traveler is unique. We listen, plan, and customize every itinerary to match your style, budget, and travel goals.',
    },
];

const WhyChooseUs = () => (
    <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">Our Advantage</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">Reasons thousands of travelers across India trust Sree Solutions for their journeys.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {whyCards.map((c, i) => (
                    <div
                        key={i}
                        className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300 hover:-translate-y-1 flex gap-6"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-orange-500 transition-all duration-300 group-hover:scale-110">
                            {c.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">{c.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{c.desc}</p>
                        </div>
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
        <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
            alt="Travel background"
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-950/75" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.12) 0%, transparent 65%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block border border-orange-400/40 bg-orange-500/15 text-orange-300 text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-8 backdrop-blur-sm">
                Start Your Journey
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to Plan Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                    Journey?
                </span>
            </h2>
            <p className="text-gray-300 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                Let our experts design your perfect travel experience — from first consultation to safe return.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => navigate('/contact')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-5 rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1"
                >
                    Start Your Journey
                </button>
                <button
                    onClick={() => navigate('/contact')}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-10 py-5 rounded-xl text-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                >
                    Contact Travel Expert
                </button>
            </div>
        </div>
    </section>
);

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
const ToursAndTravels = () => (
    <>
        <Helmet>
            <title>Tours & Travel Services | Sree Solutions — Plan Your Dream Journey</title>
            <meta name="description" content="Premium tours and travel services — international, domestic, devotional tours, visa assistance, cab rentals, and temple darshan tickets. Trusted by 1000+ happy travelers." />
        </Helmet>

        <style>{`
            @keyframes grow {
                from { transform: scaleX(0); }
                to   { transform: scaleX(1); }
            }
            @keyframes modalIn {
                from { opacity: 0; transform: scale(0.93) translateY(12px); }
                to   { opacity: 1; transform: scale(1)  translateY(0);    }
            }
        `}</style>

        <Hero />
        {/* Tours & Travels Clients Section */}
        <ToursClientsSection />

        <CoreCapabilities />
        <Process />
        <RealResults />
        <WhyChooseUs />
        <FinalCTA />
    </>
);

export default ToursAndTravels;
