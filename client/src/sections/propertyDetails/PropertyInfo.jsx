import React from 'react';
import { Home, Bed, Maximize, HardHat, CalendarCheck } from 'lucide-react';

const PropertyInfo = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-['Inter']">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Side: Description */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">About this Property</h2>
            <div className="text-gray-600 leading-relaxed text-base space-y-4">
              <p>
                Skyline Residency is a premium residential project offering modern apartments with world-class amenities. Located in the heart of Gurgaon, it provides excellent connectivity and lifestyle facilities tailored for sophisticated urban living.
              </p>
              <p>
                The architecture seamlessly blends contemporary design with functional spaces, ensuring that every corner of your home is optimized for comfort and elegance. Enjoy breathtaking city views from your private balcony and experience a community that prioritizes safety, wellness, and convenience.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-none p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-24 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Key Specifications</h3>
            
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="bg-indigo-50 p-2.5 rounded-none mr-4 shrink-0 text-indigo-600">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Property Type</p>
                  <p className="text-base font-medium text-gray-900">Apartment</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-blue-50 p-2.5 rounded-none mr-4 shrink-0 text-blue-600">
                  <Bed className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Bedrooms</p>
                  <p className="text-base font-medium text-gray-900">3 BHK</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-emerald-50 p-2.5 rounded-none mr-4 shrink-0 text-emerald-600">
                  <Maximize className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Area</p>
                  <p className="text-base font-medium text-gray-900">1600 sq ft</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="bg-amber-50 p-2.5 rounded-none mr-4 shrink-0 text-amber-600">
                  <HardHat className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Builder</p>
                  <p className="text-base font-medium text-gray-900">Skyline Developers</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="bg-rose-50 p-2.5 rounded-none mr-4 shrink-0 text-rose-600">
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Possession</p>
                  <p className="text-base font-medium text-gray-900">2027</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PropertyInfo;
