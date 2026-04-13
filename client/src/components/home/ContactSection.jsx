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
import Section from '../ui/Section';
import Card from '../ui/Card';

const ContactSection = () => {
    const contactInfo = [
        {
            icon: <Mail01Icon size={24} />,
            label: "Email Us",
            value: "support@togetherbuy.com",
            bg: "bg-blue-50",
            color: "text-blue-600"
        },
        {
            icon: <CallIcon size={24} />,
            label: "Call Us",
            value: "+91 98765 43210",
            bg: "bg-emerald-50",
            color: "text-emerald-600"
        },
        {
            icon: <Location01Icon size={24} />,
            label: "Visit Us",
            value: "Hitech City, Hyderabad",
            bg: "bg-orange-50",
            color: "text-orange-600"
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Section 
            id="contact"
            light
            title={<>Let's Talk <span className="text-primary italic">Together</span></>}
            subtitle="Have questions about group buying? Our team is available 24/7 to help you secure the best property deals."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left Column: Info Cards */}
                <div className="grid grid-cols-1 gap-6">
                    {contactInfo.map((info, index) => (
                        <Card key={index} className="flex items-center gap-6 p-6 hover:border-primary/20 hover:-translate-y-1">
                            <div className={`w-14 h-14 ${info.bg} ${info.color} rounded-none flex items-center justify-center shrink-0`}>
                                {info.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{info.label}</p>
                                <p className="text-lg font-bold text-secondary">{info.value}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Right Column: Form */}
                <Card className="p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField 
                                label="Full Name" 
                                placeholder="Milan Ahir"
                                rightIcon={<UserIcon size={18} />}
                            />
                            <InputField 
                                label="Email address" 
                                type="email"
                                placeholder="milan@example.com"
                                rightIcon={<Mail01Icon size={18} />}
                            />
                        </div>

                        <InputField 
                            label="Subject" 
                            placeholder="How can we help?"
                            rightIcon={<LeftToRightListDashIcon size={18} />}
                        />

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-secondary ml-1">
                                Message
                            </label>
                            <textarea 
                                rows="4"
                                className="block w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-none text-sm text-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
                                placeholder="Tell us more about your requirements..."
                            ></textarea>
                        </div>

                        <Button type="submit" className="w-full h-14 text-base font-bold gap-3 shadow-md hover:shadow-lg transition-transform active:scale-95">
                            <span>Send Message</span>
                            <SentIcon size={20} />
                        </Button>
                    </form>
                </Card>
            </div>
        </Section>
    );
};

export default ContactSection;
