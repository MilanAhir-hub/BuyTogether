import React from 'react';
import { 
    Location01Icon, 
    UserGroupIcon, 
    Link01Icon,
} from "hugeicons-react";
import Button from "../ui/Button";
import Section from '../ui/Section';
import Card from '../ui/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { propertyService } from '../../services/propertyService';

const PropertiesSection = () => {
    const navigate = useNavigate();
    
    // Fetch real properties
    const { data: realProperties, isLoading, isError } = useQuery({
        queryKey: ['properties'],
        queryFn: propertyService.getAll,
    });

    // Mock properties to show if backend is empty or loading
    const mockProperties = [
        {
            id: '1',
            title: "Prestige Tranquil Heights",
            location: "Gachibowli, Hyderabad",
            price: 12000000,
            maxPeopleAllowed: 10,
            discountTiers: [{ discountPercentage: 12 }],
            imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600"
        },
        {
            id: '2',
            title: "Adani Green View Plots",
            location: "Sector 63, Gurgaon",
            price: 25000000,
            maxPeopleAllowed: 5,
            discountTiers: [{ discountPercentage: 15 }],
            imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600"
        },
        {
            id: '3',
            title: "Lodha World One",
            location: "Worli, Mumbai",
            price: 55000000,
            maxPeopleAllowed: 4,
            discountTiers: [{ discountPercentage: 8 }],
            imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600"
        }
    ];

    // Use real properties if they exist and no error, otherwise use mock data
    const properties = (!isError && realProperties && realProperties.length > 0) ? realProperties : mockProperties;
    
    // Limit to latest 6 properties for home page
    const latestProperties = properties.slice(0, 6);

    const calculateDiscountInfo = (property) => {
        if (!property.discountTiers || property.discountTiers.length === 0) {
            return { discount: "0%", groupPrice: property.price };
        }
        
        // Use the highest discount tier for display
        const maxTier = [...property.discountTiers].sort((a, b) => b.discountPercentage - a.discountPercentage)[0];
        const discountPercentage = maxTier.discountPercentage;
        const discountAmount = (property.price * discountPercentage) / 100;
        const groupPrice = property.price - discountAmount;

        return {
            discount: `${discountPercentage}%`,
            groupPrice: groupPrice
        };
    };

    if (isLoading && (!realProperties || realProperties.length === 0)) {
        return (
            <Section 
                id="properties"
                light
                title={<>Latest Group <span className="text-primary italic">Deals</span></>}
                subtitle="Check out high-potential properties with active group targets. Join now to lock in exclusive bulk pricing."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="h-[500px] bg-slate-100 animate-pulse rounded-[32px]" />
                    ))}
                </div>
            </Section>
        );
    }

    return (
        <Section 
            id="properties"
            light
            title={<>Latest Group <span className="text-primary italic">Deals</span></>}
            subtitle="Check out high-potential properties with active group targets. Join now to lock in exclusive bulk pricing."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestProperties.map((property) => {
                    const { discount, groupPrice } = calculateDiscountInfo(property);
                    return (
                        <Card key={property.id} className="group flex flex-col overflow-hidden hover:border-primary/20 transition-all duration-500 cursor-pointer" onClick={() => navigate(`/properties/${property.id}`)}>
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={property.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600"} 
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-secondary uppercase tracking-wider">
                                        Residential
                                    </span>
                                    {discount !== "0%" && (
                                        <span className="bg-primary px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
                                            Save {discount}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {property.title}
                                </h3>
                                <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-6 line-clamp-1">
                                    <Location01Icon size={16} />
                                    {property.location}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total Price</p>
                                        <p className="text-secondary font-bold text-sm tracking-tight">{formatCurrency(property.price)}</p>
                                    </div>
                                    <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
                                        <p className="text-[10px] text-primary uppercase font-bold tracking-wider mb-1">Group Price</p>
                                        <p className="text-primary font-bold text-sm tracking-tight">{formatCurrency(groupPrice)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-primary">
                                            <UserGroupIcon size={16} />
                                        </div>
                                        <p className="text-xs font-semibold text-slate-600">
                                            <span className="text-primary">1/{property.maxPeopleAllowed}</span> joined
                                        </p>
                                    </div>
                                    <Button className="w-fit! h-10 px-6 text-xs transition-transform hover:scale-105" onClick={() => navigate(`/properties/${property.id}`)}>
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
            
            <div className="mt-16 text-center">
                <Link to="/properties" onClick={(e) => e.stopPropagation()}>
                    <Button variant="outline" className="w-fit! px-10 py-4 mx-auto group">
                        <span>Explore All Properties</span>
                        <Link01Icon size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
        </Section>
    );
};

const formatCurrency = (value) => {
    if (typeof value === 'string') return value;
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value ?? 0);
};

export default PropertiesSection;
