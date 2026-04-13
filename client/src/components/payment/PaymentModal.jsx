import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, CreditCard, Lock } from 'lucide-react';
import { createRazorpayOrder, verifyRazorpayPayment } from '../../services/paymentService';
import { useAuth } from '../../hooks/useAuth';

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const PaymentModal = ({ isOpen, onClose, item, type = "deal", onSuccess }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            loadRazorpayScript();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            setError('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }

        try {
            // 1. Create Order
            const orderData = await createRazorpayOrder(item.id, type);
            if (!orderData.success) {
                setError(orderData.message || 'Failed to create order');
                setLoading(false);
                return;
            }

            // 2. Open Razorpay Checkout
            const options = {
                key: orderData.key,
                amount: orderData.amount, // in paise
                currency: "INR",
                name: "TogetherBuy",
                description: `Commitment Fee for ${item.title}`,
                image: "https://cdn-icons-png.flaticon.com/512/3594/3594191.png", // Icon representing cart/buy
                order_id: orderData.orderId,
                handler: async function (response) {
                    try {
                        const verifyResult = await verifyRazorpayPayment({
                            id: item.id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        }, type);

                        if (verifyResult.success) {
                            onSuccess(verifyResult.data);
                        } else {
                            setError(verifyResult.message || 'Payment verification failed');
                        }
                    } catch (err) {
                        setError('Could not verify payment on server. Please contact support.');
                    } finally {
                        setLoading(false);
                    }
                },
                prefill: {
                    name: user?.firstName ? `${user.firstName} ${user.lastName}` : "User",
                    email: user?.email || "",
                },
                notes: {
                    reference_id: item.id
                },
                theme: {
                    color: "#10b981" // Emerald-500
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response) {
                setError(`Payment Failed: ${response.error.description}`);
                setLoading(false);
            });

            paymentObject.open();

        } catch (err) {
            console.error('Payment flow error:', err);
            setError(err.response?.data?.message || err.message || 'Something went wrong during checkout.');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={!loading ? onClose : undefined}
            />
            
            {/* Modal */}
            <div className="relative w-full max-w-md overflow-hidden bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-none shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-500/20 rounded-none">
                            <ShieldCheck size={24} className="text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-medium text-white tracking-wide">Join {type === 'property' ? 'Buyer' : 'Deal'} Group</h3>
                    </div>
                    {!loading && (
                        <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white rounded-none hover:bg-white/10 transition-colors">
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-none bg-emerald-500/10 mb-4 animate-pulse">
                            <Lock size={32} className="text-emerald-400" />
                        </div>
                        <h4 className="text-lg text-white mb-2 font-medium">Commitment Fee Required</h4>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            To maintain the high quality of our group deals and ensure all members are serious buyers, a fully refundable
                            <span className="text-emerald-400 font-semibold mx-1">₹20</span>
                            commitment fee is required to reserve your spot.
                        </p>
                    </div>

                    <div className="bg-black/50 border border-white/5 rounded-none p-4 mb-6 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-400">{type === 'property' ? 'Property' : 'Deal'}:</span>
                            <span className="text-white font-medium text-right line-clamp-1">{item.title}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-400">Commitment Fee:</span>
                            <span className="text-white font-medium text-right">₹20.00</span>
                        </div>
                        <div className="border-t border-white/10 pt-3 flex justify-between text-sm font-medium">
                            <span className="text-neutral-300">Total to Pay Today:</span>
                            <span className="text-emerald-400">₹20.00</span>
                        </div>
                    </div>

                     {error && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-none text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="relative w-full overflow-hidden py-4 rounded-none font-medium bg-linear-to-r from-emerald-500 to-emerald-400 text-black shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:from-emerald-400 hover:to-emerald-300 transition-all active:scale-[0.98] disabled:opacity-70 disabled:hover:from-emerald-500 disabled:hover:to-emerald-400 disabled:active:scale-100 group flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-none animate-spin"></div>
                                Processing...
                            </div>
                        ) : (
                            <>
                                <CreditCard size={18} className="transition-transform group-hover:scale-110" />
                                <span>Pay ₹20 & Join Securely</span>
                            </>
                        )}
                        
                        {/* Shimmer effect */}
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                    </button>

                    <p className="text-center text-xs text-neutral-500 mt-4">
                        Secured by <span className="font-medium text-neutral-400">Razorpay</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
