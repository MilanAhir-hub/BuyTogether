import React from 'react';
import { MapPin, Star } from 'lucide-react';

const PropertyHeader = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 font-['Inter']">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        
        {/* Title and Location */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Skyline Residency
            </h1>
            <div className="hidden sm:flex items-center bg-green-50 px-2.5 py-1 rounded-xl border border-green-100">
              <Star className="h-3.5 w-3.5 text-green-600 fill-current mr-1" />
              <span className="text-sm font-semibold text-green-700">4.8</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 text-base">
            <MapPin className="h-5 w-5 text-gray-400 mr-1.5" />
            Sector 48, Gurgaon
          </div>
        </div>

        {/* Pricing */}
        <div className="flex flex-col md:items-end mt-2 md:mt-0">
          <p className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">Starting Price</p>
          <div className="flex items-baseline text-sky-600">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight">₹85 Lakhs</span>
            <span className="ml-2 text-gray-500 text-sm font-medium">onwards</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PropertyHeader;
