import React from 'react';
import { Waves, Dumbbell, ShieldCheck, Gamepad2, Car, TreePine, Zap, Club } from 'lucide-react';

const AmenitiesSection = () => {
  const amenities = [
    { icon: <Waves className="h-6 w-6" />, label: 'Swimming Pool', color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { icon: <Dumbbell className="h-6 w-6" />, label: 'Gym', color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: <ShieldCheck className="h-6 w-6" />, label: '24/7 Security', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { icon: <Gamepad2 className="h-6 w-6" />, label: 'Children Park', color: 'text-pink-600', bg: 'bg-pink-50' },
    { icon: <Car className="h-6 w-6" />, label: 'Parking', color: 'text-slate-600', bg: 'bg-slate-50' },
    { icon: <Club className="h-6 w-6" />, label: 'Clubhouse', color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: <Zap className="h-6 w-6" />, label: 'Power Backup', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: <TreePine className="h-6 w-6" />, label: 'Garden', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-['Inter']">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Amenities</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {amenities.map((amenity, index) => (
          <div 
            key={index} 
            className="flex items-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className={`p-3 rounded-xl mr-4 ${amenity.bg} ${amenity.color} group-hover:scale-110 transition-transform duration-300`}>
              {amenity.icon}
            </div>
            <span className="font-medium text-gray-700 text-sm sm:text-base">{amenity.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesSection;
