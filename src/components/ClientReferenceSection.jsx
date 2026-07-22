import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
    {
        quote: "From documentation to bank coordination and visa guidance, everything was handled in one place. The team was clear, responsive and extremely professional throughout the entire process.",
        author: "Rohit Sharma",
        location: "Hyderabad",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200",
        service: "Study Abroad & Banking Services"
    },
    {
        quote: "What impressed me most was their transparency. They clearly explained timelines, costs and risks before starting. There were no surprises and no unnecessary delays.",
        author: "Anjali Verma",
        location: "Bengaluru",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
        service: "Legal & Government Services"
    },
    {
        quote: "We approached them for travel and insurance support for our parents’ medical treatment. Their coordination with hospitals and insurers made a very stressful situation much easier.",
        author: "Suresh Naidu",
        location: "Visakhapatnam",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
        service: "Medical Assistance & Insurance Advisory"
    },
    {
        quote: "Their advisors understood our complete requirement — from RTO documentation to revenue services. The process was smooth, well-organised and professionally managed.",
        author: "Lakshmi Devi",
        location: "Guntur",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
        service: "RTO & Revenue Services"
    },
    {
        quote: "Unlike other agencies, they did not push generic options. The guidance for courses and overseas education was tailored to my profile and long-term goals.",
        author: "Mohammed Faizan",
        location: "Nellore",
        image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&q=80&w=200&h=200",
        service: "Courses & Study Abroad Advisory"
    },
    {
        quote: "A single relationship manager handled all our services — legal consultation, banking coordination and digital marketing support. It saved us a lot of time and internal effort.",
        author: "Kiran Reddy",
        location: "Vijayawada",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
        service: "Business & Digital Advisory Services"
    }
];

const ClientReferenceSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState('next');

    const handleNext = () => {
        if (isAnimating) return;
        setDirection('next');
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            setIsAnimating(false);
        }, 500);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setDirection('prev');
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
            setIsAnimating(false);
        }, 500);
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(handleNext, 8000);
        return () => clearInterval(timer);
    }, []);

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none relative">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none w-96 h-96 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400&h=400" alt="Consultancy" className="w-full h-full object-cover grayscale opacity-20" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header Navigation */}
                <div className="flex justify-between items-end mb-16 border-b border-[#E6DCC3]/50 pb-6">
                    <div>
                        <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
                            In Their Words
                        </span>
                        <h2 className="text-4xl font-serif text-secondary-900">Client Stories</h2>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handlePrev}
                            className="p-3 rounded-full border border-secondary-200 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                            aria-label="Previous testimonial"
                        >
                            <ArrowLeft className="w-5 h-5 text-secondary-600 group-hover:text-primary-600" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-3 rounded-full border border-secondary-200 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                            aria-label="Next testimonial"
                        >
                            <ArrowRight className="w-5 h-5 text-secondary-600 group-hover:text-primary-600" />
                        </button>
                    </div>
                </div>

                {/* Quote Content */}
                <div className="min-h-[400px] flex flex-col justify-center">
                    <div
                        className={`transition-all duration-500 ease-in-out transform ${isAnimating
                            ? direction === 'next'
                                ? '-translate-x-12 opacity-0 blur-sm'
                                : 'translate-x-12 opacity-0 blur-sm'
                            : 'translate-x-0 opacity-100 blur-0'
                            }`}
                    >
                        <blockquote className="relative">
                            <div className="flex gap-1.5 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-5 h-5 rounded-full overflow-hidden border border-yellow-200 shadow-sm">
                                        <img src="https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=80&w=100&h=100" alt="Star" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>

                            <p
                                className="text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.4] tracking-tight mb-12 text-secondary-800"
                            >
                                "{currentTestimonial.quote}"
                            </p>

                            <footer className="flex items-center gap-6">
                                <img
                                    src={currentTestimonial.image}
                                    alt={currentTestimonial.author}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                                />
                                <div>
                                    <div className="text-secondary-900 font-bold text-lg tracking-wide flex items-center gap-2">
                                        {currentTestimonial.author}
                                    </div>
                                    <div className="text-gray-500 text-sm font-medium mb-1">
                                        {currentTestimonial.location}
                                    </div>
                                    <div className="text-primary-600 text-xs font-bold tracking-wide uppercase">
                                        {currentTestimonial.service}
                                    </div>
                                </div>
                            </footer>
                        </blockquote>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex space-x-2 mt-8 justify-center">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (isAnimating || idx === currentIndex) return;
                                setDirection(idx > currentIndex ? 'next' : 'prev');
                                setIsAnimating(true);
                                setTimeout(() => {
                                    setCurrentIndex(idx);
                                    setIsAnimating(false);
                                }, 500);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-12 bg-primary-600' : 'w-2 bg-gray-300 hover:bg-primary-300'
                                }`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ClientReferenceSection;
