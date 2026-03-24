import React from 'react';
import { 
    Mail01Icon, 
    CallIcon, 
    Location01Icon, 
    SentIcon,
    UserIcon,
    LeftToRightListDashIcon
} from "hugeicons-react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

const ContactSection = () => {
    const contactInfo = [
        {
            icon: <Mail01Icon size={24} />,
            label: "Email us at",
            value: "support@togetherbuy.com",
            bg: "bg-blue-50",
            color: "text-blue-600"
        },
        {
            icon: <CallIcon size={24} />,
            label: "Call us at",
            value: "+91 98765 43210",
            bg: "bg-green-50",
            color: "text-green-600"
        },
        {
            icon: <Location01Icon size={24} />,
            label: "Visit our office",
            value: "123, Real Estate Hub, Hitech City, Hyderabad",
            bg: "bg-orange-50",
            color: "text-orange-600"
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
    };

    return (
        <section className="py-24 px-6 bg-bg-light/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                        Get in Touch
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
                        Let's Talk <span className="text-primary italic">Together</span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto text-lg leading-relaxed">
                        Have questions about group buying? Our team is available 24/7 to help you secure the best property deals.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-12">
                    {/* Left Column: Info Cards */}
                    <div className="space-y-8">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="flex items-center gap-6 p-6 rounded-[32px] border border-gray-100 bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                                <div className={`w-14 h-14 ${info.bg} ${info.color} rounded-2xl flex items-center justify-center shrink-0`}>
                                    {info.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">{info.label}</p>
                                    <p className="text-lg font-bold text-secondary">{info.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Premium Form */}
                    <div className="bg-white p-8 md:p-12 rounded-[48px] border border-gray-100 shadow-2xl shadow-primary/5">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <InputField 
                                label="Full Name" 
                                placeholder="Enter your name"
                                rightIcon={<UserIcon size={18} />}
                            />
                            
                            <InputField 
                                label="Email Address" 
                                type="email"
                                placeholder="Enter your email"
                                rightIcon={<Mail01Icon size={18} />}
                            />

                            <InputField 
                                label="Subject" 
                                placeholder="How can we help?"
                                rightIcon={<LeftToRightListDashIcon size={18} />}
                            />

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-secondary ml-4">
                                    Message
                                </label>
                                <textarea 
                                    rows="4"
                                    className="block w-full px-6 py-4 bg-white border border-gray-200 rounded-[28px] text-sm text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>

                            <Button type="submit" className="w-full h-14 text-base font-bold gap-3 shadow-lg shadow-primary/20">
                                <span>Send Message</span>
                                <SentIcon size={20} />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
