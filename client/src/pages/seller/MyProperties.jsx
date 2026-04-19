import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit2, Trash2, MapPin, Building2, AlertCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import Button from '../../components/ui/Button';
import { toast } from 'react-hot-toast';

const fetchMyProperties = async () => {
    const response = await apiClient.get('/properties/my-properties');
    return response.data || [];
};

const deleteProperty = async (id) => {
    const response = await apiClient.delete(`/properties/${id}`);
    return response.data;
};

const MyProperties = () => {
    const queryClient = useQueryClient();
    const { data: properties, isLoading, isError } = useQuery({
        queryKey: ['my-properties'],
        queryFn: fetchMyProperties
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-properties'] });
            toast.success('Listing removed successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Error deleting property');
        }
    });

    if (isLoading) return <p className="text-center py-20 text-text-secondary">Loading your listings...</p>;

    if (isError) return (
        <div className="bg-red-50 text-red-500 p-6 rounded-xl border border-red-100 flex items-center gap-3">
            <AlertCircle size={20} />
            <span className="font-bold">Failed to load listings. Please try again.</span>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-secondary">My Portfolio</h1>
                    <p className="mt-2 text-text-secondary">You have {properties.length} properties listed on TogetherBuy.</p>
                </div>
                <Link to="/seller/add-property">
                    <Button className="rounded-xl px-8 py-4 shadow-xl shadow-primary/20 flex items-center gap-2">
                        <Plus size={20} />
                        List New Property
                    </Button>
                </Link>
            </div>

            {properties.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-xl border border-dashed border-slate-300">
                    <Building2 size={48} className="mx-auto text-slate-200 mb-6" />
                    <h2 className="text-2xl font-bold text-secondary mb-3">No listings found</h2>
                    <p className="text-text-secondary mb-8 max-w-sm mx-auto">You haven't added any properties to TogetherBuy yet. Start listing now to attract group buyers!</p>
                    <Link to="/seller/add-property">
                        <Button variant="outline" className="rounded-xl px-10 py-4">Create First Listing</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <div key={property.id} className="group bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-secondary/10 transition-all">
                            <div className="relative h-56 bg-slate-100 overflow-hidden">
                                {property.imageUrl ? (
                                    <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Building2 size={48} />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Link to={`/properties/edit/${property.id}`}>
                                        <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all shadow-sm">
                                            <Edit2 size={16} />
                                        </button>
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            if(window.confirm('Are you sure you want to delete this listing?')) {
                                                deleteMutation.mutate(property.id);
                                            }
                                        }}
                                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-7">
                                <h3 className="text-xl font-bold text-secondary mb-2 truncate group-hover:text-primary transition-colors">{property.title}</h3>
                                <div className="flex items-center gap-2 text-text-secondary text-sm mb-6">
                                    <MapPin size={14} className="text-primary" />
                                    <span className="truncate">{property.location}</span>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">List Price</p>
                                        <p className="text-lg font-bold text-secondary">₹{(property.price / 100000).toFixed(1)}L</p>
                                    </div>
                                    <Link to={`/properties/${property.id}`}>
                                        <Button variant="outline" className="h-10 px-5 rounded-xl text-xs font-bold border-slate-200">View Public</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProperties;
