import { useQuery } from '@tanstack/react-query';
import {
    ArrowRight,
    Building2,
    CircleAlert,
    IndianRupee,
    Plus,
    Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { formatCurrency, formatDate } from '../../utils/propertyFormatters';

const DashboardHome = () => {
    const {
        data: properties = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['my-properties'],
        queryFn: propertyService.getMine,
    });

    const totalValue = properties.reduce((sum, property) => sum + Number(property.price || 0), 0);
    const latestProperty = properties[0];
    const listedLocations = new Set(
        properties
            .map((property) => property.location?.trim())
            .filter(Boolean),
    ).size;

    return (
        <div className="space-y-6">
            <section className="overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_top_left,rgba(215,59,11,0.30),transparent_35%),linear-gradient(135deg,#1f2937_0%,#d73b0b_58%,#a82e08_100%)] p-6 text-white shadow-[0_28px_90px_rgba(31,41,55,0.28)] sm:p-8">
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-end">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">
                            <Sparkles size={14} />
                            Seller workspace
                        </div>
                        <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                            Keep your listings organized, visible, and ready to sell.
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                            Review your active inventory, add new properties, and manage listing performance from one dedicated dashboard.
                        </p>
                    </div>

                    <div className="rounded-[28px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">Quick action</p>
                        <h2 className="mt-3 text-xl font-semibold">Launch a new property listing</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-200">
                            Publish a new property and keep the listing under your authenticated seller account.
                        </p>
                        <Link
                            to="/dashboard/add-property"
                            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-secondary transition hover:bg-bg-light"
                        >
                            <Plus size={16} />
                            Add Property
                        </Link>
                    </div>
                </div>
            </section>

            {isLoading ? (
                <div className="flex min-h-[320px] items-center justify-center rounded-[32px] border border-slate-200 bg-white">
                    <div className="h-14 w-14 animate-spin rounded-full border-4 border-primary/10 border-t-primary" />
                </div>
            ) : null}

            {isError ? (
                <div className="rounded-[32px] border border-red-100 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                            <CircleAlert size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">Unable to load your dashboard</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">{getErrorMessage(error)}</p>
                        </div>
                    </div>
                </div>
            ) : null}

            {!isLoading && !isError ? (
                <>
                    <section className="grid gap-4 md:grid-cols-3">
                        <StatCard
                            icon={<Building2 size={20} />}
                            label="Total listings"
                            value={properties.length}
                            tone="primary"
                        />
                        <StatCard
                            icon={<IndianRupee size={20} />}
                            label="Portfolio value"
                            value={formatCurrency(totalValue)}
                            tone="accent"
                        />
                        <StatCard
                            icon={<Sparkles size={20} />}
                            label="Locations covered"
                            value={listedLocations}
                            tone="secondary"
                        />
                    </section>

                    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
                        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Overview</p>
                                    <h2 className="mt-2 text-2xl font-semibold text-secondary">Your seller activity</h2>
                                </div>
                                <Link
                                    to="/dashboard/properties"
                                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-text-secondary transition hover:border-secondary hover:bg-secondary hover:text-white"
                                >
                                    Manage properties
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            {properties.length === 0 ? (
                                <div className="mt-6 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] bg-bg-light text-primary">
                                        <Building2 size={28} />
                                    </div>
                                    <h3 className="mt-5 text-xl font-semibold text-secondary">No properties yet. Add your first property!</h3>
                                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                                        Start by publishing your first listing. It will appear in your seller dashboard as soon as it is created.
                                    </p>
                                    <Link
                                        to="/dashboard/add-property"
                                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                                    >
                                        <Plus size={16} />
                                        Add Property
                                    </Link>
                                </div>
                            ) : (
                                <div className="mt-6 space-y-4">
                                    {properties.slice(0, 4).map((property) => (
                                        <div
                                            key={property.id}
                                            className="flex flex-col gap-4 rounded-[28px] border border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-white text-primary shadow-sm">
                                                    <Building2 size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-slate-900">{property.title}</h3>
                                                    <p className="mt-1 text-sm text-slate-500">{property.location || 'Location not added'}</p>
                                                    <p className="mt-2 text-sm font-medium text-slate-700">
                                                        {formatCurrency(property.price)} • Listed {formatDate(property.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <Link
                                                to={`/properties/${property.id}`}
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
                                            >
                                                View listing
                                                <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Latest listing</p>
                                <h2 className="mt-2 text-2xl font-semibold text-secondary">
                                    {latestProperty?.title || 'Nothing published yet'}
                                </h2>
                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    {latestProperty
                                        ? `${latestProperty.location || 'Location not added'} • ${formatDate(latestProperty.createdAt)}`
                                        : 'Once you add a property, this panel will highlight your newest listing.'}
                                </p>
                                <p className="mt-5 text-3xl font-semibold text-primary">
                                    {latestProperty ? formatCurrency(latestProperty.price) : formatCurrency(0)}
                                </p>
                            </div>

                            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-500">Seller checklist</p>
                                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-500">
                                    <li className="rounded-[20px] bg-slate-50 px-4 py-3">Keep your image URL updated so each card looks polished.</li>
                                    <li className="rounded-[20px] bg-slate-50 px-4 py-3">Use precise locations to help buyers discover the right listing faster.</li>
                                    <li className="rounded-[20px] bg-slate-50 px-4 py-3">Review My Properties regularly and remove outdated listings when needed.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </>
            ) : null}
        </div>
    );
};

const StatCard = ({ icon, label, value, tone }) => {
    const toneMap = {
        primary: 'bg-bg-light text-primary',
        accent: 'bg-accent/10 text-accent',
        secondary: 'bg-secondary/5 text-secondary',
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
    return error?.response?.data?.message || 'Something went wrong while loading your listings.';
};

export default DashboardHome;
