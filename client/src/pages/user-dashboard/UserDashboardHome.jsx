import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Building2, Search, Sparkles, Users } from 'lucide-react';
import BuyerPropertyCard from '../../components/dashboard/BuyerPropertyCard';
import { propertyService } from '../../services/propertyService';

const UserDashboardHome = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const {
        data: properties = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['properties'],
        queryFn: propertyService.getAll,
    });

    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filteredProperties = properties.filter((property) => {
        if (!normalizedSearch) {
            return true;
        }

        return [
            property.title,
            property.location,
            property.ownerName,
        ]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(normalizedSearch));
    });

    return (
        <div className="space-y-6">
            <section className="overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_top_left,rgba(215,59,11,0.28),transparent_35%),linear-gradient(135deg,#d73b0b_0%,#a82e08_58%,#8b2606_100%)] p-6 text-white shadow-[0_28px_90px_rgba(168,46,8,0.28)] sm:p-8">
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-end">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-orange-50">
                            <Sparkles size={14} />
                            Buyer workspace
                        </div>
                        <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                            Discover properties and join the right buying group with confidence.
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                            Explore listings, review details, and keep track of future group-buy opportunities from one dedicated dashboard.
                        </p>
                    </div>

                    <div className="rounded-[28px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-50">Quick browse</p>
                        <div className="mt-4 flex items-center gap-3 rounded-[24px] border border-white/15 bg-white/10 px-4 py-3">
                            <Search size={18} className="text-orange-50" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search by title, location, or owner"
                                className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-orange-50/70"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                <StatCard
                    icon={<Building2 size={20} />}
                    label="Available listings"
                    value={properties.length}
                    tone="orange"
                />
                <StatCard
                    icon={<Users size={20} />}
                    label="Groups joined"
                    value="0"
                    tone="orange"
                />
                <StatCard
                    icon={<Search size={20} />}
                    label="Search results"
                    value={filteredProperties.length}
                    tone="slate"
                />
            </section>

            {isLoading ? (
                <div className="flex min-h-[320px] items-center justify-center rounded-[32px] border border-slate-200 bg-white">
                    <div className="h-14 w-14 animate-spin rounded-full border-4 border-orange-100 border-t-primary" />
                </div>
            ) : null}

            {isError ? (
                <div className="rounded-[32px] border border-red-100 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                            <AlertCircle size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">Unable to load properties</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">{getErrorMessage(error)}</p>
                        </div>
                    </div>
                </div>
            ) : null}

            {!isLoading && !isError && filteredProperties.length === 0 ? (
                <div className="rounded-[32px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] bg-orange-50 text-primary">
                        <Building2 size={28} />
                    </div>
                    <h2 className="mt-6 text-2xl font-semibold text-slate-900">No properties available right now</h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                        Try adjusting your search or check back shortly for new opportunities to join a buying group.
                    </p>
                </div>
            ) : null}

            {!isLoading && !isError && filteredProperties.length > 0 ? (
                <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
                    {filteredProperties.map((property) => (
                        <BuyerPropertyCard key={property.id} property={property} />
                    ))}
                </section>
            ) : null}
        </div>
    );
};

const StatCard = ({ icon, label, value, tone }) => {
    const toneMap = {
        orange: 'bg-orange-50 text-primary',
        slate: 'bg-slate-100 text-slate-700',
    };

    return (
        <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneMap[tone] ?? toneMap.slate}`}>
                {icon}
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
        </article>
    );
};

const getErrorMessage = (error) => {
    return error?.response?.data?.message || 'Something went wrong while loading properties.';
};

export default UserDashboardHome;
