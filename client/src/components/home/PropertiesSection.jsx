import React, { useState } from 'react';
import { 
    Location01Icon, 
    UserGroupIcon, 
    Link01Icon,
} from "hugeicons-react";
import Button from "../ui/Button";
import { Link } from 'react-router-dom';

const PropertiesSection = () => {
    const mockProperties = [
        {
            id: 1,
            title: "Prestige Tranquil Heights",
            location: "Gachibowli, Hyderabad",
            price: "₹1.2 Cr - 1.8 Cr",
            pricePerMember: "₹95L",
            membersJoined: 6,
            totalMembers: 10,
            discount: "12%",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600",
            category: "Flats"
        },
        {
            id: 2,
            title: "Adani Green View Plots",
            location: "Sector 63, Gurgaon",
            price: "₹2.5 Cr - 4.0 Cr",
            pricePerMember: "₹2.1 Cr",
            membersJoined: 3,
            totalMembers: 5,
            discount: "15%",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600",
            category: "Plots"
        },
        {
            id: 3,
            title: "Lodha World One",
            location: "Worli, Mumbai",
            price: "₹5.5 Cr+",
            pricePerMember: "₹4.8 Cr",
            membersJoined: 2,
            totalMembers: 4,
            discount: "8%",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600",
            category: "Residential"
        }
    ];

    return (
        <section className="py-24 px-6 bg-bg-light/40 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
            
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="text-left">
                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                            Our Picks
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4 leading-tight">
                            Latest Group <span className="text-primary italic">Deals</span>
                        </h2>
                        <p className="text-text-secondary max-w-xl text-lg leading-relaxed">
                            Check out high-potential properties with active group targets. Join now to lock in exclusive bulk pricing.
                        </p>
                    </div>
                    <Link to="/properties">
                        <Button variant="ghost" className="w-fit! flex items-center gap-2 group decoration-primary/30 hover:underline decoration-4 underline-offset-4">
                            <span>Explore all properties</span>
                            <Link01Icon size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {mockProperties.map((property) => (
                        <div key={property.id} className="group flex flex-col bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={property.image} 
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-secondary uppercase tracking-wider">
                                        {property.category}
                                    </span>
                                    <span className="bg-primary px-3 py-1 rounded-full text-[11px] font-bold text-white uppercase tracking-wider shadow-lg shadow-primary/20">
                                        Save {property.discount}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                                    {property.title}
                                </h3>
                                <div className="flex items-center gap-1.5 text-text-secondary text-sm mb-6">
                                    <Location01Icon size={16} />
                                    {property.location}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                                        <p className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mb-1">Total Price</p>
                                        <p className="text-secondary font-bold text-sm tracking-tight">{property.price}</p>
                                    </div>
                                    <div className="bg-primary/10 rounded-2xl p-3 border border-primary/20">
                                        <p className="text-[10px] text-primary uppercase font-bold tracking-wider mb-1">Group Price</p>
                                        <p className="text-primary font-bold text-sm tracking-tight">{property.pricePerMember}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-bg-light flex items-center justify-center text-primary">
                                            <UserGroupIcon size={16} />
                                        </div>
                                        <p className="text-xs font-medium text-text-secondary">
                                            <span className="text-secondary font-bold">{property.membersJoined}/{property.totalMembers}</span> joined
                                        </p>
                                    </div>
                                    <Button className="w-fit! h-10 px-6 text-xs shadow-sm">
                                        Join Group
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PropertiesSection;
