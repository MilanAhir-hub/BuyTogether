import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, BadgeCheck, MapPinned, Phone, Save, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import { userService } from '../../services/userService';
import ProfileShell from '../../sections/profile/ProfileShell';
import { formatCompactDate, formatMonthYear, getInitials } from '../../sections/profile/profileFormatters';

const defaultForm = {
    fullName: '',
    phoneNumber: '',
    city: '',
    bio: '',
    preferredLocation: '',
    preferredBudgetMin: '',
    preferredBudgetMax: '',
    targetGroupSize: '',
};

const EditProfile = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [draftValues, setDraftValues] = useState(null);

    const { data: userProfile, isLoading, isError, error } = useQuery({
        queryKey: ['userProfile'],
        queryFn: userService.getProfile,
    });

    const updateMutation = useMutation({
        mutationFn: userService.updateProfile,
        onSuccess: (updatedProfile) => {
            queryClient.setQueryData(['userProfile'], updatedProfile);
            toast.success('Profile updated successfully');
            navigate('/profile');
        },
        onError: (mutationError) => {
            toast.error(mutationError?.response?.data?.message || 'Unable to save profile changes');
        },
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDraftValues((currentValues) => ({
            ...(currentValues ?? mapProfileToForm(userProfile)),
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        updateMutation.mutate({
            fullName: sanitizeText(formValues.fullName),
            phoneNumber: sanitizeText(formValues.phoneNumber),
            city: sanitizeText(formValues.city),
            bio: sanitizeText(formValues.bio),
            preferredLocation: sanitizeText(formValues.preferredLocation),
            preferredBudgetMin: normalizeDecimal(formValues.preferredBudgetMin),
            preferredBudgetMax: normalizeDecimal(formValues.preferredBudgetMax),
            targetGroupSize: normalizeInteger(formValues.targetGroupSize),
        });
    };

    if (isLoading) {
        return (
            <ProfileShell
                title="Edit your profile"
                description="Loading the current account information so you can make accurate updates."
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
                title="Edit your profile"
                description="We could not load the current profile values."
            >
                <div className="rounded-xl border border-red-100 bg-white p-8 shadow-sm">
                    <p className="text-lg font-semibold text-secondary">Editor unavailable</p>
                    <p className="mt-2 text-sm text-text-secondary">
                        {error?.response?.data?.message || 'Something went wrong while opening the editor.'}
                    </p>
                </div>
            </ProfileShell>
        );
    }

    const displayName = userProfile?.fullName || userProfile?.username || 'TogetherBuy User';
    const formValues = draftValues ?? mapProfileToForm(userProfile);

    return (
        <ProfileShell
            title="Edit your profile"
            description="Keep your identity, location, and co-buying preferences updated so the platform reflects your actual profile."
        >
            <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
                <aside className="space-y-6">
                    <article className="overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                        <div className="bg-[linear-gradient(135deg,#1f2937_0%,#374151_48%,#f26a3d_100%)] px-6 pb-8 pt-7 text-white">
                            <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-2xl font-semibold backdrop-blur">
                                {getInitials(displayName)}
                            </div>
                            <h2 className="mt-5 text-2xl font-semibold">{displayName}</h2>
                            <p className="mt-2 text-sm text-white/80">{userProfile?.email}</p>

                            <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-sm font-medium">
                                <BadgeCheck size={16} />
                                Profile owner
                            </div>
                        </div>

                        <div className="space-y-4 p-6">
                            <EditorInfoRow label="Username" value={`@${userProfile?.username || 'user'}`} />
                            <EditorInfoRow label="Role" value={userProfile?.role || 'User'} />
                            <EditorInfoRow label="Joined" value={formatMonthYear(userProfile?.createdAt)} />
                            <EditorInfoRow label="Last updated" value={formatCompactDate(userProfile?.updatedAt || userProfile?.createdAt)} />
                        </div>
                    </article>

                    <article className="rounded-xl border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)]">
                        <p className="text-lg font-semibold text-secondary">What changes here?</p>
                        <p className="mt-3 text-sm leading-7 text-text-secondary">
                            These fields are saved on your account and are used to populate the profile overview with real information. Username and email stay read-only so authentication remains stable.
                        </p>
                    </article>
                </aside>

                <form onSubmit={handleSubmit} className="rounded-xl border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] sm:p-8">
                    <div className="grid gap-8">
                        <section className="grid gap-5 md:grid-cols-2">
                            <FormField
                                label="Full name"
                                name="fullName"
                                value={formValues.fullName}
                                onChange={handleChange}
                                placeholder="Your full name"
                                icon={<UserRound size={18} />}
                            />
                            <FormField
                                label="Phone number"
                                name="phoneNumber"
                                value={formValues.phoneNumber}
                                onChange={handleChange}
                                placeholder="Your contact number"
                                icon={<Phone size={18} />}
                            />
                            <FormField
                                label="City"
                                name="city"
                                value={formValues.city}
                                onChange={handleChange}
                                placeholder="Where do you live?"
                                icon={<MapPinned size={18} />}
                            />
                            <FormField
                                label="Preferred location"
                                name="preferredLocation"
                                value={formValues.preferredLocation}
                                onChange={handleChange}
                                placeholder="City or locality you want to buy in"
                                icon={<MapPinned size={18} />}
                            />
                            <FormField
                                label="Minimum budget"
                                name="preferredBudgetMin"
                                type="number"
                                min="0"
                                step="100000"
                                value={formValues.preferredBudgetMin}
                                onChange={handleChange}
                                placeholder="e.g. 2500000"
                            />
                            <FormField
                                label="Maximum budget"
                                name="preferredBudgetMax"
                                type="number"
                                min="0"
                                step="100000"
                                value={formValues.preferredBudgetMax}
                                onChange={handleChange}
                                placeholder="e.g. 5000000"
                            />
                            <FormField
                                label="Ideal group size"
                                name="targetGroupSize"
                                type="number"
                                min="2"
                                max="20"
                                step="1"
                                value={formValues.targetGroupSize}
                                onChange={handleChange}
                                placeholder="2 to 20 buyers"
                            />
                            <div className="rounded-xl border border-dashed border-primary/20 bg-bg-light/60 p-5">
                                <p className="text-sm font-semibold text-secondary">Read-only account fields</p>
                                <p className="mt-4 text-sm text-text-secondary">Username: @{userProfile?.username}</p>
                                <p className="mt-2 text-sm text-text-secondary">Email: {userProfile?.email}</p>
                            </div>
                        </section>

                        <section>
                            <label htmlFor="bio" className="text-sm font-semibold text-secondary">
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows={6}
                                value={formValues.bio}
                                onChange={handleChange}
                                placeholder="Tell buyers what kind of house, city, or co-buying arrangement you are looking for."
                                className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-secondary outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                            />
                        </section>

                        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <Link
                                to="/profile"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition hover:text-primary"
                            >
                                <ArrowLeft size={16} />
                                Back to profile
                            </Link>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/profile"
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-secondary transition hover:border-secondary hover:bg-secondary hover:text-white"
                                >
                                    Cancel
                                </Link>
                                <Button
                                    type="submit"
                                    className="w-auto gap-2 px-5"
                                    disabled={updateMutation.isPending}
                                >
                                    <Save size={16} />
                                    {updateMutation.isPending ? 'Saving...' : 'Save changes'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </ProfileShell>
    );
};

const FormField = ({ label, icon, ...props }) => {
    return (
        <label className="block">
            <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-secondary">
                {icon}
                {label}
            </span>
            <input
                {...props}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-secondary outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
        </label>
    );
};

const EditorInfoRow = ({ label, value }) => {
    return (
        <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">{label}</p>
            <p className="mt-2 text-sm font-medium text-secondary">{value}</p>
        </div>
    );
};

const mapProfileToForm = (userProfile) => {
    if (!userProfile) {
        return defaultForm;
    }

    return {
        fullName: userProfile.fullName === userProfile.username ? '' : userProfile.fullName || '',
        phoneNumber: userProfile.phoneNumber || '',
        city: userProfile.city || '',
        bio: userProfile.bio || '',
        preferredLocation: userProfile.preferredLocation || '',
        preferredBudgetMin: userProfile.preferredBudgetMin ?? '',
        preferredBudgetMax: userProfile.preferredBudgetMax ?? '',
        targetGroupSize: userProfile.targetGroupSize ?? '',
    };
};

const sanitizeText = (value) => {
    if (!value || !value.trim()) {
        return null;
    }

    return value.trim();
};

const normalizeDecimal = (value) => {
    if (value === '' || value === null || value === undefined) {
        return null;
    }

    return Number(value);
};

const normalizeInteger = (value) => {
    if (value === '' || value === null || value === undefined) {
        return null;
    }

    return parseInt(value, 10);
};

export default EditProfile;
