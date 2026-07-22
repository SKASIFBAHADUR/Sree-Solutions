import React from 'react';
import Reveal from './animations/Reveal';

const CtaSection = () => {
    const handleRedirect = (e) => {
        e.preventDefault();
        window.history.pushState({}, '', '/contact');
        window.dispatchEvent(new Event('popstate'));
    };

    return (
        <section className="w-full max-w-md mx-auto py-12 px-4 sm:px-0">
            <Reveal variant="liftUp" delay={0.2}>
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    {/* Image Header */}
                    <div className="h-48 w-full relative">
                        <img
                            alt="Corporate architectural detail"
                            className="w-full h-full object-cover grayscale opacity-80 brightness-90"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8MNwlCCfjAAQjRlierElmQ5ucDZ4XIxabmemA4m0gzFznIgcNlu5dlNsCFAHHM4HFvOujPMuL9uPSXyoG6mI6XTh394jzI3uxweGr4eTe1c81-Q-3e8F3aZvaoWlUfCuf1UhbK-aRbq9jm9JVEza0fvtmYDt63bFcRc3yHviAJxfv1ZirG_CBL357EdVCKjK4rCbRkfGLWVJWI8EWc462WUtKGHOj8BdkWWlnSj3jE9kj53YJKzdf-TQasy2joDooJSMTQ-ziNYpT"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
                    </div>

                    {/* Content Container */}
                    <div className="px-8 pb-12 -mt-12 relative z-10">
                        {/* Eyebrow */}
                        <Reveal variant="calmFade" delay={0.3}>
                            <div className="mb-4">
                                <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.25em] uppercase">
                                    Trusted Partnership
                                </span>
                            </div>
                        </Reveal>

                        {/* Headline */}
                        <Reveal variant="fadeInUp" delay={0.4}>
                            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] dark:text-white leading-tight mb-4">
                                Secure Your Future with Strategic Global Insight.
                            </h2>
                        </Reveal>

                        {/* Supporting Sentence */}
                        <Reveal variant="calmFade" delay={0.6}>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-10 font-light">
                                Providing unparalleled discretion and excellence for global leaders navigating complex international landscapes.
                            </p>
                        </Reveal>

                        {/* Actions */}
                        <div className="flex flex-col items-center gap-6">
                            {/* Primary Button */}
                            <Reveal variant="fadeInScale" delay={0.75} width="auto">
                                <div className="text-center">
                                    <button
                                        onClick={handleRedirect}
                                        className="bg-[#16439c] dark:bg-[#16439c] text-white font-semibold py-4 px-6 rounded-lg text-sm tracking-wide shadow-lg shadow-[#16439c]/10 active:opacity-90 transition-transform duration-200 ease-out active:-translate-y-0.5 hover:-translate-y-0.5 ring-offset-2 focus:ring-2 ring-[#16439c]"
                                    >
                                        Begin Your Consultation
                                    </button>
                                </div>
                            </Reveal>

                            {/* Secondary Action */}
                            <Reveal variant="calmFade" delay={0.9} width="auto">
                                <div className="text-center">
                                    <a
                                        className="inline-block text-[#1A1A1A] dark:text-slate-300 text-xs font-medium uppercase tracking-widest border-b border-[#1A1A1A]/20 dark:border-slate-300/20 pb-1 hover:border-[#1A1A1A] dark:hover:border-slate-300 transition-colors"
                                        href="/contact"
                                        onClick={handleRedirect}
                                    >
                                        Speak with an Advisor
                                    </a>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Subtle Bottom Border Indicator */}
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent"></div>
                </div>
            </Reveal>

            {/* Meta Information */}
            <Reveal variant="calmFade" delay={1.05}>
                <div className="mt-8 flex justify-center items-center gap-4 text-slate-400 dark:text-slate-600">
                    <span className="material-icons text-sm">public</span>
                    <span className="text-[10px] uppercase tracking-widest">Global Operations • London • Zurich • Singapore</span>
                </div>
            </Reveal>
        </section>
    );
};

export default CtaSection;
