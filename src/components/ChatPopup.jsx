import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

/**
 * ChatPopup Component
 * 
 * Instructions:
 * 1. Install EmailJS: npm install @emailjs/browser
 * 2. Get your keys from emailjs.com
 * 3. Replace SERVICE_ID, TEMPLATE_ID, and PUBLIC_KEY below.
 * 
 * EmailJS Template Variables:
 * - from_name
 * - from_phone
 * - service_type
 * - message
 */

const ChatPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "Study Abroad",
        message: ""
    });
    const [status, setStatus] = useState({ type: "", msg: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const popupRef = useRef(null);

    // Auto popup after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // Configuration - Replace with your own keys
    const EMAILJS_CONFIG = {
        SERVICE_ID: "YOUR_SERVICE_ID",
        TEMPLATE_ID: "YOUR_TEMPLATE_ID",
        PUBLIC_KEY: "YOUR_PUBLIC_KEY"
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
        setStatus({ type: "", msg: "" });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) return "Name is required";
        if (!formData.email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email address";
        if (!formData.phone.trim()) return "Phone is required";
        if (formData.phone.replace(/\D/g, "").length < 10) return "Phone must be at least 10 digits";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            setStatus({ type: "error", msg: error });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: "", msg: "" });

        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                from_phone: formData.phone,
                service_type: formData.service,
                message: formData.message
            };

            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAILJS_CONFIG.PUBLIC_KEY
            );

            setStatus({ type: "success", msg: "Consultation request sent successfully! 👋" });
            setFormData({ name: "", email: "", phone: "", service: "Study Abroad", message: "" });

            // Auto close after success
            setTimeout(() => {
                setIsOpen(false);
                setStatus({ type: "", msg: "" });
            }, 2500);

        } catch (err) {
            console.error("EmailJS Error:", err);
            setStatus({ type: "error", msg: "Failed to send message. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="chat-popup-wrapper" style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 9999, fontFamily: "'Inter', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                
                .chat-btn {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: #1B5E3B;
                    color: white;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(27, 94, 59, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .chat-btn:hover {
                    transform: scale(1.1) rotate(5deg);
                    background: #145230;
                }
                .chat-btn svg {
                    width: 28px;
                    height: 28px;
                }

                .chat-window {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 350px;
                    max-width: calc(100vw - 40px);
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transform-origin: bottom right;
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    opacity: ${isOpen ? "1" : "0"};
                    transform: ${isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)"};
                    pointer-events: ${isOpen ? "all" : "none"};
                }

                .chat-header {
                    background: #1B5E3B;
                    color: white;
                    padding: 24px 20px;
                    position: relative;
                }
                .chat-header h3 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                }
                .chat-header p {
                    margin: 8px 0 0;
                    font-size: 14px;
                    opacity: 0.9;
                }
                .close-btn {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    transition: background 0.2s;
                }
                .close-btn:hover {
                    background: rgba(255,255,255,0.3);
                }

                .chat-body {
                    padding: 24px 20px;
                    max-height: 450px;
                    overflow-y: auto;
                }
                .form-group {
                    margin-bottom: 16px;
                }
                .form-group label {
                    display: block;
                    font-size: 13px;
                    font-weight: 600;
                    color: #444;
                    margin-bottom: 6px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .form-group input, .form-group select, .form-group textarea {
                    width: 100%;
                    padding: 12px;
                    border: 1.5px solid #E2E8F0;
                    border-radius: 8px;
                    font-size: 14px;
                    font-family: inherit;
                    transition: border-color 0.2s;
                    background: #F8FAFC;
                }
                .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
                    outline: none;
                    border-color: #1B5E3B;
                    background: white;
                }
                
                .submit-btn {
                    width: 100%;
                    padding: 14px;
                    background: #1B5E3B;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    margin-top: 8px;
                }
                .submit-btn:hover {
                    background: #145230;
                    box-shadow: 0 4px 12px rgba(27, 94, 59, 0.2);
                }
                .submit-btn:disabled {
                    background: #CBD5E1;
                    cursor: not-allowed;
                }

                .status-msg {
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 14px;
                    margin-bottom: 16px;
                    text-align: center;
                }
                .status-success { background: #DCFCE7; color: #166534; border: 1px solid #BBF7D0; }
                .status-error { background: #FEE2E2; color: #991B1B; border: 1px solid #FECACA; }

                @media (max-width: 480px) {
                    .chat-window {
                        width: calc(100vw - 40px);
                        bottom: 75px;
                    }
                }
            `}</style>

            {/* Floating Toggle Button */}
            <button className="chat-btn" onClick={togglePopup} aria-label="Toggle chat">
                {isOpen ? (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                ) : (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                )}
            </button>

            {/* Popup Chat Window */}
            <div className="chat-window">
                <div className="chat-header">
                    <button className="close-btn" onClick={togglePopup}>&times;</button>
                    <h3>Consult with Experts</h3>
                    <p>Hi 👋 How can we assist you today?</p>
                </div>

                <div className="chat-body">
                    {status.msg && (
                        <div className={`status-msg ${status.type === "success" ? "status-success" : "status-error"}`}>
                            {status.msg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your Name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Your Email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="e.g. 9876543210"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Interested Service</label>
                            <select name="service" value={formData.service} onChange={handleInputChange}>
                                <option value="Study Abroad">Study Abroad</option>
                                <option value="Income Tax">Income Tax</option>
                                <option value="EPFO Services">EPFO Services</option>
                                <option value="ESIC Services">ESIC Services</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Message (Optional)</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Tell us more about your requirement..."
                                rows="3"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending..." : "Request Call Back"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatPopup;
