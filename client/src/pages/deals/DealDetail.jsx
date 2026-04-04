import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDealById } from '../../services/dealService';
import { joinDealGroup } from '../../services/dealGroupService';
import { useSignalR } from '../../hooks/useSignalR';
import { ShoppingBag, Users, Clock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [message, setMessage] = useState(null);
  
  // Real-time group state hooked to this deal
  const { groupData, groupActivated, groupExpired } = useSignalR(id);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await getDealById(id);
        if (res.success) {
          setDeal(res.data);
        }
      } catch (err) {
        console.error('Failed to load deal', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  const handleJoin = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setJoining(true);
    setMessage(null);
    try {
      const res = await joinDealGroup(id);
      if (res.success) {
        setMessage({ type: 'success', text: 'Successfully joined the group! Redirecting to your groups...' });
        setTimeout(() => navigate('/my-deals'), 2000);
      } else {
        setMessage({ type: 'error', text: res.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || err.message || 'Failed to join group.' });
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white"><div className="animate-spin w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full"></div></div>;
  }

  if (!deal) {
    return <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white"><h2 className="text-2xl mb-4">Deal Not Found</h2><button onClick={() => navigate('/deals')} className="text-emerald-400 hover:underline">Back to Deals</button></div>;
  }

  const discountPercent = Math.round((1 - deal.groupPrice / deal.originalPrice) * 100);
  
  // Combine real-time data or fallback to defaults
  const currentGroupCount = groupData?.newCount || 0;
  const isGroupActive = groupActivated || groupData?.status === 'active';
  const progressPercent = Math.min((currentGroupCount / deal.minBuyers) * 100, 100);

  return (
    <div className="min-h-screen bg-black text-white font-sans pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <button onClick={() => navigate('/deals')} className="flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to deals
        </button>

        {message && (
          <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 backdrop-blur-sm ${message.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Image */}
          <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 aspect-square relative flex items-center justify-center">
            {deal.imageUrl ? (
              <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover" />
            ) : (
              <ShoppingBag size={80} className="text-neutral-700" />
            )}
            <div className="absolute top-6 right-6 bg-red-500 text-white text-lg font-bold px-4 py-2 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.4)]">
              {discountPercent}% OFF
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-medium mb-4 leading-tight">{deal.title}</h1>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">{deal.description}</p>
            
            <div className="bg-neutral-900/50 rounded-2xl p-6 border border-white/5 mb-8">
              <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-6">
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Group Deal Price</div>
                  <div className="text-5xl font-light text-emerald-400">${deal.groupPrice}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neutral-400 mb-1">Original Retail</div>
                  <div className="text-2xl font-light text-neutral-500 line-through">${deal.originalPrice}</div>
                </div>
              </div>

              {/* Real-time Status Area */}
              {groupExpired ? (
                <div className="text-red-400 bg-red-500/10 rounded-xl p-4 flex items-center gap-2 border border-red-500/20">
                  <AlertCircle size={20} /> The current grouping window expired. Join to start a new group!
                </div>
              ) : isGroupActive ? (
                <div className="text-emerald-400 bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                  <div className="flex items-center gap-2 font-medium mb-2"><CheckCircle size={20} /> GROUP IS ACTIVE!</div>
                  <p className="text-sm text-emerald-400/80">The minimum buyer threshold has been met. Deals lock at checkout!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-end text-sm">
                    <div className="font-medium">
                      <span className="text-white text-lg">{currentGroupCount}</span> 
                      <span className="text-neutral-400"> / {deal.minBuyers} buyers joined</span>
                    </div>
                    {deal.maxBuyers && <div className="text-neutral-500">Cap: {deal.maxBuyers}</div>}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden relative">
                    <div 
                      className="bg-linear-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(52,211,153,0.5)]" 
                      style={{ width: `${progressPercent}%` }}
                    />
                    {/* Live pulse effect */}
                    {currentGroupCount > 0 && (
                       <div className="absolute top-0 bottom-0 right-0 w-6 bg-white/20 blur-[2px] animate-pulse" style={{ right: `calc(100% - ${progressPercent}%)` }}></div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-orange-400 font-medium">
                    <Clock size={14} /> Current group expires in {deal.expiryDurationHours}h
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleJoin}
              disabled={joining || deal.status === 'expired'}
              className="w-full py-4.5 bg-linear-to-r from-emerald-500 to-emerald-400 text-black font-semibold text-lg rounded-xl hover:from-emerald-400 hover:to-emerald-300 transition-all shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:shadow-none flex justify-center items-center"
            >
              {joining ? <div className="animate-spin w-6 h-6 border-2 border-black border-t-transparent rounded-full" /> : 'Join Deal Group'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetail;
