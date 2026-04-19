import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationSection = () => {
  const pages = [1, 2, 3, 4];
  const currentPage = 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center font-['Inter']">
      <nav className="inline-flex items-center space-x-2 bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-100">
        
        {/* Previous Button */}
        <button
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-gray-200"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1 sm:space-x-2 px-2">
          {pages.map((page) => (
            <button
              key={page}
              className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentPage === page
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-200 ring-2 ring-sky-600 ring-offset-2'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent hover:border-gray-200'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 border border-transparent hover:border-gray-200">
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </button>
        
      </nav>
    </div>
  );
};

export default PaginationSection;
