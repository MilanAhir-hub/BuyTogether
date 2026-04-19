import React from 'react';
import { 
    Tick01Icon, 
    GlobalIcon, 
    UserGroupIcon, 
    Shield01Icon 
} from "hugeicons-react";
import Section from '../ui/Section';

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
            title: "Verified Developers Only",
            description: "Every property on our platform undergoes a rigorous 50-point legal and structural verification.",
            icon: <Tick01Icon size={32} />
        }
    ];

    return (
        <Section id="about">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="aspect-4/3 rounded-xl overflow-hidden shadow-md relative">
                        <img 
                            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800" 
                            alt="Modern building"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-primary p-10 rounded-xl shadow-lg max-w-[280px] hidden lg:block z-10">
                        <p className="text-white text-lg font-bold leading-tight">
                            "Our mission is to save 10,000+ families over ₹10 Lakhs each on their first home."
                        </p>
                    </div>
                </div>

                <div className="text-left">
                    <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                        Our Mission
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-10 leading-tight">
                        Democratizing Real Estate Through <span className="text-primary italic">Collective Power</span>
                    </h2>
                    
                    <div className="space-y-8">
                        {values.map((value, index) => (
                            <div key={index} className="flex gap-6 group">
                                <div className="shrink-0 w-14 h-14 bg-secondary text-white rounded-xl flex items-center justify-center transition-all group-hover:bg-primary group-hover:-translate-y-1">
                                    {value.icon}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-secondary mb-2">{value.title}</h4>
                                    <p className="text-slate-500 leading-relaxed text-sm">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-12 flex flex-wrap gap-8 items-center border-t border-slate-100 pt-10">
                        {stats.map((stat, i) => (
                            <div key={i}>
                                <h3 className="text-2xl font-bold text-secondary">{stat.value}</h3>
                                <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default AboutSection;
