import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { PillLink } from '../PillLink';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [servicesList, setServicesList] = useState([]);

    useEffect(() => {
        // Define the specific order requested by the user
        const orderedSlugs = [
            'study-abroad',
            'tours-and-travels',
            'digital-marketing',
            'epfo',
            'insurance',
            'legal-service-facilitator',
            'income-tax',
            'bank-services',
            'medical-assistant',
            'career-guru',
            'kisan-dosth',
            'revenue-services',
            'rto-services',
            'sree-seva'
        ];

        // Derive services list from servicesData in the specified order
        const services = orderedSlugs
            .map(slug => servicesData[slug])
            .filter(Boolean)
            .map(service => ({
                title: service.navTitle || service.title,
                slug: service.slug
            }));

        setServicesList(services);

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const handleOpenServices = () => {
            setIsServicesOpen(true);
            setIsMobileServicesOpen(true); // Open mobile menu too if on mobile
            // Scroll to top smoothly so navbar is visible if user is scrolled down
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // Close services menu when clicking outside
        const handleClickOutside = (e) => {
            if (isServicesOpen && !e.target.closest('.group')) {
                setIsServicesOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('open-services-menu', handleOpenServices);
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('open-services-menu', handleOpenServices);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isServicesOpen]);

    const isLightPage = ['/contact', '/services/medical-assistant'].includes(window.location.pathname);

    // Always keep navbar transparent (requested)
    const navbarClasses = 'bg-transparent py-4 border-transparent';

    const itemClass = (isScrolled || isLightPage)
        ? 'text-secondary-600 hover:text-primary-600'
        : 'text-white/90 hover:text-white';

    const mobileMenuButtonClass = (isScrolled || isLightPage)
        ? 'text-secondary-500 hover:text-primary-600'
        : 'text-white hover:text-white/80';

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarClasses}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/" className="flex-shrink-0 flex items-center">
                            <img
                                src="/services/logo.webp"
                                alt="ConsultingPro Logo"
                                className="h-10 w-auto"
                            />
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <PillLink
                            href="/"
                            className={`${itemClass} font-bold`}
                            style={{
                                '--pill-bg': 'transparent',
                                '--pill-text': (isScrolled || isLightPage) ? '#475569' : 'rgba(255,255,255,0.92)',
                                '--hover-text': '#0f172a',
                                '--base': '#a8e063'
                            }}
                        >
                            Home
                        </PillLink>
                        <PillLink
                            href="/about-us"
                            className={`${itemClass} font-bold`}
                            style={{
                                '--pill-bg': 'transparent',
                                '--pill-text': (isScrolled || isLightPage) ? '#475569' : 'rgba(255,255,255,0.92)',
                                '--hover-text': '#0f172a',
                                '--base': '#a8e063'
                            }}
                        >
                            About Us
                        </PillLink>
                        <PillLink
                            href="/recruitment"
                            className={`${itemClass} font-bold`}
                            style={{
                                '--pill-bg': 'transparent',
                                '--pill-text': (isScrolled || isLightPage) ? '#475569' : 'rgba(255,255,255,0.92)',
                                '--hover-text': '#0f172a',
                                '--base': '#a8e063'
                            }}
                        >
                            Jobs
                        </PillLink>


                        {/* Services Dropdown */}
                        <div className="relative group">
                            <button className={`${itemClass} px-3 py-2 text-small font-bold transition-colors duration-200 inline-flex items-center bg-transparent border-none cursor-pointer group-hover:text-primary-500 outline-none`}>
                                Services
                                <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Panel */}
                            <div className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-[90vw] max-w-5xl bg-white rounded-xl shadow-xl transition-all duration-200 ease-out z-50 border border-gray-100 overflow-hidden ${isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                                <div className="p-8">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-2">
                                        {servicesList.map((service, index) => (
                                            <a
                                                key={index}
                                                href={`/services/${service.slug}`}
                                                className="text-small text-secondary-600 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-colors duration-150 text-center font-bold flex items-center justify-center h-full"
                                            >
                                                {service.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <PillLink
                            href="/contact"
                            className={`${itemClass} font-bold`}
                            style={{
                                '--pill-bg': 'transparent',
                                '--pill-text': (isScrolled || isLightPage) ? '#475569' : 'rgba(255,255,255,0.92)',
                                '--hover-text': '#0f172a',
                                '--base': '#a8e063'
                            }}
                        >
                            Contact
                        </PillLink>
                        <PillLink
                            href="/contact"
                            className="ml-4 font-bold shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5"
                            style={{
                                '--pill-bg': (isScrolled || isLightPage) ? '#4f46e5' : '#ffffff',
                                '--pill-text': (isScrolled || isLightPage) ? '#ffffff' : '#0f172a',
                                '--hover-text': '#0f172a',
                                '--base': '#a8e063'
                            }}
                        >
                            Book Consultation
                        </PillLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors duration-200 ${mobileMenuButtonClass}`}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 top-full max-h-[85vh] overflow-y-auto">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-secondary-600 hover:text-primary-600 hover:bg-gray-50">
                            Home
                        </a>
                        <a href="/about-us" className="block px-3 py-2 rounded-md text-base font-medium text-secondary-600 hover:text-primary-600 hover:bg-gray-50">
                            About Us
                        </a>
                        <a href="/recruitment" className="block px-3 py-2 rounded-md text-base font-medium text-secondary-600 hover:text-primary-600 hover:bg-gray-50">
                            Jobs
                        </a>


                        {/* Mobile Services Wrap */}
                        <div className="space-y-1">
                            <button
                                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-secondary-600 hover:text-primary-600 hover:bg-gray-50 focus:outline-none"
                            >
                                Services
                                <svg className={`ml-2 h-5 w-5 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isMobileServicesOpen && (
                                <div className="pl-4 space-y-1 border-l-2 border-primary-100 ml-3 mt-1 pb-1">
                                    {servicesList.map((service, index) => (
                                        <a
                                            key={index}
                                            href={`/services/${service.slug}`}
                                            className="block px-3 py-2 rounded-md text-sm font-medium text-secondary-500 hover:text-primary-600 hover:bg-gray-50"
                                        >
                                            {service.title}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <a href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-secondary-600 hover:text-primary-600 hover:bg-gray-50">
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
