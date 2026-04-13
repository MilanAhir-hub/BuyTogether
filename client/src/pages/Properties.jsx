import React, { useState } from 'react';
import { 
    Location01Icon, 
    SquareIcon, 
    UserGroupIcon, 
    FilterIcon, 
    Search01Icon 
} from "hugeicons-react";
import Button from "../components/ui/Button";

const Properties = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Residential', 'Plots', 'Flats', 'Commercial'];

    const mockProperties = [
        {
            id: 1,
            title: "Prestige Tranquil Heights",
            location: "Gachibowli, Hyderabad",
            price: "₹1.2 Cr - 1.8 Cr",
            pricePerMember: "₹95L",
            area: "1450 - 2200 sq.ft",
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
            area: "200 - 500 sq.yds",
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
            area: "3200 sq.ft",
            membersJoined: 2,
            totalMembers: 4,
            discount: "8%",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600",
            category: "Residential"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Page Header */}
            <div className="bg-bg-light border-b border-gray-100 py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-3">
                            Explore <span className="text-primary">Properties</span>
                        </h1>
                        <p className="text-text-secondary">
                            Find the perfect property and join a group to unlock massive savings.
                        </p>
                    </div>
                    
                    <div className="flex w-full md:w-auto items-center bg-white rounded-none border border-gray-200 px-6 py-3 shadow-sm focus-within:border-primary transition-all">
                        <Search01Icon size={20} className="text-text-secondary" />
                        <input 
                            type="text" 
                            placeholder="Search by city or property..." 
                            className="bg-transparent border-none outline-none ring-0 ml-3 text-sm w-full md:w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="max-w-7xl mx-auto px-6 mt-10">
                <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
                    <div className="flex items-center gap-2 bg-secondary text-white px-4 py-2.5 rounded-none text-sm font-medium mr-4">
                        <FilterIcon size={18} />
                        Filters
                    </div>
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2.5 rounded-none text-sm font-medium whitespace-nowrap transition-all ${
                                activeFilter === filter 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                                : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Property Grid */}
            <div className="max-w-7xl mx-auto px-6 mt-12 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {mockProperties.map((property) => (
                        <div key={property.id} className="group flex flex-col bg-white rounded-none overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={property.image} 
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-none text-[11px] font-bold text-secondary uppercase tracking-wider">
                                        {property.category}
                                    </span>
                                    <span className="bg-primary px-3 py-1 rounded-none text-[11px] font-bold text-white uppercase tracking-wider shadow-lg shadow-primary/20">
                                        Save {property.discount}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                                    {property.title}
                                </h3>
                                <div className="flex items-center gap-1.5 text-text-secondary text-sm mb-4">
                                    <Location01Icon size={16} />
                                    {property.location}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 rounded-none p-3 border border-gray-100">
                                        <p className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mb-1">Total Price</p>
                                        <p className="text-secondary font-bold text-sm tracking-tight">{property.price}</p>
                                    </div>
                                    <div className="bg-primary/5 rounded-none p-3 border border-primary/10">
                                        <p className="text-[10px] text-primary uppercase font-bold tracking-wider mb-1">Group Price</p>
                                        <p className="text-primary font-bold text-sm tracking-tight">{property.pricePerMember}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-none bg-bg-light flex items-center justify-center text-primary">
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
        </div>
    );
};

export default Properties;
