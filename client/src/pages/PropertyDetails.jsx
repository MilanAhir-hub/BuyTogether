import React, { useEffect } from 'react';

// Require all sections
import PropertyNavbar from '../sections/propertyDetails/PropertyNavbar';
import PropertyHeader from '../sections/propertyDetails/PropertyHeader';
import ImageGallery from '../sections/propertyDetails/ImageGallery';
import PropertyInfo from '../sections/propertyDetails/PropertyInfo';
import AmenitiesSection from '../sections/propertyDetails/AmenitiesSection';
import GroupBuyingSection from '../sections/propertyDetails/GroupBuyingSection';
import LocationSection from '../sections/propertyDetails/LocationSection';
import SimilarProperties from '../sections/propertyDetails/SimilarProperties';

const PropertyDetails = () => {
  // Ensure the page scrolls to top on load since it's a new page view
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter'] flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Top Navigation */}
      <PropertyNavbar />

      {/* Main Content Areas */}
      <main className="flex-grow flex flex-col bg-white pb-10">
        
        {/* Title and High-Level Details Wrapper */}
        <div className="bg-gradient-to-b from-stone-50/50 to-white pt-4 pb-2 border-b border-gray-100/50">
          <PropertyHeader />
        </div>

        {/* Gallery */}
        <div className="mt-2 outline-none" role="region" aria-label="Property Image Gallery">
           <ImageGallery />
        </div>

        {/* Core Layout Container with subtle divider */}
        <div className="flex-grow">
          {/* Main Info */}
          <PropertyInfo />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <hr className="border-gray-100" />
          </div>
          
          {/* Amenities */}
          <AmenitiesSection />
          
          {/* Prominent Call to Action Area */}
          <div className="bg-stone-50 border-y border-gray-100">
            <GroupBuyingSection />
          </div>

          {/* Location Wrapper */}
          <LocationSection />
          
        </div>

      </main>

      {/* Footer-Like Content Array */}
      <div className="bg-stone-50 border-t border-gray-200">
        <SimilarProperties />
      </div>

    </div>
  );
};

export default PropertyDetails;
