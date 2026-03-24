import React from 'react';
import { 
    Tick01Icon, 
    GlobalIcon, 
    UserGroupIcon, 
    Shield01Icon 
} from "hugeicons-react";
import Button from "../ui/Button";
import { Link } from 'react-router-dom';

const AboutSection = () => {
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
        <section className="py-24 px-6 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto">
                {/* Visual Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="aspect-4/3 rounded-[48px] overflow-hidden shadow-2xl relative translate-y-4">
                            <img 
                                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800" 
                                alt="Modern building"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="absolute -bottom-10 -left-10 bg-primary p-12 rounded-[32px] shadow-2xl shadow-primary/30 max-w-[300px] hidden lg:block z-10 transition-transform hover:scale-105 duration-300">
                            <p className="text-white text-xl font-bold leading-tight">
                                "Our mission is to save 10,000+ families over ₹10 Lakhs each on their first home."
                            </p>
                        </div>
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary-light/10 rounded-full blur-[80px] -z-10 animate-pulse"></div>
                    </div>

                    <div className="text-left">
                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                            Mission
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-10 leading-tight">
                            Democratizing Real Estate Through <span className="text-primary italic underline decoration-primary/30 decoration-8 underline-offset-8">Collective Power</span>
                        </h2>
                        
                        <div className="space-y-10">
                            {values.map((value, index) => (
                                <div key={index} className="flex gap-6 group">
                                    <div className="shrink-0 w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center transition-all group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:-translate-y-1">
                                        {value.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-secondary mb-2">{value.title}</h4>
                                        <p className="text-text-secondary leading-relaxed text-base">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-12 flex flex-wrap gap-8 items-center border-t border-gray-100 pt-12">
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <h3 className="text-2xl font-bold text-secondary">{stat.value}</h3>
                                    <p className="text-text-secondary text-sm font-medium tracking-wide uppercase">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
