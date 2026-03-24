import React from 'react';
import { 
    Building01Icon, 
    UserGroupIcon, 
    Discount01Icon, 
    ArrowRight01Icon 
} from "hugeicons-react";

const HowItWorksSection = () => {
    const steps = [
        {
            icon: <Building01Icon size={32} className="text-primary" />,
            title: "1. Find Your Dream Property",
            description: "Browse our curated list of high-potential residential and commercial properties from trusted builders.",
            bg: "bg-blue-50"
        },
        {
            icon: <UserGroupIcon size={32} className="text-primary" />,
            title: "2. Form or Join a Group",
            description: "Connect with like-minded buyers interested in the same property. The larger the group, the better the deal.",
            bg: "bg-orange-50"
        },
        {
            icon: <Discount01Icon size={32} className="text-primary" />,
            title: "3. Lock in Group Discounts",
            description: "Once the group target is met, we negotiate bulk pricing directly with the developer, saving you lakhs.",
            bg: "bg-green-50"
        }
    ];

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                        Process
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
                        How it <span className="text-primary">Works</span>
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                        We've simplified real estate investing by bringing people together. 
                        No complicated paperwork, just group power and massive savings.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group p-8 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 bg-white">
                            <div className={`w-16 h-16 ${step.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-4">{step.title}</h3>
                            <p className="text-text-secondary leading-relaxed">
                                {step.description}
                            </p>
                            
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 text-gray-200">
                                    <ArrowRight01Icon size={24} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
