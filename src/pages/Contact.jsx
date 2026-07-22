import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle, Send } from 'lucide-react';
import Reveal from '../components/animations/Reveal';
import FaqSection from '../components/FaqSection';

// Reusable Input Component with Floating Label effect
const FloatingInput = ({ label, id, type = "text", value, onChange, placeholder, required = false }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative group">
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full px-4 py-4 bg-secondary-50 rounded-lg border-2 outline-none transition-all duration-300 text-secondary-900 placeholder-transparent peer
                    ${isFocused ? 'border-primary-600 ring-2 ring-primary-100' : 'border-transparent hover:border-secondary-200'}`}
                placeholder={placeholder}
                required={required}
            />
            <label
                htmlFor={id}
                className={`absolute left-4 transition-all duration-300 pointer-events-none text-secondary-500
                    ${isFocused || value ? '-top-2.5 text-xs bg-white px-1 text-primary-600 font-medium' : 'top-4 text-base'}`}
            >
                {label}
            </label>
        </div>
    );
};

// Reusable Textarea Component
const FloatingTextarea = ({ label, id, value, onChange, placeholder, required = false, rows = 4 }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative group">
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={rows}
                className={`w-full px-4 py-4 bg-secondary-50 rounded-lg border-2 outline-none transition-all duration-300 text-secondary-900 placeholder-transparent resize-none peer
                    ${isFocused ? 'border-primary-600 ring-2 ring-primary-100' : 'border-transparent hover:border-secondary-200'}`}
                placeholder={placeholder}
                required={required}
            />
            <label
                htmlFor={id}
                className={`absolute left-4 transition-all duration-300 pointer-events-none text-secondary-500
                    ${isFocused || value ? '-top-2.5 text-xs bg-white px-1 text-primary-600 font-medium' : 'top-4 text-base'}`}
            >
                {label}
            </label>
        </div>
    );
};

const Contact = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-16 relative overflow-hidden">
            <Helmet>
                <title>Contact Us | Sree Seva Consultancy Hyderabad</title>
                <meta name="description" content="Contact Sree Seva Consultancy in Hyderabad for study abroad, tax, legal, EPFO, RTO, insurance, and all consulting services. Call or email us today." />
                <link rel="canonical" href="https://sreesevaconsultancy.com/contact" />
            </Helmet>
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-l from-primary-50/50 to-transparent blur-3xl -z-10 pointer-events-none"></div>

            {/* Hero Section */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center relative z-10">
                <Reveal variant="fadeInUp" delay={0.1}>
                    <p className="text-secondary-500 font-bold tracking-wide uppercase text-small">Get in Touch</p>
                </Reveal>
                <Reveal variant="fadeInUp" delay={0.2}>
                    <h1 className="text-secondary-900">
                        Let’s Start <br className="hidden md:block" />
                        <span className="text-primary-600">Something Great</span>
                    </h1>
                </Reveal>
                <Reveal variant="fadeInUp" delay={0.3}>
                    <p className="text-secondary-600 max-w-2xl mx-auto">
                        Ready to transform your business or plan your next journey? Our team of experts is here to guide you every step of the way.
                    </p>
                </Reveal>
            </section>

            {/* Contact Info Cards */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: "/contact us/visit us.webp", title: "Visit Us", details: ["Plot No. 123, Jubilee Hills,", "Hyderabad, Telangana 500033"] },
                        { icon: "/contact us/call us.webp", title: "Call Us", details: ["+91 98765 43210", "+91 40 1234 5678"] },
                        { icon: "/contact us/email.webp", title: "Email Us", details: ["contact@consultingpro.com", "support@consultingpro.com"] },
                        { icon: "/contact us/working-hours.webp", title: "Working Hours", details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"] }
                    ].map((item, index) => (
                        <Reveal key={index} variant="liftUp" delay={0.4 + (index * 0.1)}>
                            <div className="group h-full bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-primary-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-start">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 overflow-hidden border border-gray-100 shadow-sm">
                                    <img src={item.icon} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-secondary-900 !mb-3">{item.title}</h3>
                                <div className="mt-auto space-y-1">
                                    {item.details.map((line, i) => (
                                        <p key={i} className="text-secondary-600 !mb-0">{line}</p>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Main Content Split: Form & Map */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Contact Form */}
                    <Reveal variant="fadeInRight" delay={0.6}>
                        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
                            {/* Form Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-10 opacity-50"></div>

                            <div className="mb-10">
                                <h2 className="text-secondary-900 !mb-2">Send a Message</h2>
                                <p className="text-secondary-500 !mb-0">We typically respond within 2 hours.</p>
                            </div>

                            {isSuccess ? (
                                <div className="bg-green-50 text-green-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center h-96 animate-fade-in">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                    <p className="text-green-700">Thank you for reaching out. Our team will get back to you shortly.</p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="mt-6 text-green-700 font-medium hover:text-green-900 underline underline-offset-2"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <FloatingInput
                                            label="Full Name"
                                            id="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <FloatingInput
                                            label="Phone Number"
                                            id="phone"
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <FloatingInput
                                        label="Email Address"
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <FloatingInput
                                        label="Subject"
                                        id="subject"
                                        placeholder="Service Inquiry"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />

                                    <FloatingTextarea
                                        label="Your Message"
                                        id="message"
                                        placeholder="Tell us about your requirements..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                    />

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-primary-900 to-primary-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-primary-900/20 hover:shadow-xl hover:shadow-primary-900/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </Reveal>

                    {/* Google Maps Wrapper */}
                    <Reveal variant="fadeInLeft" delay={0.6}>
                        <div className="h-full min-h-[500px] w-full bg-secondary-50 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-gray-100 relative group">
                            {/* Overlay for map interaction prompt if needed, or just pure map */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15224.99615014352!2d78.39798463205096!3d17.447781069796035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1707923456789!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 w-full h-full grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                            ></iframe>

                            {/* Glassmorphism Badge */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-lg pointer-events-none sm:pointer-events-auto max-w-sm">
                                <h4 className="font-bold text-secondary-900 flex items-center gap-2 mb-2">
                                    <MapPin size={18} className="text-primary-600" />
                                    Headquarters
                                </h4>
                                <p className="text-small text-secondary-600">
                                    Strategic Consulting Hub,<br />
                                    Jubilee Hills, Hyderabad,<br />
                                    Telangana, India
                                </p>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 mt-3 hover:text-primary-800 transition-colors pointer-events-auto"
                                >
                                    Get Directions <ArrowRight size={12} />
                                </a>
                            </div>
                        </div>
                    </Reveal>

                </div>
            </section>

            {/* FAQ Section */}
            <FaqSection />
        </div>
    );
};

export default Contact;
