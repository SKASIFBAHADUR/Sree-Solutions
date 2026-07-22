import React, { useState } from 'react';
import Reveal from './animations/Reveal';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const homeFaqs = [
    {
        question: "What services does Sree Seva Consultancy provide?",
        answer: "We offer a comprehensive range of essential services including Study Abroad consulting, Government assistance (RTO, Income Tax, EPFO), Digital Marketing, Insurance Advisory, Banking support, and Legal guidance — all under one unified platform."
    },
    {
        question: "Where is Sree Seva Consultancy located?",
        answer: "Our primary office is located in Hyderabad, Telangana. We serve clients both locally and globally through our digital and onsite institutional networks."
    },
    {
        question: "How can I book a free consultation?",
        answer: "You can book a free consultation by clicking any 'Book Free Consultation' button on our website or by visiting our Contact Us page. One of our domain specialists will get back to you within 24 hours."
    },
    {
        question: "Do you assist with international documentation?",
        answer: "Yes, we specialize in international documentation for Study Abroad (admissions, visas), Global Travel, and cross-border consulting services across more than 15+ countries."
    },
    {
        question: "How long does the service processing usually take?",
        answer: "Processing times vary depending on the service. However, due to our proven institutional relationships with banks and government authorities, we typically achieve outcomes significantly faster than standard timelines."
    }
];

const FaqItem = ({ faq, isOpen, toggle }) => {
    return (
        <div className={`mb-4 border border-secondary-100 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-secondary-50 shadow-lg' : 'bg-white hover:border-primary-200'}`}>
            <button
                onClick={toggle}
                className="w-full text-left px-8 py-6 flex items-center justify-between gap-4 group"
            >
                <h3 className={`!text-[20px] font-bold transition-colors duration-300 !mb-0 ${isOpen ? 'text-primary-600' : 'text-secondary-900 group-hover:text-primary-600'}`}>
                    {faq.question}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary-600 text-white rotate-180' : 'bg-secondary-100 text-secondary-500 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-8 pt-2">
                    <p className="text-secondary-600">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary-50/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-50/30 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Left Column: Header */}
                    <div className="lg:w-1/3">
                        <Reveal variant="fadeInUp" delay={0.2}>
                            <span className="text-primary-600 font-bold tracking-widest uppercase text-small block">
                                Frequently Asked Questions
                            </span>
                        </Reveal>
                        <Reveal variant="calmFade" delay={0.4}>
                            <h2 className="text-secondary-900">
                                Everything you need to know to get started.
                            </h2>
                        </Reveal>
                        <Reveal variant="fadeInUp" delay={0.6}>
                            <p className="text-secondary-600">
                                Can't find the answer you're looking for? Reach out to our team of specialists directly.
                            </p>
                        </Reveal>
                        <Reveal variant="liftUp" delay={0.8}>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all duration-300 group"
                            >
                                Contact Support
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </Reveal>
                    </div>

                    {/* Right Column: FAQs */}
                    <div className="lg:w-2/3">
                        <div className="space-y-2">
                            {homeFaqs.map((faq, index) => (
                                <Reveal
                                    key={index}
                                    variant="fadeInUp"
                                    delay={0.2 + (index * 0.1)}
                                >
                                    <FaqItem
                                        faq={faq}
                                        isOpen={openIndex === index}
                                        toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                                    />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
