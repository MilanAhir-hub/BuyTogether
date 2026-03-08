import React, { useEffect } from 'react';

// Import all sections sequentially
import PropertiesNavbar from '../sections/properties/PropertiesNavbar';
import PageHeader from '../sections/properties/PageHeader';
import FiltersSection from '../sections/properties/FiltersSection';
import PropertiesGrid from '../sections/properties/PropertiesGrid';
import PaginationSection from '../sections/properties/PaginationSection';

const Properties = () => {
  // Ensure the page scrolls to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 font-['Inter'] flex flex-col">
      {/* Navigation */}
      <PropertiesNavbar />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        {/* Header Section with Title and Subtitle */}
        <PageHeader />

        {/* Filters and Search Bar */}
        <div className="-mt-16 relative z-20">
          <FiltersSection />
        </div>

        {/* Property Cards Grid */}
        <div className="flex-grow pt-4">
          <PropertiesGrid />
        </div>

        {/* Pagination */}
        <PaginationSection />
      </main>
      
      {/* Optional: Simple footer placeholder if needed, or leave to layout wrapper */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} TogetherBuying. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Properties;
