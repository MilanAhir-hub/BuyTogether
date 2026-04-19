import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/apiClient';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Building, AlertCircle, ArrowRight, Search } from 'lucide-react';
import Button from '../../components/ui/Button';

// Fetch deals to show summary
const fetchMyDeals = async () => {
    const response = await apiClient.get('/deals');
    // DealsController returns { success: true, data: [...] }
    return response.data.data || [];
};

const BuyerHome = () => {
    const { data: deals, isLoading, isError } = useQuery({
        queryKey: ['my-deals-summary'],
        queryFn: fetchMyDeals,
    });

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="text-slate-500">Loading your dashboard...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl bg-red-50 p-6 border border-red-100 flex items-start gap-4">
                <AlertCircle className="text-red-500 mt-1" />
                <div>
                    <h3 className="font-bold text-red-800">Error loading dashboard</h3>
                    <p className="text-red-600 mt-1">We couldn't fetch your exact details. Please try refreshing.</p>
                </div>
            </div>
        );
    }

    const activeDeals = deals?.filter(d => ['Active', 'GroupForming', 'Open'].includes(d.status)) || [];
    const totalInvested = activeDeals.reduce((sum, deal) => sum + (deal.targetPrice || 0), 0);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back!</h1>
                <p className="mt-2 text-slate-500">Here's what's happening with your group property deals.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm shadow-slate-200/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-sky-600 rounded-xl flex items-center justify-center">
                            <Building size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Deals</p>
                            <h3 className="text-2xl font-bold text-slate-800">{deals?.length || 0}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm shadow-slate-200/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Target Value</p>
                            <h3 className="text-2xl font-bold text-slate-800">₹{(totalInvested / 100000).toFixed(1)}L</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col justify-center">
                    <Link to="/buyer/properties" className="group flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Marketplace</p>
                            <p className="text-sm font-bold text-primary mt-1">Browse new deals</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <ArrowRight size={18} />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Activity / Next Steps */}
            <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-slate-900">Your Active Deals</h2>
                    <Link to="/buyer/activity" className="text-sm font-bold text-primary hover:underline">View all</Link>
                </div>

                {activeDeals.length > 0 ? (
                    <div className="space-y-4">
                        {activeDeals.slice(0, 3).map(deal => (
                            <div key={deal.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 truncate max-w-[200px] sm:max-w-xs">{deal.property?.title || 'Group Deal'}</h4>
                                        <p className="text-xs font-medium text-slate-500 mt-1">Status: {deal.status}</p>
                                    </div>
                                </div>
                                <Link to={`/deals/${deal.id}`}>
                                    <Button variant="outline" className="h-9 px-4 text-xs">View Status</Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 px-4 rounded-xl bg-slate-50 border border-slate-100 border-dashed">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-slate-300 mx-auto mb-4 shadow-sm">
                            <Search size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">No active deals yet</h3>
                        <p className="text-slate-500 mb-6 max-w-sm mx-auto">You haven't joined any property group deals yet. Explore the marketplace to find massive discounts!</p>
                        <Link to="/buyer/properties">
                            <Button>Explore Properties</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuyerHome;
