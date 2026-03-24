import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, BedDouble, Building2, CalendarDays, MapPin, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { propertyService } from '../services/propertyService';

const PropertyDetails = () => {
    const { id } = useParams();
    const { user, isAuthenticated } = useAuth();
    const {
        data: property,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['property', id],
        queryFn: () => propertyService.getById(id),
        enabled: Boolean(id),
    });

    const isOwner = user?.id === property?.ownerId;

    if (isLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[linear-gradient(180deg,#fff7f2_0%,#ffffff_100%)] px-6">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-primary/15 border-t-primary" />
            </div>
        );
    }

    if (isError || !property) {
        return (
            <div className="min-h-screen bg-[linear-gradient(180deg,#fff7f2_0%,#ffffff_100%)] px-6 py-20">
                <div className="mx-auto max-w-3xl rounded-[36px] border border-white/70 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">Property Details</p>
                    <h1 className="mt-4 text-3xl font-semibold text-secondary">We could not find that property</h1>
                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                        {error?.response?.data?.message || 'The property may have been removed or is temporarily unavailable.'}
                    </p>
                    <Link
                        to="/properties"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                    >
                        <ArrowLeft size={16} />
                        Back to properties
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_34%,#fff7f2_100%)]">
            <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
                <Link
                    to="/properties"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
                >
                    <ArrowLeft size={16} />
                    Back to properties
                </Link>

                <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_420px]">
                    <article className="overflow-hidden rounded-[40px] border border-white/70 bg-white shadow-[0_32px_90px_rgba(15,23,42,0.08)]">
                        <div className="relative h-[360px] overflow-hidden bg-[linear-gradient(135deg,#f9d7c8_0%,#fff3ec_55%,#eef3ff_100%)] md:h-[460px]">
                            {property.imageUrl ? (
                                <img
                                    src={property.imageUrl}
                                    alt={property.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-primary/70">
                                    <div className="rounded-[34px] border border-white/70 bg-white/75 p-7 shadow-sm backdrop-blur">
                                        <Building2 size={64} />
                                    </div>
                                </div>
                            )}

                            <div className="absolute left-6 top-6 inline-flex rounded-full bg-white/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary shadow-sm">
                                {isOwner ? 'Your listing' : 'Property listing'}
                            </div>
                        </div>

                        <div className="p-7 sm:p-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">
                                        {property.ownerName}
                                    </p>
                                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
                                        {property.title}
                                    </h1>
                                    <p className="mt-4 flex items-center gap-2 text-base text-text-secondary">
                                        <MapPin size={18} className="text-primary" />
                                        {property.location || 'Location coming soon'}
                                    </p>
                                </div>

                                <div className="rounded-[28px] bg-primary px-6 py-5 text-white shadow-lg shadow-primary/20">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">Listing price</p>
                                    <p className="mt-2 text-3xl font-semibold">{formatCurrency(property.price)}</p>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                <MetricCard
                                    label="Bedrooms"
                                    value={`${property.bedrooms || 0}`}
                                    icon={<BedDouble size={18} />}
                                />
                                <MetricCard
                                    label="Listed on"
                                    value={formatDate(property.createdAt)}
                                    icon={<CalendarDays size={18} />}
                                />
                                <MetricCard
                                    label="Owner"
                                    value={property.ownerName}
                                    icon={<Users size={18} />}
                                />
                            </div>

                            <div className="mt-8 rounded-[30px] bg-bg-light/70 p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
                                    Description
                                </p>
                                <p className="mt-4 text-sm leading-7 text-secondary">
                                    {property.description || 'The owner has not added a detailed description yet.'}
                                </p>
                            </div>
                        </div>
                    </article>

                    <aside className="space-y-6">
                        <div className="rounded-[36px] border border-white/70 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">
                                Next Step
                            </p>
                            <h2 className="mt-4 text-2xl font-semibold text-secondary">
                                Interested in buying this property together?
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-text-secondary">
                                Group joining is the next workflow for this module. The button is ready in the UI so we can wire the real flow in a later pass.
                            </p>

                            <button
                                type="button"
                                onClick={() => toast.success('Join Group is UI-only for now.')}
                                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                            >
                                Join Group
                            </button>

                            <div className="mt-4 grid gap-3">
                                {isAuthenticated ? (
                                    <Link
                                        to="/add-property"
                                        className="inline-flex items-center justify-center rounded-full border border-primary/15 px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
                                    >
                                        Add another property
                                    </Link>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center justify-center rounded-full border border-primary/15 px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
                                    >
                                        Login to list a property
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="rounded-[36px] border border-white/70 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">
                                Listing Summary
                            </p>
                            <div className="mt-5 space-y-4">
                                <SummaryRow label="Title" value={property.title} />
                                <SummaryRow label="Location" value={property.location || 'Not specified'} />
                                <SummaryRow label="Bedrooms" value={`${property.bedrooms || 0}`} />
                                <SummaryRow label="Owner" value={property.ownerName} />
                                <SummaryRow label="Created" value={formatDate(property.createdAt)} />
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
};

const MetricCard = ({ label, value, icon }) => {
    return (
        <div className="rounded-[26px] border border-slate-100 bg-slate-50/80 p-5">
            <div className="flex items-center gap-2 text-primary">
                {icon}
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-secondary">{label}</p>
            </div>
            <p className="mt-3 text-lg font-semibold text-secondary">{value}</p>
        </div>
    );
};

const SummaryRow = ({ label, value }) => {
    return (
        <div className="rounded-[24px] bg-bg-light/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-secondary">{label}</p>
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
        return 'Recently';
    }

    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));
};

export default PropertyDetails;
