import React, { useState } from 'react';

const ImageGallery = () => {
  const images = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800'
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-['Inter']">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Main large image */}
        <div className="md:col-span-3 h-[300px] md:h-[500px] rounded-none overflow-hidden shadow-sm relative group">
          <img
            src={images[activeImageIndex]}
            alt="Property Main View"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900/40 via-transparent to-transparent opacity-60"></div>
          
          {/* Mobile indicator dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 md:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-2 h-2 rounded-none transition-all duration-300 ${
                  activeImageIndex === index ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop thumbnails side panel */}
        <div className="hidden md:flex flex-col gap-4 h-[500px]">
          {images.slice(1, 5).map((img, index) => {
            const actualIndex = index + 1;
            return (
              <button
                key={actualIndex}
                onClick={() => setActiveImageIndex(actualIndex)}
                className={`relative flex-1 rounded-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 group ${
                  activeImageIndex === actualIndex 
                    ? 'ring-2 ring-indigo-500 ring-offset-2' 
                    : 'hover:opacity-90'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${actualIndex}`}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors ${
                  activeImageIndex === actualIndex ? 'bg-transparent group-hover:bg-transparent' : ''
                }`}></div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
