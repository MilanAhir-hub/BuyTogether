import React from 'react';
import { 
    Building01Icon, 
    UserGroupIcon, 
    Discount01Icon, 
    ArrowRight01Icon 
} from "hugeicons-react";
import Button from "../components/ui/Button";
import { Link } from 'react-router-dom';

const HowItWorks = () => {
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
        <div className="min-h-screen bg-white pb-20">
            {/* Header Section */}
            <div className="bg-bg-light py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
                    How it <span className="text-primary">Works</span>
                </h1>
                <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                    We've simplified real estate investing by bringing people together. 
                    No complicated paperwork, just group power and massive savings.
                </p>
            </div>

            {/* Steps Section */}
            <div className="max-w-7xl mx-auto px-6 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group p-8 rounded-none border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 bg-white">
                            <div className={`w-16 h-16 ${step.bg} rounded-none flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
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

            {/* Why it Works / FAQ Preview */}
            <div className="max-w-5xl mx-auto px-6 mt-32 text-center">
                <div className="bg-secondary text-white rounded-none p-12 md:p-20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 italic">"Buy together, win together."</h2>
                        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                            The real estate market is designed for big players. TogetherBuy puts that same power into the hands of individual home buyers.
                        </p>
                        <Link to="/properties" className="inline-block">
                            <Button className="w-fit! px-10 gap-3 group">
                                <span>Browse Properties</span>
                                <ArrowRight01Icon size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
