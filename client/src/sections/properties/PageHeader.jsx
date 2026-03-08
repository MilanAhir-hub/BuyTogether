import React from 'react';

const PageHeader = () => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-stone-50 to-white font-['Inter']">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Explore Available Properties
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
          Discover properties you can buy together with other buyers and unlock exclusive discounts. Join a group and step into your dream home sooner.
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
