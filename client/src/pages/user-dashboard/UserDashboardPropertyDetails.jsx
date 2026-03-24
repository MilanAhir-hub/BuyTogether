import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ArrowLeft,
    BedDouble,
    Building2,
    CalendarDays,
    MapPin,
    Users,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { buyerService } from '../../services/buyerService';
import { formatCurrency, formatDate } from '../../utils/propertyFormatters';

const UserDashboardPropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
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

    const joinMutation = useMutation({
        mutationFn: () => buyerService.joinGroup(id),
        onSuccess: () => {
            toast.success('Successfully joined the group!');
            queryClient.invalidateQueries({ queryKey: ['property', id] });
            navigate('/user-dashboard/groups');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Failed to join group. Please try again.');
        }
    });

    if (isLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center rounded-[32px] border border-slate-200 bg-white">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-orange-100 border-t-primary" />
            </div>
        );
    }

    if (isError || !property) {
        return (
            <div className="rounded-[32px] border border-red-100 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Property Details</p>
                <h1 className="mt-4 text-3xl font-semibold text-slate-900">We could not find that property</h1>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                    {error?.response?.data?.message || 'The property may have been removed or is temporarily unavailable.'}
                </p>
                <Link
                    to="/user-dashboard"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                    <ArrowLeft size={16} />
                    Back to properties
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Link
                to="/user-dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
            >
                <ArrowLeft size={16} />
                Back to properties
            </Link>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_420px]">
                <article className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm">
                    <div className="relative h-[320px] overflow-hidden bg-[linear-gradient(135deg,#dbeafe_0%,#eef2ff_55%,#f8fafc_100%)] md:h-[420px]">
                        {property.imageUrl ? (
                            <img
                                src={property.imageUrl}
                                alt={property.title}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-primary">
                                <div className="rounded-[32px] border border-white/70 bg-white/80 p-7 shadow-sm">
                                    <Building2 size={64} />
                                </div>
                            </div>
                        )}

                        <div className="absolute left-6 top-6 inline-flex rounded-full bg-white/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
                            Buyer preview
                        </div>
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                                    Listed by {property.ownerName}
                                </p>
                                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                    {property.title}
                                </h1>
                                <p className="mt-4 flex items-center gap-2 text-base text-slate-500">
                                    <MapPin size={18} className="text-primary" />
                                    {property.location || 'Location coming soon'}
                                </p>
                            </div>

                            <div className="rounded-[28px] bg-primary px-6 py-5 text-white shadow-lg shadow-primary/20">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-50/70">Listing price</p>
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

                        <div className="mt-8 rounded-[30px] bg-slate-50 p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                Description
                            </p>
                            <p className="mt-4 text-sm leading-7 text-slate-700">
                                {property.description || 'The owner has not added a detailed description yet.'}
                            </p>
                        </div>
                    </div>
                </article>

                <aside className="space-y-6">
                    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                            Next Step
                        </p>
                        <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                            Ready to join this group-buy opportunity?
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            The join flow is UI-only for now. This gives buyers a clear action point without changing existing backend APIs.
                        </p>

                        <button
                            type="button"
                            onClick={() => joinMutation.mutate()}
                            disabled={joinMutation.isPending}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {joinMutation.isPending ? 'Joining...' : 'Join Group'}
                        </button>

                        <Link
                            to="/user-dashboard/groups"
                            className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                        >
                            View My Groups
                        </Link>
                    </div>

                    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
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
        </div>
    );
};

const MetricCard = ({ label, value, icon }) => {
    return (
        <div className="rounded-[26px] border border-slate-100 bg-slate-50/80 p-5">
            <div className="flex items-center gap-2 text-primary">
                {icon}
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
            </div>
            <p className="mt-3 text-lg font-semibold text-slate-900">{value}</p>
        </div>
    );
};

const SummaryRow = ({ label, value }) => {
    return (
        <div className="rounded-[24px] bg-slate-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
            <p className="mt-2 text-sm font-medium text-slate-900">{value}</p>
        </div>
    );
};

export default UserDashboardPropertyDetails;
