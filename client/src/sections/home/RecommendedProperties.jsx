import { MapPin, Building, ArrowRight } from "lucide-react";

const recommendations = [
  {
    id: 1,
    name: "Lakeview Apartments",
    city: "Powai, Mumbai",
    price: "₹1.8 Crores",
    description: "Premium 3 BHK apartments with lake views and modern amenities.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Greenwood Villas",
    city: "Whitefield, Bangalore",
    price: "₹3.2 Crores",
    description: "Luxury villas in a gated community with private gardens.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Cyber City Towers",
    city: "DLF Phase 2, Gurgaon",
    price: "₹2.1 Crores",
    description: "High-rise apartments perfect for tech professionals.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400",
  }
];

export default function RecommendedProperties() {
  return (
    <section className="bg-gray-50 py-12 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Recommended For You</h2>
          <p className="text-gray-600 font-medium">Based on your preferences and browsing activity.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendations.map((property) => (
            <div key={property.id} className="bg-white rounded-none overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group flex flex-col sm:flex-row lg:flex-col xl:flex-row h-full">
              
              {/* Image Container */}
              <div className="relative w-full sm:w-2/5 lg:w-full xl:w-2/5 aspect-4/3 sm:aspect-auto lg:aspect-4/3 xl:aspect-auto overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details Container */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-1 text-sm font-semibold text-blue-600 flex items-center">
                  <Building className="h-3.5 w-3.5 mr-1" />
                  Match Score: 95%
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {property.name}
                </h3>
                <div className="flex items-center text-gray-500 mb-3 text-sm">
                  <MapPin className="h-3.5 w-3.5 mr-1 shrink-0" />
                  <span className="truncate">{property.city}</span>
                </div>

                <div className="text-lg font-extrabold text-gray-900 mb-2">
                  {property.price}
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {property.description}
                </p>

                <div className="mt-auto flex gap-2">
                  <button className="flex-1 py-2 px-3 bg-blue-50 text-blue-700 rounded-none text-sm font-semibold hover:bg-blue-100 transition-all text-center">
                    Join Group
                  </button>
                  <button className="flex-none p-2 border border-gray-200 rounded-none text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
