import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, BedDouble, Building2, MapPin, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { propertyService } from '../services/propertyService';

const PropertyList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { isAuthenticated, user } = useAuth();
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
        <div className="min-h-screen bg-[linear-gradient(180deg,#fff7f2_0%,#ffffff_48%,#fff9f5_100%)]">
            <section className="border-b border-orange-100 bg-[radial-gradient(circle_at_top_left,rgba(215,59,11,0.18),transparent_38%),linear-gradient(180deg,#fff7f2_0%,#ffffff_100%)]">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">
                                Property Marketplace
                            </p>
                            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-secondary sm:text-5xl">
                                Browse real listings and discover the next group-buy opportunity.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                                Explore newly listed properties, compare pricing, and move from discovery to collaboration without leaving TogetherBuy.
                            </p>
                        </div>

                        <div className="rounded-xl border border-white/70 bg-white/90 p-5 shadow-[0_24px_80px_rgba(215,59,11,0.12)] backdrop-blur">
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                                <Search size={18} className="text-text-secondary" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search by title, location, or owner"
                                    className="w-full border-none bg-transparent text-sm text-secondary outline-none placeholder:text-text-secondary"
                                />
                            </div>

                            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-text-secondary">
                                    {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} ready to explore
                                </p>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
                {isLoading ? (
                    <div className="flex min-h-[45vh] items-center justify-center">
                        <div className="h-14 w-14 animate-spin rounded-xl border-4 border-primary/15 border-t-primary" />
                    </div>
                ) : null}

                {isError ? (
                    <div className="mx-auto max-w-3xl rounded-xl border border-red-100 bg-white p-8 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                <AlertCircle size={22} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-secondary">Unable to load properties</h2>
                                <p className="mt-2 text-sm leading-6 text-text-secondary">
                                    {getErrorMessage(error)}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null}

                {!isLoading && !isError && filteredProperties.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/80 px-8 py-16 text-center shadow-sm">
                        <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-xl bg-bg-light text-primary">
                            <Building2 size={30} />
                        </div>
                        <h2 className="mt-6 text-2xl font-semibold text-secondary">No properties matched your search</h2>
                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-text-secondary">
                            Try a different keyword or add a fresh listing to start building momentum inside the marketplace.
                        </p>
                        
                    </div>
                ) : null}

                {!isLoading && !isError && filteredProperties.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredProperties.map((property) => (
                            <Link
                                key={property.id}
                                to={`/properties/${property.id}`}
                                className="group overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_90px_rgba(215,59,11,0.14)]"
                            >
                                <div className="relative h-64 overflow-hidden bg-[linear-gradient(135deg,#f7d9cf_0%,#fff4ef_48%,#f6f8fb_100%)]">
                                    {property.imageUrl ? (
                                        <img
                                            src={property.imageUrl}
                                            alt={property.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-primary/70">
                                            <div className="rounded-xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur">
                                                <Building2 size={46} />
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute left-5 top-5 inline-flex rounded-xl bg-white/92 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-secondary shadow-sm">
                                        Listed {formatDate(property.createdAt)}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-xl font-semibold text-secondary transition group-hover:text-primary">
                                                {property.title}
                                            </h2>
                                            <p className="mt-2 flex items-center gap-2 text-sm text-text-secondary">
                                                <MapPin size={16} className="text-primary" />
                                                {property.location || 'Location coming soon'}
                                            </p>
                                        </div>
                                        <div className="rounded-xl bg-primary/8 px-4 py-3 text-right">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                                                Price
                                            </p>
                                            <p className="mt-1 text-lg font-semibold text-primary">
                                                {formatCurrency(property.price)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        <InfoTile label="Bedrooms" value={`${property.bedrooms || 0} rooms`} icon={<BedDouble size={16} />} />
                                        <InfoTile label="Listed by" value={property.ownerName} icon={<Building2 size={16} />} />
                                    </div>

                                    <p className="mt-6 line-clamp-3 text-sm leading-6 text-text-secondary">
                                        {property.description || 'No description added for this property yet.'}
                                    </p>

                                    <div className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
                                        View details
                                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : null}
            </section>
        </div>
    );
};

const InfoTile = ({ label, value, icon }) => {
    return (
        <div className="rounded-xl bg-bg-light/70 p-4">
            <div className="flex items-center gap-2 text-primary">
                {icon}
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-secondary">{label}</p>
            </div>
            <p className="mt-2 text-sm font-medium text-secondary">{value}</p>
        </div>
    );
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value ?? 0);
};

const formatDate = (value) => {
    if (!value) {
        return 'recently';
    }

    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));
};

const getErrorMessage = (error) => {
    return error?.response?.data?.message || 'Something went wrong while talking to the property service.';
};

export default PropertyList;
