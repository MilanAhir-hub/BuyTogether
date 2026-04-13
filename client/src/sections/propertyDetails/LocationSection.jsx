import React from 'react';
import { MapPin, Train, BookOpen, HeartPulse, ShoppingBag } from 'lucide-react';

const LocationSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-['Inter']">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Location & Neighborhood</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Placeholder for Map Image/Component */}
        <div className="rounded-none overflow-hidden h-[350px] lg:h-[450px] shadow-sm relative group border border-gray-100">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
            alt="Map Location Placeholder"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
          
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-none shadow-lg border border-white/20 flex flex-col items-center">
            <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-none flex items-center justify-center mb-1 shadow-inner relative">
              <MapPin className="h-5 w-5 absolute z-10" />
              <div className="absolute inset-0 bg-indigo-400 rounded-none animate-ping opacity-20"></div>
            </div>
            <p className="text-xs font-bold text-gray-800">Skyline Residency</p>
          </div>
        </div>

        {/* Address and Nearby Places */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600 flex items-start text-base">
              <MapPin className="h-5 w-5 text-gray-400 mr-2 shrink-0 mt-0.5" />
              Plot No. 45, Sector 48, Golf Course Extension Road, Gurgaon, Haryana 122018
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Nearby Landmarks</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between p-3 rounded-none hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                <div className="flex items-center">
                  <div className="bg-orange-50 p-2 rounded-none text-orange-600 mr-3">
                    <Train className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-800">Sector 55-56 Metro Station</span>
                </div>
                <span className="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">2.0 km</span>
              </li>
              
              <li className="flex items-center justify-between p-3 rounded-none hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                <div className="flex items-center">
                  <div className="bg-blue-50 p-2 rounded-none text-blue-600 mr-3">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-800">Delhi Public School</span>
                </div>
                <span className="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">1.0 km</span>
              </li>
              
              <li className="flex items-center justify-between p-3 rounded-none hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                <div className="flex items-center">
                  <div className="bg-red-50 p-2 rounded-none text-red-600 mr-3">
                    <HeartPulse className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-800">Artemis Hospital</span>
                </div>
                <span className="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">3.0 km</span>
              </li>

              <li className="flex items-center justify-between p-3 rounded-none hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                <div className="flex items-center">
                  <div className="bg-purple-50 p-2 rounded-none text-purple-600 mr-3">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-800">M3M Urbana Mall</span>
                </div>
                <span className="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">1.5 km</span>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LocationSection;
