import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDealById } from '../../services/dealService';
import PaymentModal from '../../components/payment/PaymentModal';
import { useSignalR } from '../../hooks/useSignalR';
import { ShoppingBag, Users, Clock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
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

  const handleJoinClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (groupData) => {
    setShowPaymentModal(false);
    setMessage({ type: 'success', text: 'Payment confirmed! Successfully joined the group.' });
    setTimeout(() => navigate('/my-deals'), 2000);
  };

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-secondary"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-none"></div></div>;
  }

  if (!deal) {
    return <div className="min-h-screen bg-white flex flex-col items-center justify-center text-secondary"><h2 className="text-2xl mb-4">Deal Not Found</h2><button onClick={() => navigate('/deals')} className="text-primary hover:underline">Back to Deals</button></div>;
  }

  const discountPercent = Math.round((1 - deal.groupPrice / deal.originalPrice) * 100);
  
  // Combine real-time data or fallback to defaults
  const currentGroupCount = groupData?.newCount || 0;
  const isGroupActive = groupActivated || groupData?.status === 'active';
  const progressPercent = Math.min((currentGroupCount / deal.minBuyers) * 100, 100);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_34%,#fff7f2_100%)] text-secondary font-sans pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <button onClick={() => navigate('/deals')} className="flex items-center gap-2 text-slate-500 hover:text-secondary mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to deals
        </button>

        {message && (
          <div className={`p-4 rounded-none mb-8 flex items-center gap-3 backdrop-blur-sm ${message.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Image */}
          <div className="rounded-none overflow-hidden bg-white border border-slate-200 aspect-square relative flex items-center justify-center shadow-sm">
            {deal.imageUrl ? (
              <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover" />
            ) : (
              <ShoppingBag size={80} className="text-slate-200" />
            )}
            <div className="absolute top-6 right-6 bg-red-500 text-white text-lg font-bold px-4 py-2 rounded-none shadow-lg">
              {discountPercent}% OFF
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-medium mb-4 leading-tight text-secondary">{deal.title}</h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">{deal.description}</p>
            
            <div className="bg-white rounded-none p-6 border border-slate-100 mb-8 shadow-sm">
              <div className="flex justify-between items-end mb-6 border-b border-slate-100 pb-6">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Group Deal Price</div>
                  <div className="text-5xl font-light text-emerald-600">${deal.groupPrice}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500 mb-1">Original Retail</div>
                  <div className="text-2xl font-light text-slate-400 line-through">${deal.originalPrice}</div>
                </div>
              </div>

              {/* Real-time Status Area */}
              {groupExpired ? (
                <div className="text-red-400 bg-red-500/10 rounded-none p-4 flex items-center gap-2 border border-red-500/20">
                  <AlertCircle size={20} /> The current grouping window expired. Join to start a new group!
                </div>
              ) : isGroupActive ? (
                <div className="text-emerald-400 bg-emerald-500/10 rounded-none p-4 border border-emerald-500/20">
                  <div className="flex items-center gap-2 font-medium mb-2"><CheckCircle size={20} /> GROUP IS ACTIVE!</div>
                  <p className="text-sm text-emerald-400/80">The minimum buyer threshold has been met. Deals lock at checkout!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-end text-sm">
                    <div className="font-medium text-secondary">
                      <span className="text-secondary text-lg">{currentGroupCount}</span> 
                      <span className="text-slate-500"> / {deal.minBuyers} buyers joined</span>
                    </div>
                    {deal.maxBuyers && <div className="text-slate-400">Cap: {deal.maxBuyers}</div>}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-none h-3 overflow-hidden relative">
                    <div 
                      className="bg-linear-to-r from-blue-500 to-emerald-400 h-full rounded-none transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(52,211,153,0.3)]" 
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
              onClick={handleJoinClick}
              disabled={deal.status === 'expired'}
              className="w-full py-4.5 bg-primary text-white font-semibold text-lg rounded-none hover:bg-primary-dark transition-all shadow-[0_0_30px_-5px_rgba(215,59,11,0.2)] disabled:opacity-50 disabled:shadow-none flex justify-center items-center"
            >
              Join Deal Group
            </button>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
        deal={deal} 
        onSuccess={handlePaymentSuccess} 
      />
    </div>
  );
};

export default DealDetail;
