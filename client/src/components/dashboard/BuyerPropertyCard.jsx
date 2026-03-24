import { ArrowRight, Building2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/propertyFormatters';

const BuyerPropertyCard = ({ property }) => {
    return (
        <article className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
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
                        <h2 className="text-xl font-semibold text-slate-900 transition group-hover:text-primary">
                            {property.title}
                        </h2>
                        <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                            <MapPin size={16} className="text-primary" />
                            {property.location || 'Location not added'}
                        </p>
                    </div>

                    <div className="rounded-[20px] bg-orange-50 px-4 py-3 text-right">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                            Price
                        </p>
                        <p className="mt-1 text-lg font-semibold text-primary">
                            {formatCurrency(property.price)}
                        </p>
                    </div>
                </div>

                <p className="mt-6 line-clamp-3 text-sm leading-6 text-slate-500">
                    {property.description || 'Explore this property and review the full details before joining a group.'}
                </p>

                <Link
                    to={`/user-dashboard/property/${property.id}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
                >
                    View Details
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </article>
    );
};

export default BuyerPropertyCard;
