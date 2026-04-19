import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, BedDouble, Building2, CalendarDays, MapPin, Users, CheckCircle, AlertCircle, Clock, Tag } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { propertyService } from '../services/propertyService';
import { useSignalR } from '../hooks/useSignalR';
import PaymentModal from '../components/payment/PaymentModal';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user, isAuthenticated } = useAuth();
    const [joining, setJoining] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    
    // Real-time grouping data
    const { propertyGroupData } = useSignalR(null, id);

    const {
        data: property,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['property', id],
        queryFn: () => propertyService.getBuyerPropertyById(id),
        enabled: Boolean(id),
    });

    const isOwner = user?.id === property?.ownerId;

    const handleJoinGroup = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to join a group.');
            navigate('/login');
            return;
        }
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = (groupData) => {
        setShowPaymentModal(false);
        toast.success('Successfully joined the group!');
        queryClient.invalidateQueries(['property', id]);
    };

    const handleLeaveGroup = async () => {
        if (!property?.group?.groupId) return;

        setLeaving(true);
        try {
            const res = await propertyService.leaveGroup(property.group.groupId);
            toast.success('Successfully left the group!');
            queryClient.invalidateQueries(['property', id]);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error leaving group.');
        } finally {
            setLeaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[linear-gradient(180deg,#fff7f2_0%,#ffffff_100%)] px-6">
                <div className="h-14 w-14 animate-spin rounded-xl border-4 border-primary/15 border-t-primary" />
            </div>
        );
    }

    if (isError || !property) {
        return (
            <div className="min-h-screen bg-[linear-gradient(180deg,#fff7f2_0%,#ffffff_100%)] px-6 py-20">
                <div className="mx-auto max-w-3xl rounded-xl border border-white/70 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">Property Details</p>
                    <h1 className="mt-4 text-3xl font-semibold text-secondary">We could not find that property</h1>
                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                        {error?.response?.data?.message || 'The property may have been removed or is temporarily unavailable.'}
                    </p>
                    <Link
                        to="/properties"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                    >
                        <ArrowLeft size={16} />
                        Back to properties
                    </Link>
                </div>
            </div>
        );
    }

    // Merge static and real-time data
    const currentMembers = propertyGroupData?.currentCount ?? property.group?.currentMembers ?? 0;
    const requiredSize = propertyGroupData?.maxCount ?? property.group?.requiredGroupSize ?? property.requiredGroupSize;
    const groupStatus = propertyGroupData?.status ?? property.group?.status ?? 'Open';
    const progressPercent = Math.min((currentMembers / requiredSize) * 100, 100);
    const hasJoined = property.group?.hasJoined;

    // Price calculation
    const originalPrice = property.totalPrice || property.price;
    const sortedTiers = [...(property.discountTiers || [])].sort((a, b) => a.minBuyers - b.minBuyers);
    
    // Find highest unlocked tier
    let activeTier = null;
    let currentPrice = originalPrice;
    
    for (const tier of sortedTiers) {
        if (currentMembers >= tier.minBuyers) {
            activeTier = tier;
        }
    }
    
    if (activeTier) {
        const discountAmount = (originalPrice * activeTier.discountPercentage) / 100;
        currentPrice = originalPrice - discountAmount;
    }


    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_34%,#fff7f2_100%)]">
            <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
                <Link
                    to="/properties"
                    className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
                >
                    <ArrowLeft size={16} />
                    Back to properties
                </Link>

                <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_420px]">
                    <article className="overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_32px_90px_rgba(15,23,42,0.08)]">
                        <div className="relative h-[360px] overflow-hidden bg-[linear-gradient(135deg,#f9d7c8_0%,#fff3ec_55%,#eef3ff_100%)] md:h-[460px]">
                            {property.imageUrl ? (
                                <img
                                    src={property.imageUrl}
                                    alt={property.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-primary/70">
                                    <div className="rounded-xl border border-white/70 bg-white/75 p-7 shadow-sm backdrop-blur">
                                        <Building2 size={64} />
                                    </div>
                                </div>
                            )}

                            <div className="absolute left-6 top-6 inline-flex rounded-xl bg-white/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary shadow-sm">
                                {isOwner ? 'Your listing' : 'Property listing'}
                            </div>
                        </div>

                        <div className="p-7 sm:p-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">
                                        {property.ownerName || 'Verified Seller'}
                                    </p>
                                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
                                        {property.title}
                                    </h1>
                                    <p className="mt-4 flex items-center gap-2 text-base text-text-secondary">
                                        <MapPin size={18} className="text-primary" />
                                        {property.location || 'Location coming soon'}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-primary px-6 py-5 text-white shadow-lg shadow-primary/20 min-w-[200px]">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                                        {activeTier ? `Active Price (-${activeTier.discountPercentage}%)` : 'Listing Price'}
                                    </p>
                                    <div className="mt-2 flex items-baseline gap-3">
                                        <p className="text-3xl font-semibold">{formatCurrency(currentPrice)}</p>
                                        {activeTier && (
                                            <p className="text-base font-medium line-through text-white/60">
                                                {formatCurrency(originalPrice)}
                                            </p>
                                        )}
                                    </div>
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
                                    value={property.ownerName || 'Seller'}
                                    icon={<Users size={18} />}
                                />
                            </div>

                            <div className="mt-8 rounded-xl bg-bg-light/70 p-6">
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
                        <div className="rounded-xl border border-white/70 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">
                                TogetherBuy Status
                            </p>
                            <h2 className="mt-4 text-2xl font-semibold text-secondary">
                                Join this buyer group
                            </h2>
                            
                            <div className="mt-6 space-y-5">
                                {/* Real-time Group Info */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end text-sm">
                                        <div className="font-semibold text-secondary">
                                            <span className="text-2xl text-primary">{currentMembers}</span>
                                            <span className="text-slate-400"> / {requiredSize} buyers</span>
                                        </div>
                                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                            {groupStatus}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="h-2.5 w-full overflow-hidden rounded-xl bg-slate-100">
                                        <div 
                                            className="h-full bg-primary transition-all duration-1000 ease-out" 
                                            style={{ width: `${progressPercent}%` }}
                                        />
                                    </div>

                                    {currentMembers < requiredSize ? (
                                        <p className="text-xs text-slate-500 font-medium">
                                            {requiredSize - currentMembers} more buyers needed to unlock group discount.
                                        </p>
                                    ) : (
                                        <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                            <CheckCircle size={14} /> Group is full! Moving to payment phase.
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={hasJoined ? handleLeaveGroup : handleJoinGroup}
                                    disabled={
                                        joining || 
                                        leaving || 
                                        isOwner || 
                                        (!hasJoined && currentMembers >= requiredSize) ||
                                        !['OPEN', 'Open'].includes(groupStatus)
                                    }
                                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-bold text-white transition disabled:opacity-50 ${hasJoined ? 'bg-red-500 hover:bg-red-600 disabled:hover:bg-red-500' : 'bg-primary hover:bg-primary-dark disabled:hover:bg-primary'}`}
                                >
                                    {joining || leaving ? (
                                        <div className="h-5 w-5 animate-spin rounded-xl border-2 border-white/30 border-t-white" />
                                    ) : hasJoined ? (
                                        'Leave Group'
                                    ) : isOwner ? (
                                        'Your Listing'
                                    ) : (currentMembers >= requiredSize || ['FULL', 'Full', 'LOCKED', 'Locked'].includes(groupStatus)) ? (
                                        'Group is Locked'
                                    ) : (
                                        'Join Group'
                                    )}
                                </button>

                                {hasJoined && (
                                    <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex items-start gap-3">
                                        <CheckCircle className="text-emerald-500 shrink-0" size={18} />
                                        <p className="text-[13px] text-emerald-700 leading-snug">
                                            You've successfully joined this group. We'll notify you when the target of {requiredSize} is reached!
                                        </p>
                                    </div>
                                )}
                            </div>

                            
                        </div>

                        {sortedTiers.length > 0 && (
                            <div className="rounded-xl border border-white/70 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-orange-50 p-2 text-orange-500">
                                        <Tag size={20} />
                                    </div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                                        Group Discount Tiers
                                    </p>
                                </div>
                                <div className="mt-6 space-y-4">
                                    {sortedTiers.map((tier, index) => {
                                        const isUnlocked = currentMembers >= tier.minBuyers;
                                        const discountAmount = (originalPrice * tier.discountPercentage) / 100;
                                        const tierPrice = originalPrice - discountAmount;
                                        const isNextTarget = !isUnlocked && (index === 0 || currentMembers >= sortedTiers[index - 1].minBuyers);
                                        
                                        return (
                                            <div 
                                                key={tier.id} 
                                                className={`relative flex items-center justify-between rounded-xl p-4 transition-all ${
                                                    isUnlocked 
                                                        ? 'bg-primary/5 border border-primary/20 border-l-4 border-l-primary' 
                                                        : isNextTarget 
                                                            ? 'bg-slate-50 border border-slate-200 border-l-4 border-l-orange-400' 
                                                            : 'bg-slate-50 opacity-70 border border-slate-100'
                                                }`}
                                            >
                                                <div>
                                                    <p className={`font-bold ${isUnlocked ? 'text-primary' : 'text-slate-700'}`}>
                                                        {tier.minBuyers}+ Buyers
                                                    </p>
                                                    <p className={`text-xs mt-0.5 ${isUnlocked ? 'text-primary/70 font-semibold' : 'text-slate-500'}`}>
                                                        Get {tier.discountPercentage}% off
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`font-bold ${isUnlocked ? 'text-primary' : 'text-slate-700'}`}>
                                                        {formatCurrency(tierPrice)}
                                                    </p>
                                                    <p className="text-xs text-slate-400 line-through mt-0.5">
                                                        {formatCurrency(originalPrice)}
                                                    </p>
                                                </div>
                                                {isUnlocked && (
                                                    <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                                                        <CheckCircle size={14} />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="mt-5 text-center text-xs font-medium text-slate-500 flex items-center justify-center gap-1.5">
                                    <Users size={14} /> Invite friends to unlock better prices!
                                </p>
                            </div>
                        )}

                        <div className="rounded-xl border border-white/70 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">
                                Listing Summary
                            </p>
                            <div className="mt-5 space-y-4">
                                <SummaryRow label="Location" value={property.location || 'Not specified'} />
                                <SummaryRow label="Bedrooms" value={`${property.bedrooms || 0}`} />
                                <SummaryRow label="Price Share" value={formatCurrency((property.totalPrice || property.price) / requiredSize) + " / buyer"} />
                                <SummaryRow label="Created" value={formatDate(property.createdAt)} />
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {property && (
                <PaymentModal 
                    isOpen={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                    item={property}
                    type="property"
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
};

const MetricCard = ({ label, value, icon }) => {
    return (
        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-5">
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
        <div className="rounded-xl bg-bg-light/70 p-4">
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
