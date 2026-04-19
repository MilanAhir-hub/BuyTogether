import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getCookie, setCookie } from '../../utils/cookie';
import {
    BadgePercent,
    Building2,
    CalendarDays,
    ClipboardList,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    Sparkles,
    Users,
    WalletCards,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/userService';
import ProfileEmptyState from '../../sections/profile/ProfileEmptyState';
import ProfileShell from '../../sections/profile/ProfileShell';
import ProfileStatCard from '../../sections/profile/ProfileStatCard';
import {
    formatCompactDate,
    formatCurrency,
    formatMonthYear,
    getInitials,
    getStatusClasses,
    relativeTimeFromNow,
} from '../../sections/profile/profileFormatters';

const Profile = ({ isDashboard = false }) => {
    const { data: userProfile, isLoading, isError, error } = useQuery({
        queryKey: ['userProfile'],
        queryFn: userService.getProfile,
    });

    const queryClient = useQueryClient();

    const becomeSellerMutation = useMutation({
        mutationFn: userService.becomeSeller,
        onSuccess: (response) => {
            if (response.success && (response.data?.token || response.data?.Token)) {
                const newToken = response.data.token || response.data.Token;
                // Save new token with consistent options via utility
                setCookie('token', newToken);
                toast.success('Congratulations! You are now a Seller.');
                // Hard refresh to update auth state and redirect properly
                window.location.href = '/seller';
            }
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to upgrade account');
        }
    });

    const handleBecomeSeller = () => {
        if (window.confirm('Do you want to upgrade your account to Seller? This will allow you to list and manage properties.')) {
            becomeSellerMutation.mutate();
        }
    };

    if (isLoading) {
        return (
            <ProfileShell
                title="Your TogetherBuy profile"
                description="Loading your account details, buying preferences, and live collaboration activity."
            >
                <div className="flex min-h-[40vh] items-center justify-center rounded-xl border border-white/70 bg-white/80">
                    <div className="h-14 w-14 animate-spin rounded-xl border-4 border-primary/20 border-t-primary" />
                </div>
            </ProfileShell>
        );
    }

    if (isError) {
        return (
            <ProfileShell
                title="Your TogetherBuy profile"
                description="We could not load your profile details right now."
            >
                <div className="rounded-xl border border-red-100 bg-white p-8 shadow-sm">
                    <p className="text-lg font-semibold text-secondary">Profile unavailable</p>
                    <p className="mt-2 text-sm text-text-secondary">
                        {error?.response?.data?.message || 'Something went wrong while loading your profile.'}
                    </p>
                    <Link
                        to="/profile/edit"
                        className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                    >
                        Open edit page
                    </Link>
                </div>
            </ProfileShell>
        );
    }

    const stats = [
        {
            label: 'Groups joined',
            value: userProfile?.stats?.groupsJoinedCount ?? 0,
            helper: 'Live group memberships tied to your account',
            icon: <Users size={22} />,
        },
        {
            label: 'Groups created',
            value: userProfile?.stats?.groupsCreatedCount ?? 0,
            helper: 'Buying groups you started yourself',
            icon: <Sparkles size={22} />,
        },
        {
            label: 'Confirmed bookings',
            value: userProfile?.stats?.confirmedBookingsCount ?? 0,
            helper: 'Bookings confirmed through group buying',
            icon: <ClipboardList size={22} />,
        },
        {
            label: 'Total savings',
            value: formatCurrency(userProfile?.stats?.totalSavingsAmount ?? 0),
            helper: 'Discount value recorded on your bookings',
            icon: <BadgePercent size={22} />,
        },
    ];

    const displayName = userProfile?.fullName || userProfile?.username || 'TogetherBuy User';
    const budgetRange = userProfile?.preferredBudgetMin || userProfile?.preferredBudgetMax
        ? `${formatCurrency(userProfile?.preferredBudgetMin ?? 0)} to ${formatCurrency(userProfile?.preferredBudgetMax ?? 0)}`
        : 'Budget range not set yet';

    const profileContent = (
        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
            <aside className="space-y-6">
                <article className="overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                    <div className="relative overflow-hidden bg-[linear-gradient(135deg,#d73b0b_0%,#f26a3d_60%,#ffb26b_100%)] px-6 pb-8 pt-7 text-white">
                        <div className="absolute right-0 top-0 h-36 w-36 rounded-xl bg-white/10 blur-3xl" />
                        <div className="relative flex items-center gap-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-2xl font-semibold backdrop-blur">
                                {getInitials(displayName)}
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                                    TogetherBuy member
                                </p>
                                <h2 className="mt-2 truncate text-2xl font-semibold">{displayName}</h2>
                                <p className="truncate text-sm text-white/80">@{userProfile?.username}</p>
                            </div>
                        </div>

                        <div className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-white/15 px-3 py-1.5 text-sm font-medium">
                            <ShieldCheck size={16} />
                            {userProfile?.role || 'User'}
                        </div>
                    </div>

                    <div className="space-y-4 p-6">
                        <div className="grid gap-3">
                            <DetailRow icon={<Mail size={16} />} label="Email" value={userProfile?.email || 'Not added'} />
                            <DetailRow icon={<Phone size={16} />} label="Phone" value={userProfile?.phoneNumber || 'Add your phone number'} />
                            <DetailRow icon={<MapPin size={16} />} label="City" value={userProfile?.city || 'Add your city'} />
                            <DetailRow
                                icon={<CalendarDays size={16} />}
                                label="Joined"
                                value={formatMonthYear(userProfile?.createdAt)}
                            />
                        </div>

                        <div className="rounded-xl bg-bg-light p-5">
                            <div className="flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-text-secondary">Profile completion</p>
                                    <p className="mt-1 text-3xl font-semibold text-secondary">
                                        {userProfile?.stats?.profileCompletionPercentage ?? 0}%
                                    </p>
                                </div>
                                <Link
                                    to="/profile/edit"
                                    className="rounded-xl border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
                                >
                                    Complete profile
                                </Link>
                            </div>
                            <div className="mt-4 h-3 overflow-hidden rounded-xl bg-white">
                                <div
                                    className="h-full rounded-xl bg-[linear-gradient(90deg,#d73b0b_0%,#f26a3d_100%)]"
                                    style={{ width: `${userProfile?.stats?.profileCompletionPercentage ?? 0}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </article>

                <article className="rounded-xl border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)]">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <WalletCards size={22} />
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-secondary">Buying preferences</p>
                            <p className="text-sm text-text-secondary">Real settings saved on your account</p>
                        </div>
                    </div>

                    <div className="mt-5 space-y-4">
                        <PreferenceRow label="Preferred location" value={userProfile?.preferredLocation || 'Not set yet'} />
                        <PreferenceRow label="Budget range" value={budgetRange} />
                        <PreferenceRow
                            label="Ideal group size"
                            value={userProfile?.targetGroupSize ? `${userProfile.targetGroupSize} buyers` : 'Not set yet'}
                        />
                        <PreferenceRow
                            label="Properties owned"
                            value={`${userProfile?.stats?.propertiesOwnedCount ?? 0} linked properties`}
                        />
                    </div>
                </article>
            </aside>

            <div className="space-y-6">
                <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
                    {stats.map((stat) => (
                        <ProfileStatCard
                            key={stat.label}
                            label={stat.label}
                            value={stat.value}
                            helper={stat.helper}
                            icon={stat.icon}
                        />
                    ))}
                </section>

                {/* Become a Seller CTA */}
                {(userProfile?.role === 'User' || userProfile?.role === 'Buyer') && (
                    <section className="rounded-xl border border-primary/20 bg-[linear-gradient(135deg,#fffbf8_0%,#fff5f0_100%)] p-8 shadow-sm">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-secondary">Start Selling on TogetherBuy</h3>
                                <p className="text-text-secondary max-w-xl">
                                    Upgrade your account to list your own properties and start building group deals today.
                                </p>
                            </div>
                            <button
                                onClick={handleBecomeSeller}
                                disabled={becomeSellerMutation.isPending}
                                className="whitespace-nowrap rounded-xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/20 transition hover:bg-primary-dark disabled:opacity-50"
                            >
                                {becomeSellerMutation.isPending ? 'Upgrading...' : 'Become a Seller'}
                            </button>
                        </div>
                    </section>
                )}

                <section className="grid gap-6 2xl:grid-cols-[1.15fr_0.85fr]">
                    <article className="rounded-xl border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)]">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-lg font-semibold text-secondary">About you</p>
                                <p className="text-sm text-text-secondary">Personal details used across your profile</p>
                            </div>
                            <Link
                                to="/profile/edit"
                                className="rounded-xl border border-primary/15 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                            >
                                Update
                            </Link>
                        </div>

                        <p className="rounded-xl bg-bg-light/70 p-5 text-sm leading-7 text-text-secondary">
                            {userProfile?.bio || 'Tell other buyers about your buying goals, location preference, and the kind of co-buying experience you want.'}
                        </p>
                    </article>

                    <article className="rounded-xl border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)]">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                                <Building2 size={22} />
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-secondary">Account snapshot</p>
                                <p className="text-sm text-text-secondary">Core identity data from the backend</p>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <SnapshotTile label="Username" value={`@${userProfile?.username || 'user'}`} />
                            <SnapshotTile label="Role" value={userProfile?.role || 'User'} />
                            <SnapshotTile label="Last update" value={formatCompactDate(userProfile?.updatedAt || userProfile?.createdAt)} />
                            <SnapshotTile label="Member since" value={formatCompactDate(userProfile?.createdAt)} />
                        </div>
                    </article>
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                    <article className="rounded-xl border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)]">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-lg font-semibold text-secondary">Active groups</p>
                                <p className="text-sm text-text-secondary">Groups you are currently part of</p>
                            </div>
                            <span className="rounded-xl bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                                {userProfile?.activeGroups?.length ?? 0} shown
                            </span>
                        </div>

                        {userProfile?.activeGroups?.length ? (
                            <div className="space-y-4">
                                {userProfile.activeGroups.map((group) => (
                                    <div key={group.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-base font-semibold text-secondary">{group.propertyTitle}</p>
                                                <p className="mt-1 text-sm text-text-secondary">
                                                    {group.propertyCity} · {group.propertyLocation}
                                                </p>
                                            </div>
                                            <span className={`rounded-xl px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${getStatusClasses(group.groupStatus)}`}>
                                                {group.groupStatus}
                                            </span>
                                        </div>

                                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                            <MiniMetric label="Your role" value={group.memberRole} />
                                            <MiniMetric label="Group size" value={`${group.currentMembers}/${group.maxMembers}`} />
                                            <MiniMetric label="Est. discount" value={formatCurrency(group.estimatedDiscountAmount)} />
                                        </div>

                                        <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
                                            Joined {formatCompactDate(group.joinedAt)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <ProfileEmptyState
                                title="No group activity yet"
                                description="When you join or create a co-buying group, it will appear here with live member counts and projected discounts."
                            />
                        )}
                    </article>

                    <article className="rounded-xl border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)]">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-lg font-semibold text-secondary">Recent bookings</p>
                                <p className="text-sm text-text-secondary">Bookings linked to your buying groups</p>
                            </div>
                            <span className="rounded-xl bg-secondary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                                {userProfile?.recentBookings?.length ?? 0} shown
                            </span>
                        </div>

                        {userProfile?.recentBookings?.length ? (
                            <div className="space-y-4">
                                {userProfile.recentBookings.map((booking) => (
                                    <div key={booking.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-base font-semibold text-secondary">{booking.propertyTitle}</p>
                                                <p className="mt-1 text-sm text-text-secondary">{booking.propertyLocation}</p>
                                            </div>
                                            <span className={`rounded-xl px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${getStatusClasses(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                            <MiniMetric label="Total amount" value={formatCurrency(booking.totalAmount)} />
                                            <MiniMetric label="Discount" value={formatCurrency(booking.discountApplied)} />
                                            <MiniMetric label="Final amount" value={formatCurrency(booking.finalAmount)} />
                                        </div>

                                        <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
                                            Booked {formatCompactDate(booking.bookingDate)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <ProfileEmptyState
                                title="No bookings yet"
                                description="Confirmed or pending bookings will show here once your group moves forward with a property."
                            />
                        )}
                    </article>
                </section>

                <article className="rounded-xl border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)]">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-lg font-semibold text-secondary">Recent activity</p>
                            <p className="text-sm text-text-secondary">Timeline of real changes tied to your account</p>
                        </div>
                    </div>

                    {userProfile?.recentActivities?.length ? (
                        <div className="space-y-4">
                            {userProfile.recentActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-5 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            {activity.type === 'booking' ? <ClipboardList size={22} /> : <Users size={22} />}
                                        </div>
                                        <div>
                                            <p className="text-base font-semibold text-secondary">{activity.title}</p>
                                            <p className="mt-1 text-sm text-text-secondary">{activity.subtitle}</p>
                                            <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
                                                {relativeTimeFromNow(activity.occurredAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-left sm:text-right">
                                        <p className="text-base font-semibold text-secondary">
                                            {activity.amount !== null && activity.amount !== undefined
                                                ? formatCurrency(activity.amount)
                                                : 'No amount'}
                                        </p>
                                        <span className={`mt-2 inline-flex rounded-xl px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${getStatusClasses(activity.status)}`}>
                                            {activity.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <ProfileEmptyState
                            title="Your activity feed is still empty"
                            description="As soon as you join groups or book properties through TogetherBuy, the timeline will start filling with actual events."
                        />
                    )}
                </article>
            </div>
        </div>
    );

    if (isDashboard) return profileContent;

    return (
        <ProfileShell
            title="Your TogetherBuy profile"
            description="A live view of your account, co-buying preferences, and participation across the platform."
            showEdit
        >
            {profileContent}
        </ProfileShell>
    );
};

const DetailRow = ({ icon, label, value }) => {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">{label}</p>
                <p className="mt-1 wrap-break-word text-sm font-medium text-secondary">{value}</p>
            </div>
        </div>
    );
};

const PreferenceRow = ({ label, value }) => {
    return (
        <div className="rounded-xl border border-white bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">{label}</p>
            <p className="mt-2 text-sm font-medium text-secondary">{value}</p>
        </div>
    );
};

const SnapshotTile = ({ label, value }) => {
    return (
        <div className="rounded-xl bg-bg-light/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">{label}</p>
            <p className="mt-2 text-sm font-medium text-secondary">{value}</p>
        </div>
    );
};

const MiniMetric = ({ label, value }) => {
    return (
        <div className="rounded-xl bg-white p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary">{label}</p>
            <p className="mt-2 text-sm font-medium text-secondary">{value}</p>
        </div>
    );
};

export default Profile;
