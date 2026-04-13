import { MapPin, Users, ArrowRight } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "Skyline Residency",
    city: "Gurgaon",
    price: "₹85 Lakhs onwards",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400",
    buyersJoined: 3,
    totalNeeded: 5,
  },
  {
    id: 2,
    name: "Oasis Crest",
    city: "Bangalore",
    price: "₹1.2 Crores onwards",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400",
    buyersJoined: 2,
    totalNeeded: 4,
  },
  {
    id: 3,
    name: "The Park Avenue",
    city: "Mumbai",
    price: "₹2.5 Crores onwards",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400",
    buyersJoined: 7,
    totalNeeded: 10,
  },
  {
    id: 4,
    name: "Emerald Heights",
    city: "Pune",
    price: "₹65 Lakhs onwards",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=400",
    buyersJoined: 1,
    totalNeeded: 3,
  }
];

export default function FeaturedProperties() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Properties</h2>
        <a href="#" className="hidden sm:inline-flex items-center text-blue-600 font-medium hover:text-blue-700 hover:underline transition-all">
          View all <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {properties.map((property) => {
          const progressPercentage = (property.buyersJoined / property.totalNeeded) * 100;
          return (
            <div key={property.id} className="bg-white rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
              
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-none text-xs font-bold text-green-600 shadow-sm">
                  Available
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {property.name}
                </h3>
                <div className="flex items-center text-gray-500 mb-4 text-sm">
                  <MapPin className="h-4 w-4 mr-1 shrink-0" />
                  <span className="truncate">{property.city}</span>
                </div>

                <div className="text-xl font-extrabold text-gray-900 mb-4">
                  {property.price}
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-600 mb-2">
                    <span className="flex items-center"><Users className="h-3.5 w-3.5 mr-1 text-blue-500"/> Buyers Joined</span>
                    <span>{property.buyersJoined} / {property.totalNeeded}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-none h-2 mb-5 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-2 rounded-none transition-all duration-1000 ease-in-out" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-2.5 px-3 border border-gray-200 rounded-none text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all text-center">
                      View Details
                    </button>
                    <button className="py-2.5 px-3 bg-blue-600 text-white rounded-none text-sm font-semibold hover:bg-blue-700 hover:shadow-md transition-all text-center">
                      Join Group
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-center sm:hidden">
        <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-all">
          View all featured properties <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
