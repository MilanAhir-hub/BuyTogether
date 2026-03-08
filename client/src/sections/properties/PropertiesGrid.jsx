import React from 'react';
import PropertyCard from './PropertyCard';

// Mock Data
const MOCK_PROPERTIES = [
  {
    id: 1,
    title: 'Skyline Residency',
    location: 'Gurgaon, Sector 45',
    price: '₹85 Lakhs',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    buyersJoined: 3,
    maxBuyers: 5
  },
  {
    id: 2,
    title: 'Lakeside Villas',
    location: 'Bangalore, Whitefield',
    price: '₹1.2 Cr',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    buyersJoined: 2,
    maxBuyers: 4
  },
  {
    id: 3,
    title: 'The Platinum Heights',
    location: 'Mumbai, Andheri West',
    price: '₹2.5 Cr',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    buyersJoined: 4,
    maxBuyers: 5
  },
  {
    id: 4,
    title: 'Green Earth Studios',
    location: 'Pune, Hinjewadi',
    price: '₹45 Lakhs',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    buyersJoined: 1,
    maxBuyers: 3
  },
  {
    id: 5,
    title: 'Royal Palm Penthouses',
    location: 'Delhi, Vasant Kunj',
    price: '₹3.8 Cr',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
    buyersJoined: 5,
    maxBuyers: 8
  },
  {
    id: 6,
    title: 'Oceanview Apartments',
    location: 'Chennai, OMR',
    price: '₹95 Lakhs',
    image: 'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?auto=format&fit=crop&q=80&w=800',
    buyersJoined: 2,
    maxBuyers: 6
  }
];

const PropertiesGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Desktop → 3 columns, Tablet → 2 columns, Mobile → 1 column */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {MOCK_PROPERTIES.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesGrid;
