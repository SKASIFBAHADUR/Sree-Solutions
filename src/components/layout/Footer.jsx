import { Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <img
                            src="/services/logo.webp"
                            alt="Company Logo"
                            className="h-12 w-auto"
                        />
                        <p className="mt-4 text-secondary-300 text-small">
                            Premium consulting services for government, study abroad, and trusted documentation.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-small font-bold text-primary-200 uppercase tracking-wider !mb-4">
                            Services
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Study Abroad</a></li>
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Government Services</a></li>
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Travel Consultation</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-small font-bold text-primary-200 uppercase tracking-wider !mb-4">
                            Company
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-small font-bold text-primary-200 uppercase tracking-wider !mb-4">
                            Contact Us
                        </h3>
                        <ul className="space-y-2 text-secondary-300 text-small">
                            <li>123 Business Avenue</li>
                            <li>Suite 400</li>
                            <li>New York, NY 10001</li>
                            <li className="pt-2">contact@consultingpro.com</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-secondary-800 flex flex-col md:flex-row justify-between items-center text-sm text-secondary-400">
                    <p>&copy; {new Date().getFullYear()} Consulting Pro. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-orange-500 transition-all duration-300">
                            <Instagram size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-orange-500 transition-all duration-300">
                            <Twitter size={20} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-orange-500 transition-all duration-300">
                            <Youtube size={20} />
                        </a>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-orange-500 transition-all duration-300">
                            <MessageCircle size={20} />
                        </a>
                    </div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
