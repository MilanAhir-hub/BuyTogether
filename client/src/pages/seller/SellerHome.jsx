import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Building, Users, TrendingUp, PlusCircle, AlertCircle, Edit2, Trash2, MapPin, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import Button from '../../components/ui/Button';
import PropertyForm from '../../components/properties/PropertyForm';
import { toast } from 'react-hot-toast';
import Profile from '../user/Profile';
import Section from '../../components/ui/Section';

const fetchSellerStats = async () => {
    // We combine property and deal data for the seller
    const [propertiesRes, dealsRes] = await Promise.all([
        apiClient.get('/properties/my-properties'),
        apiClient.get('/deals') // This should ideally be /deals/by-seller
    ]);
    
    return {
        properties: propertiesRes.data || [],
        deals: dealsRes.data.data || []
    };
};

const deleteProperty = async (id) => {
    const response = await apiClient.delete(`/properties/${id}`);
    return response.data;
};

const SellerHome = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['seller-stats'],
        queryFn: fetchSellerStats
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['seller-stats'] });
            toast.success('Listing removed successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Error deleting property');
        }
    });

    if (isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-none border-4 border-primary/20 border-t-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-none bg-red-50 p-8 border border-red-100 flex items-start gap-4 max-w-2xl mx-auto mt-12">
                <AlertCircle className="text-red-500 mt-1" size={24} />
                <div>
                    <h3 className="font-bold text-red-800 text-lg">Dashboard Error</h3>
                    <p className="text-red-600 mt-1">We ran into a problem loading your seller data. Please try refreshing the page.</p>
                </div>
            </div>
        );
    }

    const myProperties = data.properties || [];
    const myPropertiesCount = myProperties.length;
    const activeDeals = data.deals.filter(d => myProperties.some(p => p.id === d.propertyId));
    const totalPotentialValue = activeDeals.reduce((sum, d) => sum + (d.targetPrice || 0), 0);

    return (
        <div className="max-w-7xl mx-auto pb-20 space-y-24">
            {/* 1. DASHBOARD SECTION */}
            <section id="dashboard" className="scroll-mt-24 pt-4">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-secondary tracking-tight">Seller Dashboard</h1>
                    <p className="mt-2 text-text-secondary text-lg">Manage your property portfolio and track co-buying interest.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    <StatCard 
                        label="Listed Properties" 
                        value={myPropertiesCount} 
                        icon={<Building size={24} />} 
                        color="bg-secondary" 
                        shadow="shadow-secondary/20"
                    />
                    <StatCard 
                        label="Active Deals" 
                        value={activeDeals.length} 
                        icon={<Users size={24} />} 
                        color="bg-emerald-500" 
                        shadow="shadow-emerald-500/20"
                    />
                    <StatCard 
                        label="Potential Revenue" 
                        value={`₹${(totalPotentialValue / 10000000).toFixed(2)}Cr`} 
                        icon={<TrendingUp size={24} />} 
                        color="bg-primary" 
                        shadow="shadow-primary/20"
                    />
                </div>

                {/* Quick Advice Row */}
                <div className="mt-8 bg-[linear-gradient(135deg,#fffbf8_0%,#fff5f0_100%)] rounded-none p-8 border border-primary/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-secondary mb-2">Performance Insight</h3>
                        <p className="text-text-secondary leading-relaxed max-w-2xl">
                            Properties with active **Group Discounts** are attracting nearly double the interest this month. Consider checking your tiers to fuel faster group filling.
                        </p>
                    </div>
                    <Button className="w-full md:w-auto px-10 py-4 shadow-xl shadow-primary/20">Boost Listings</Button>
                </div>
            </section>

            {/* 2. MY PORTFOLIO SECTION */}
            <section id="properties" className="scroll-mt-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-secondary">My Portfolio</h2>
                        <p className="mt-2 text-text-secondary italic">List of properties managed by your account.</p>
                    </div>
                    <div className="bg-white px-5 py-2 rounded-none border border-slate-100 font-bold text-sm text-secondary shadow-sm">
                        {myPropertiesCount} Active Listings
                    </div>
                </div>

                {myProperties.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-none border border-dashed border-slate-200">
                        <Building2 size={48} className="mx-auto text-slate-200 mb-6" />
                        <h3 className="text-xl font-bold text-secondary">No listings yet</h3>
                        <p className="text-text-secondary mt-2 mb-8">Start adding properties to generate group buying deals.</p>
                        <Button variant="outline" className="px-8 rounded-none" onClick={() => document.getElementById('add-property').scrollIntoView({ behavior: 'smooth'})}>
                            Create Listing
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myProperties.map((property) => (
                            <PropertyMiniCard 
                                key={property.id} 
                                property={property} 
                                onDelete={() => {
                                    if(window.confirm('Delete this listing permanently?')) {
                                        deleteMutation.mutate(property.id);
                                    }
                                }} 
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* 3. ADD PROPERTY SECTION */}
            <section id="add-property" className="scroll-mt-24">
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-secondary">List New Property</h2>
                    <p className="mt-2 text-text-secondary">Fill in the form below to create a fresh property target in the marketplace.</p>
                </div>
                
                <div className="bg-white rounded-none border border-slate-100 p-2 shadow-sm overflow-hidden">
                    <div className="bg-neutral-50/50 rounded-none p-6 sm:p-10">
                        <PropertyForm 
                            variant="dashboard"
                            cancelPath="/seller"
                            successRedirectPath={() => '/seller#properties'}
                        />
                    </div>
                </div>
            </section>

            {/* 4. PROFILE SECTION */}
            <section id="profile" className="scroll-mt-24">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-secondary">Account Profile</h2>
                    <p className="mt-2 text-text-secondary">Your seller identity and account settings.</p>
                </div>
                <div className="bg-white/40 backdrop-blur-sm rounded-none border border-white/70 overflow-hidden shadow-sm">
                    <Profile isDashboard={true} />
                </div>
            </section>
        </div>
    );
};

// Sub-components for cleaner structure
const StatCard = ({ label, value, icon, color, shadow }) => (
    <div className="bg-white rounded-none p-8 border border-slate-50 shadow-sm transition-transform hover:-translate-y-1">
        <div className="flex items-center gap-5">
            <div className={`w-14 h-14 ${color} text-white rounded-none flex items-center justify-center shadow-lg ${shadow}`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
                <h3 className="text-3xl font-bold text-secondary mt-1">{value}</h3>
            </div>
        </div>
    </div>
);

const PropertyMiniCard = ({ property, onDelete }) => (
    <div className="group bg-white rounded-none border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-secondary/10 transition-all">
        <div className="relative h-52 bg-slate-50">
            {property.imageUrl ? (
                <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200"><Building2 size={40} /></div>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
                <Link to={`/properties/edit/${property.id}`} className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-none flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all shadow-sm">
                    <Edit2 size={16} />
                </Link>
                <button onClick={onDelete} className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-none flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-lg font-bold text-secondary mb-1 truncate group-hover:text-primary transition-colors">{property.title}</h3>
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-5">
                <MapPin size={12} className="text-primary" />
                <span className="truncate">{property.location || 'Location Not Specified'}</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Fixed Price</p>
                    <p className="text-base font-bold text-secondary">₹{(property.price / 100000).toFixed(1)}L</p>
                </div>
                <Link to={`/properties/${property.id}`}>
                    <Button variant="outline" className="h-9 px-4 rounded-none text-[10px] font-bold">View Public</Button>
                </Link>
            </div>
        </div>
    </div>
);

export default SellerHome;
