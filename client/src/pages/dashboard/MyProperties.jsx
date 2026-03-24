import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    AlertCircle,
    BedDouble,
    Building2,
    MapPin,
    Plus,
    Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { formatCurrency, formatDate } from '../../utils/propertyFormatters';

const MyProperties = () => {
    const queryClient = useQueryClient();
    const {
        data: properties = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['my-properties'],
        queryFn: propertyService.getMine,
    });

    const deletePropertyMutation = useMutation({
        mutationFn: propertyService.remove,
        onMutate: async (propertyId) => {
            await queryClient.cancelQueries({ queryKey: ['my-properties'] });
            const previousProperties = queryClient.getQueryData(['my-properties']) ?? [];

            queryClient.setQueryData(['my-properties'], (current = []) =>
                current.filter((property) => property.id !== propertyId),
            );

            return { previousProperties };
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['my-properties'] }),
                queryClient.invalidateQueries({ queryKey: ['properties'] }),
            ]);
            toast.success('Property deleted successfully.');
        },
        onError: (mutationError, _, context) => {
            if (context?.previousProperties) {
                queryClient.setQueryData(['my-properties'], context.previousProperties);
            }

            toast.error(getErrorMessage(mutationError));
        },
    });

    return (
        <div className="space-y-6">
            <section className="flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">My Properties</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-secondary">Manage your listings</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
                        Review everything you have published, remove outdated properties, and keep your inventory up to date.
                    </p>
                </div>

                <Link
                    to="/dashboard/add-property"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                    <Plus size={16} />
                    Add Property
                </Link>
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
                            <AlertCircle size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">Unable to load your properties</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">{getErrorMessage(error)}</p>
                        </div>
                    </div>
                </div>
            ) : null}

            {!isLoading && !isError && properties.length === 0 ? (
                <div className="rounded-[32px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] bg-bg-light text-primary">
                        <Building2 size={28} />
                    </div>
                    <h2 className="mt-6 text-2xl font-semibold text-secondary">No properties yet. Add your first property!</h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-text-secondary">
                        Once you create your first listing, it will appear here so you can manage it anytime.
                    </p>
                    <Link
                        to="/dashboard/add-property"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                    >
                        <Plus size={16} />
                        Add Property
                    </Link>
                </div>
            ) : null}

            {!isLoading && !isError && properties.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
                    {properties.map((property) => {
                        const isDeleting =
                            deletePropertyMutation.isPending && deletePropertyMutation.variables === property.id;

                        return (
                            <article
                                key={property.id}
                                className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_80px_rgba(15,23,42,0.10)]"
                            >
                                <div className="relative h-56 overflow-hidden bg-[linear-gradient(135deg,#dbeafe_0%,#eef2ff_50%,#f8fafc_100%)]">
                                    {property.imageUrl ? (
                                        <img
                                            src={property.imageUrl}
                                            alt={property.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-primary">
                                            <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-sm">
                                                <Building2 size={42} />
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute left-5 top-5 inline-flex rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
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
                                                {property.location || 'Location not added'}
                                            </p>
                                        </div>

                                        <div className="rounded-[20px] bg-bg-light px-4 py-3 text-right">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                                                Price
                                            </p>
                                            <p className="mt-1 text-lg font-semibold text-primary">
                                                {formatCurrency(property.price)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        <InfoTile label="Bedrooms" value={`${property.bedrooms || 0} rooms`} icon={<BedDouble size={16} />} />
                                        <InfoTile label="Owner" value={property.ownerName} icon={<Building2 size={16} />} />
                                    </div>

                                    <p className="mt-6 line-clamp-3 text-sm leading-6 text-slate-500">
                                        {property.description || 'No description added for this property yet.'}
                                    </p>

                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                        <Link
                                            to={`/properties/${property.id}`}
                                            className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                                        >
                                            View Details
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => deletePropertyMutation.mutate(property.id)}
                                            disabled={isDeleting}
                                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            <Trash2 size={16} />
                                            {isDeleting ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};

const InfoTile = ({ label, value, icon }) => {
    return (
        <div className="rounded-[22px] bg-bg-light p-4">
            <div className="flex items-center gap-2 text-primary">
                {icon}
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-secondary">{label}</p>
            </div>
            <p className="mt-2 text-sm font-medium text-secondary">{value}</p>
        </div>
    );
};

const getErrorMessage = (error) => {
    return error?.response?.data?.message || 'Something went wrong while loading your properties.';
};

export default MyProperties;
