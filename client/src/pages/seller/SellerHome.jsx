import { useQuery } from '@tanstack/react-query';
import { Building, Users, TrendingUp, ArrowRight, PlusCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import Button from '../../components/ui/Button';

const fetchSellerStats = async () => {
    // We combine property and deal data for the seller
    const [propertiesRes, dealsRes] = await Promise.all([
        apiClient.get('/properties/my-properties'),
        apiClient.get('/deals') // This should ideally be /deals/by-seller but let's summarize from all
    ]);
    
    return {
        properties: propertiesRes.data || [],
        deals: dealsRes.data.data || []
    };
};

const SellerHome = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['seller-stats'],
        queryFn: fetchSellerStats
    });

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="text-text-secondary">Loading statistics...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-2xl bg-red-50 p-6 border border-red-100 flex items-start gap-4">
                <AlertCircle className="text-red-500 mt-1" />
                <div>
                    <h3 className="font-bold text-red-800">Error loading data</h3>
                    <p className="text-red-600 mt-1">Unable to fetch your property performance at this time.</p>
                </div>
            </div>
        );
    }

    const myPropertiesCount = data.properties.length;
    const activeDeals = data.deals.filter(d => data.properties.some(p => p.id === d.propertyId));
    const totalPotentialValue = activeDeals.reduce((sum, d) => sum + (d.targetPrice || 0), 0);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-secondary tracking-tight">Seller Dashboard</h1>
                <p className="mt-2 text-text-secondary text-lg">Manage your property portfolio and track co-buying interest.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm shadow-secondary/5 transition-transform hover:-translate-y-1">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-secondary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
                            <Building size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Listed Properties</p>
                            <h3 className="text-3xl font-bold text-secondary mt-1">{myPropertiesCount}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm shadow-secondary/5 transition-transform hover:-translate-y-1">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Users size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Active Deals</p>
                            <h3 className="text-3xl font-bold text-secondary mt-1">{activeDeals.length}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm shadow-secondary/5 transition-transform hover:-translate-y-1">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <TrendingUp size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Potential Revenue</p>
                            <h3 className="text-3xl font-bold text-secondary mt-1">₹{(totalPotentialValue / 10000000).toFixed(2)}Cr</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions & Recent Listings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                    <h2 className="text-2xl font-bold text-secondary mb-8">Manage Portfolio</h2>
                    <div className="space-y-4">
                        <Link to="/seller/add-property" className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:border-slate-200 transition-all group">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                    <PlusCircle size={24} />
                                </div>
                                <span className="font-bold text-lg text-secondary">Add New Listing</span>
                            </div>
                            <ArrowRight className="text-slate-300 group-hover:text-primary transition-colors" />
                        </Link>
                        <Link to="/seller/properties" className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:border-slate-200 transition-all group">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm group-hover:bg-secondary group-hover:text-white transition-colors">
                                    <Building size={24} />
                                </div>
                                <span className="font-bold text-lg text-secondary">View My Listings</span>
                            </div>
                            <ArrowRight className="text-slate-300 group-hover:text-secondary transition-colors" />
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                    <h2 className="text-2xl font-bold text-secondary mb-8">Quick Advice</h2>
                    <div className="bg-primary/5 rounded-[32px] p-8 border border-primary/10">
                        <p className="text-primary font-bold text-lg leading-relaxed">
                            "Active Group Deals attract 40% more buyers than traditional listings. Consider dropping your price by 5% to trigger a massive co-buying spike!"
                        </p>
                        <Button className="mt-8 py-4 px-8 rounded-2xl shadow-xl shadow-primary/20">Analyze Deals</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerHome;
