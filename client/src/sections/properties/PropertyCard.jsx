import React from 'react';
import { MapPin, Users, ArrowRight } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const {
    id,
    title,
    location,
    price,
    image,
    buyersJoined,
    maxBuyers
  } = property;

  const progressPercentage = Math.min((buyersJoined / maxBuyers) * 100, 100);

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full font-['Inter']">
      
      {/* Top: Property Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-semibold text-sky-700 shadow-sm border border-white/20">
          Featured
        </div>
        <img
          src={image || `https://source.unsplash.com/800x600/?house,apartment&sig=${id}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          required
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="text-white">
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider block mb-1">Starting from</span>
            <span className="text-xl font-bold">{price}</span>
          </div>
        </div>
      </div>

      {/* Middle: Details */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-1 mb-2">
          {title}
        </h3>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1 shrink-0 text-gray-400" />
          <span className="truncate">{location}</span>
        </div>

        {/* Group Buying Info */}
        <div className="mt-auto pt-4 border-t border-gray-50">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center text-sm font-medium text-gray-700">
              <Users className="h-4 w-4 mr-1.5 text-sky-500" />
              <span>Buyers Joined</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {buyersJoined} <span className="text-gray-400 font-normal">/ {maxBuyers}</span>
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-xl h-2 mb-1 overflow-hidden">
            <div
              className="bg-sky-600 h-2 rounded-xl transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 text-right mt-1.5">
            {maxBuyers - buyersJoined} spots remaining
          </p>
        </div>
      </div>

      {/* Bottom: Buttons */}
      <div className="px-5 pb-5 pt-0 mt-auto flex gap-3">
        <button className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all text-center">
          View Details
        </button>
        <button className="flex-[1.2] px-4 py-2.5 bg-sky-600 rounded-xl text-sm font-semibold text-white hover:bg-sky-700 shadow-sm hover:shadow transition-all flex items-center justify-center">
          Join Group
          <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};

export default PropertyCard;
