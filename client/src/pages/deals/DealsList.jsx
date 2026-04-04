import React, { useEffect, useState } from 'react';
import { getAllDeals } from '../../services/dealService';
import { Link } from 'react-router-dom';
import { ShoppingBag, Users, Clock, ArrowRight } from 'lucide-react';

const DealsList = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await getAllDeals();
        if (res.success) {
          setDeals(res.data);
        }
      } catch (error) {
        console.error('Failed to load deals', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-5xl font-light tracking-tight mb-4">
              Active <span className="font-medium text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">Deals</span>
            </h1>
            <p className="text-neutral-400 text-lg font-light">Join forces with others to unlock massive wholesale discounts.</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-neutral-900 rounded-2xl h-96 border border-white/5"></div>
            ))}
          </div>
        ) : deals.length === 0 ? (
          <div className="text-center py-32 bg-neutral-900/30 rounded-3xl border border-white/5">
            <ShoppingBag size={48} className="mx-auto text-neutral-600 mb-6" />
            <h3 className="text-2xl font-light mb-2">No active deals right now</h3>
            <p className="text-neutral-500">Check back later or become a seller to post one.</p>
            <Link to="/deals/create" className="inline-block mt-8 text-emerald-400 hover:text-emerald-300 border border-emerald-400/30 px-6 py-2 rounded-full transition-colors">
              Create a Deal
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map(deal => {
              const discountPercent = Math.round((1 - deal.groupPrice / deal.originalPrice) * 100);

              return (
                <div key={deal.id} className="group flex flex-col bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(52,211,153,0.15)]">
                  <div className="h-48 bg-neutral-800 relative overflow-hidden">
                    {deal.imageUrl ? (
                      <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-neutral-800 to-neutral-950">
                        <ShoppingBag size={48} className="text-neutral-700" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      -{discountPercent}%
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-medium mb-2">{deal.title}</h2>
                    <p className="text-sm text-neutral-400 line-clamp-2 mb-6">{deal.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex items-end gap-3 mb-6">
                        <div className="text-3xl font-light text-emerald-400">${deal.groupPrice}</div>
                        <div className="text-neutral-500 line-through text-lg mb-1">${deal.originalPrice}</div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-medium text-neutral-400 mb-6 bg-black/40 rounded-xl p-3">
                        <div className="flex items-center gap-1.5">
                          <Users size={14} className="text-blue-400" />
                          <span>{deal.minBuyers} Required</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-orange-400" />
                          <span>{deal.expiryDurationHours}h Window</span>
                        </div>
                      </div>

                      <Link 
                        to={`/deals/${deal.id}`}
                        className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all group-hover:bg-white group-hover:text-black"
                      >
                        Join Deal <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DealsList;
