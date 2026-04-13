import { MapPin } from 'lucide-react';

const FeaturedPropertiesSection = () => {
    const properties = [
        {
            id: 1,
            name: "Skyline Residency",
            location: "Gurgaon",
            price: "₹85 Lakhs onwards",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 2,
            name: "The Prestige Enclave",
            location: "Bangalore",
            price: "₹1.2 Crores onwards",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 3,
            name: "Lodha Altamount",
            location: "Mumbai",
            price: "₹3.5 Crores onwards",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    return (
        <section id="properties" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Featured Properties
                        </h2>
                        <p className="text-lg text-slate-600">
                            Discover premium projects open for group buying.
                        </p>
                    </div>
                    <a href="#" className="hidden md:block text-blue-600 font-medium hover:text-blue-700 transition-colors">
                        View All Properties &rarr;
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <div 
                            key={property.id} 
                            className="bg-white rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={property.image} 
                                    alt={property.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur block px-3 py-1 rounded-none text-xs font-semibold text-slate-900">
                                    Pre-Launch
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {property.name}
                                </h3>
                                <div className="flex items-center text-slate-500 mb-4">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span className="text-sm">{property.location}</span>
                                </div>
                                <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Starting Price</p>
                                        <p className="text-lg font-bold text-slate-900">{property.price}</p>
                                    </div>
                                    <button className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-semibold rounded-none transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-10 text-center md:hidden">
                     <a href="#" className="inline-block text-blue-600 font-medium hover:text-blue-700 transition-colors">
                        View All Properties &rarr;
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPropertiesSection;
