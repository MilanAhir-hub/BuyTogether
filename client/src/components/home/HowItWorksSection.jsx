import React from 'react';
import { 
    Building01Icon, 
    UserGroupIcon, 
    Discount01Icon, 
    ArrowRight01Icon 
} from "hugeicons-react";
import Section from '../ui/Section';
import Card from '../ui/Card';

const HowItWorksSection = () => {
    const steps = [
        {
            icon: <Building01Icon size={32} />,
            title: "1. Find Your Dream Property",
            description: "Browse our curated list of high-potential residential and commercial properties from trusted builders.",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            icon: <UserGroupIcon size={32} />,
            title: "2. Form or Join a Group",
            description: "Connect with like-minded buyers interested in the same property. The larger the group, the better the deal.",
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            icon: <Discount01Icon size={32} />,
            title: "3. Lock in Group Discounts",
            description: "Once the group target is met, we negotiate bulk pricing directly with the developer, saving you lakhs.",
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        }
    ];

    return (
        <Section 
            id="how-it-works"
            title={<>How it <span className="text-primary italic">Works</span></>}
            subtitle="We've simplified real estate investing by bringing people together. No complicated paperwork, just group power and massive savings."
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <Card key={index} className="p-8 relative group hover:-translate-y-1">
                        <div className={`w-16 h-16 ${step.bg} ${step.color} rounded-xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110`}>
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-4">{step.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            {step.description}
                        </p>
                        
                        {index < steps.length - 1 && (
                            <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-slate-200 z-10">
                                <ArrowRight01Icon size={24} />
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </Section>
    );
};

export default HowItWorksSection;
