import React from 'react';
import { 
    Tick01Icon, 
    GlobalIcon, 
    UserGroupIcon, 
    Shield01Icon 
} from "hugeicons-react";
import Button from "../components/ui/Button";
import { Link } from 'react-router-dom';

const About = () => {
    const stats = [
        { label: "Total Members", value: "1,200+", icon: <UserGroupIcon size={24} /> },
        { label: "Properties Listed", value: "85+", icon: <GlobalIcon size={24} /> },
        { label: "Community Savings", value: "₹15 Cr+", icon: <Tick01Icon size={24} /> },
    ];

    const values = [
        {
            title: "Transparency First",
            description: "No hidden costs. We provide a complete breakdown of every group deal and developer negotiation.",
            icon: <Shield01Icon size={32} />
        },
        {
            title: "Group Bargaining Power",
            description: "We leverage the power of crowds to secure bulk pricing that individual buyers can't access.",
            icon: <UserGroupIcon size={32} />
        },
        {
            title: "Verified Developers only",
            description: "Every property on our platform undergoes a rigorous 50-point legal and structural verification.",
            icon: <Tick01Icon size={32} />
        }
    ];

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero Section */}
            <div className="relative pt-24 pb-32 px-6 overflow-hidden bg-bg-light">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-none blur-[120px] -z-10"></div>
                <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-primary-light/10 rounded-none blur-[100px] -z-10"></div>
                
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-none text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                        Our Mission
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-secondary max-w-4xl mx-auto leading-tight mb-8">
                        Democratizing Real Estate Through <span className="text-primary underline decoration-primary-light/30 decoration-8 underline-offset-8 transition-all hover:decoration-primary/50">Collective Ownership</span>
                    </h1>
                    <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        TogetherBuy was born out of a simple observation: individually we are small, but together we are a force that can move the real estate market.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-6 -mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-8 rounded-none shadow-xl shadow-primary/5 border border-gray-100 text-center">
                            <div className="w-12 h-12 bg-bg-light rounded-none flex items-center justify-center text-primary mx-auto mb-4">
                                {stat.icon}
                            </div>
                            <h2 className="text-3xl font-bold text-secondary mb-1">{stat.value}</h2>
                            <p className="text-text-secondary font-medium tracking-wide text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our Story / Values Section */}
            <div className="max-w-7xl mx-auto px-6 mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-10 leading-tight">
                            Why we started <span className="text-primary italic">TogetherBuy?</span>
                        </h2>
                        <div className="space-y-8">
                            {values.map((value, index) => (
                                <div key={index} className="flex gap-6">
                                    <div className="shrink-0 w-14 h-14 bg-secondary text-white rounded-none flex items-center justify-center">
                                        {value.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-secondary mb-2">{value.title}</h4>
                                        <p className="text-text-secondary leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="aspect-square rounded-none overflow-hidden shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800" 
                                alt="Modern building"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 bg-primary p-10 rounded-none shadow-xl shadow-primary/30 max-w-[280px] hidden md:block">
                            <p className="text-white text-lg font-bold leading-tight">
                                "Our goal is to save 10,000+ families over ₹10 Lakhs each on their first home."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Final */}
            <div className="max-w-7xl mx-auto px-6 mt-40">
                <div className="bg-linear-to-r from-primary to-primary-light p-1 rounded-none">
                    <div className="bg-white rounded-none p-12 md:p-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Ready to join the movement?</h2>
                        <p className="text-text-secondary mb-10 text-lg">
                            Be part of the next group purchase and secure your financial future today.
                        </p>
                        <Link to="/signup">
                            <Button className="w-fit! px-12 py-4 text-base font-bold shadow-lg shadow-primary/20">
                                Get Started Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
