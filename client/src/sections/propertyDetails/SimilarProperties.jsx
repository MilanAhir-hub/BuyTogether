import React from 'react';
import { MapPin, Users, ArrowRight } from 'lucide-react';

const SimilarProperties = () => {
  // Mock Data for similar properties
  const SIMILAR_PROPERTIES = [
    {
      id: 101,
      title: 'The Platinum Heights',
      location: 'Gurgaon, Sector 50',
      price: '₹95 Lakhs',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      buyersJoined: 4,
      maxBuyers: 5
    },
    {
      id: 102,
      title: 'Green Earth Studios',
      location: 'Gurgaon, Sector 45',
      price: '₹75 Lakhs',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      buyersJoined: 1,
      maxBuyers: 3
    },
    {
      id: 103,
      title: 'Royal Palm Penthouses',
      location: 'Gurgaon, DLF Phase 1',
      price: '₹2.8 Cr',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
      buyersJoined: 5,
      maxBuyers: 8
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-['Inter']">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Similar Properties in Gurgaon</h2>
        <a href="#" className="hidden sm:flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          View all properties
          <ArrowRight className="h-4 w-4 ml-1" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SIMILAR_PROPERTIES.map((property) => {
          const progressPercentage = Math.min((property.buyersJoined / property.maxBuyers) * 100, 100);

          return (
            <div key={property.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full font-['Inter']">
              
              {/* Top: Property Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="text-white">
                    <span className="text-xs font-medium text-white/80 uppercase tracking-wider block mb-1">Starting from</span>
                    <span className="text-xl font-bold">{property.price}</span>
                  </div>
                </div>
              </div>

              {/* Middle: Details */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-gray-400" />
                  <span className="truncate">{property.location}</span>
                </div>

                {/* Group Buying Info */}
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-sm font-medium text-gray-700">
                      <Users className="h-4 w-4 mr-1.5 text-indigo-500" />
                      <span>Buyers Joined</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {property.buyersJoined} <span className="text-gray-400 font-normal">/ {property.maxBuyers}</span>
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-1 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 text-right mt-1.5">
                    {property.maxBuyers - property.buyersJoined} spots remaining
                  </p>
                </div>
              </div>

              {/* Bottom: Buttons */}
              <div className="px-5 pb-5 pt-0 mt-auto flex gap-3">
                <button className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all text-center">
                  View Details
                </button>
              </div>

            </div>
          );
        })}
      </div>
      
       <div className="mt-8 text-center sm:hidden">
        <button className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors">
          View all properties
        </button>
      </div>
      
    </div>
  );
};

export default SimilarProperties;
