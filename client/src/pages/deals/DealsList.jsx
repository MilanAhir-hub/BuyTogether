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
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_34%,#fff7f2_100%)] text-secondary font-sans py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-5xl font-light tracking-tight mb-4 text-secondary">
              Active <span className="font-medium text-primary">Deals</span>
            </h1>
            <p className="text-slate-500 text-lg font-light">Join forces with others to unlock massive wholesale discounts.</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-slate-100 rounded-none h-96 border border-slate-200"></div>
            ))}
          </div>
        ) : deals.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-none border border-slate-200 shadow-sm">
            <ShoppingBag size={48} className="mx-auto text-slate-200 mb-6" />
            <h3 className="text-2xl font-light mb-2 text-secondary">No active deals right now</h3>
            <p className="text-slate-400">Check back later or become a seller to post one.</p>
            <Link to="/deals/create" className="inline-block mt-8 text-primary hover:text-primary-dark border border-primary/30 px-6 py-2 rounded-none transition-colors font-medium">
              Create a Deal
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map(deal => {
              const discountPercent = Math.round((1 - deal.groupPrice / deal.originalPrice) * 100);

              return (
                <div key={deal.id} className="group flex flex-col bg-white hover:bg-slate-50 border border-slate-200 rounded-none overflow-hidden transition-all duration-300 hover:shadow-xl shadow-sm">
                  <div className="h-48 bg-slate-100 relative overflow-hidden">
                    {deal.imageUrl ? (
                      <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-50">
                        <ShoppingBag size={48} className="text-slate-200" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-none shadow-lg">
                      -{discountPercent}%
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-medium mb-2 text-secondary">{deal.title}</h2>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-6">{deal.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex items-end gap-3 mb-6">
                        <div className="text-3xl font-light text-emerald-600">${deal.groupPrice}</div>
                        <div className="text-slate-400 line-through text-lg mb-1">${deal.originalPrice}</div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-6 bg-slate-50 rounded-none p-3 border border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <Users size={14} className="text-primary" />
                          <span>{deal.minBuyers} Required</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-orange-500" />
                          <span>{deal.expiryDurationHours}h Window</span>
                        </div>
                      </div>

                      <Link 
                        to={`/deals/${deal.id}`}
                        className="w-full py-3.5 bg-white hover:bg-primary border border-slate-200 hover:border-primary text-secondary hover:text-white font-bold rounded-none flex items-center justify-center gap-2 transition-all shadow-sm"
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
