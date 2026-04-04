import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImagePlus, MapPin, PencilLine } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';

const FORM_VARIANTS = {
    default: {
        formCard: 'rounded-[38px] border border-white/70 bg-white p-7 shadow-[0_28px_90px_rgba(15,23,42,0.08)] sm:p-8',
        infoCard: 'rounded-[36px] border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]',
        listTile: 'rounded-[22px] bg-bg-light/70 px-4 py-3',
        input: 'mt-2 w-full rounded-[24px] border border-slate-200 px-4 py-3 text-sm text-secondary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10',
        submitButton: 'inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70',
        cancelButton: 'inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-secondary transition hover:border-secondary hover:bg-secondary hover:text-white',
        iconWrap: 'flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10',
        iconText: 'text-primary',
        titleText: 'text-secondary',
        bodyText: 'text-text-secondary',
        previewBg: 'flex h-48 items-center justify-center bg-[linear-gradient(135deg,#f7d9cf_0%,#fff4ef_50%,#eef3ff_100%)]',
        previewIcon: 'rounded-[24px] border border-white/70 bg-white/75 p-5 text-primary/75 shadow-sm',
        priceText: 'text-primary',
        headingText: 'text-secondary',
        supportingText: 'text-text-secondary',
    },
    dashboard: {
        formCard: 'rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8',
        infoCard: 'rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)]',
        listTile: 'rounded-[20px] bg-bg-light px-4 py-3',
        input: 'mt-2 w-full rounded-[24px] border border-slate-200 px-4 py-3 text-sm text-secondary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10',
        submitButton: 'inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70',
        cancelButton: 'inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-secondary transition hover:border-secondary hover:bg-secondary hover:text-white',
        iconWrap: 'flex h-12 w-12 items-center justify-center rounded-2xl bg-bg-light',
        iconText: 'text-primary',
        titleText: 'text-secondary',
        bodyText: 'text-text-secondary',
        previewBg: 'flex h-48 items-center justify-center bg-[linear-gradient(135deg,#f7d9cf_0%,#fff4ef_50%,#eef3ff_100%)]',
        previewIcon: 'rounded-[24px] border border-white/70 bg-white/80 p-5 text-primary shadow-sm',
        priceText: 'text-primary',
        headingText: 'text-secondary',
        supportingText: 'text-text-secondary',
    },
};

const DEFAULT_FORM_DATA = {
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    imageUrl: '',
    discountTiers: [],
};

const PropertyForm = ({
    variant = 'default',
    cancelPath = '/properties',
    cancelLabel = 'Cancel',
    submitLabel = 'Create Property',
    pendingLabel = 'Creating property...',
    successMessage = 'Property created successfully.',
    successRedirectPath,
}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
    const styles = FORM_VARIANTS[variant] ?? FORM_VARIANTS.default;

    const createPropertyMutation = useMutation({
        mutationFn: propertyService.create,
        onSuccess: async (createdProperty) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['properties'] }),
                queryClient.invalidateQueries({ queryKey: ['my-properties'] }),
            ]);

            toast.success(successMessage);

            const nextPath = typeof successRedirectPath === 'function'
                ? successRedirectPath(createdProperty)
                : successRedirectPath || `/properties/${createdProperty.id}`;

            navigate(nextPath);
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        createPropertyMutation.mutate({
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            price: Number(formData.price),
            location: formData.location.trim() || null,
            bedrooms: Number(formData.bedrooms || 0),
            imageUrl: formData.imageUrl.trim() || null,
            discountTiers: formData.discountTiers.map(tier => ({
                minBuyers: Number(tier.minBuyers),
                discountPercentage: Number(tier.discountPercentage)
            })),
        });
    };

    const handleAddTier = () => {
        setFormData(current => ({
            ...current,
            discountTiers: [...current.discountTiers, { minBuyers: '', discountPercentage: '' }]
        }));
    };

    const handleRemoveTier = (index) => {
        setFormData(current => ({
            ...current,
            discountTiers: current.discountTiers.filter((_, i) => i !== index)
        }));
    };

    const handleTierChange = (index, field, value) => {
        setFormData(current => ({
            ...current,
            discountTiers: current.discountTiers.map((tier, i) => 
                i === index ? { ...tier, [field]: value } : tier
            )
        }));
    };

    return (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
            <form onSubmit={handleSubmit} className={styles.formCard}>
                <div className="grid gap-6 md:grid-cols-2">
                    <InputBlock
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Skyline Residency"
                        labelClassName={styles.headingText}
                        className={styles.input}
                        required
                    />
                    <InputBlock
                        label="Price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="12500000"
                        min="0.01"
                        step="0.01"
                        labelClassName={styles.headingText}
                        className={styles.input}
                        required
                    />
                </div>

                <div className="mt-6">
                    <TextAreaBlock
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Add a concise overview of the property, amenities, and what makes it attractive for group buying."
                        labelClassName={styles.headingText}
                        className={styles.input}
                    />
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <InputBlock
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Gachibowli, Hyderabad"
                        labelClassName={styles.headingText}
                        className={styles.input}
                    />
                    <InputBlock
                        label="Bedrooms"
                        name="bedrooms"
                        type="number"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        placeholder="3"
                        min="0"
                        step="1"
                        labelClassName={styles.headingText}
                        className={styles.input}
                    />
                </div>

                <div className="mt-6">
                    <InputBlock
                        label="Image URL"
                        name="imageUrl"
                        type="url"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://images.example.com/property.jpg"
                        labelClassName={styles.headingText}
                        className={styles.input}
                    />
                </div>

                {/* Discount Strategy Section */}
                <div className="mt-10 border-t border-slate-100 pt-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className={`text-lg font-bold ${styles.headingText}`}>Discount Strategy</h3>
                            <p className={`text-xs ${styles.supportingText}`}>Define bulk discounts based on group size.</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleAddTier}
                            className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-xl text-xs font-bold hover:bg-primary/10 transition-colors"
                        >
                            <span>Add Tier</span>
                            <span className="text-lg">+</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {formData.discountTiers.length === 0 ? (
                            <div className="p-8 border border-dashed border-slate-200 rounded-[24px] text-center">
                                <p className="text-sm text-slate-400 italic">No discount tiers added yet. Individual pricing will be applied.</p>
                            </div>
                        ) : (
                            formData.discountTiers.map((tier, index) => (
                                <div key={index} className="flex gap-4 items-end animate-in fade-in slide-in-from-top-1 duration-300">
                                    <div className="flex-1">
                                        <InputBlock
                                            label="Min. Buyers"
                                            value={tier.minBuyers}
                                            onChange={(e) => handleTierChange(index, 'minBuyers', e.target.value)}
                                            placeholder="e.g. 2"
                                            type="number"
                                            min="1"
                                            labelClassName={styles.headingText}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <InputBlock
                                            label="Discount (%)"
                                            value={tier.discountPercentage}
                                            onChange={(e) => handleTierChange(index, 'discountPercentage', e.target.value)}
                                            placeholder="e.g. 5"
                                            type="number"
                                            min="0"
                                            max="100"
                                            step="0.1"
                                            labelClassName={styles.headingText}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTier(index)}
                                        className="h-[46px] w-[46px] flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all mb-[1px]"
                                        title="Remove tier"
                                    >
                                        <span className="text-xl">×</span>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {createPropertyMutation.isError ? (
                    <div className="mt-6 rounded-[24px] border border-red-100 bg-red-50/70 px-4 py-3 text-sm text-red-600">
                        {getErrorMessage(createPropertyMutation.error)}
                    </div>
                ) : null}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="submit"
                        disabled={createPropertyMutation.isPending}
                        className={styles.submitButton}
                    >
                        {createPropertyMutation.isPending ? pendingLabel : submitLabel}
                    </button>
                    <Link
                        to={cancelPath}
                        className={styles.cancelButton}
                    >
                        {cancelLabel}
                    </Link>
                </div>
            </form>

            <aside className="space-y-6">
                <PreviewCard
                    icon={<PencilLine size={22} />}
                    title="Listing preview"
                    description="A quick look at how your property will be presented once it is published."
                    className={styles.infoCard}
                    iconWrapClassName={styles.iconWrap}
                    iconClassName={styles.iconText}
                    headingClassName={styles.headingText}
                    descriptionClassName={styles.supportingText}
                >
                    <div className="overflow-hidden rounded-[30px] border border-slate-100 bg-white">
                        <div className={styles.previewBg}>
                            {formData.imageUrl ? (
                                <img
                                    src={formData.imageUrl}
                                    alt="Property preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className={styles.previewIcon}>
                                    <ImagePlus size={40} />
                                </div>
                            )}
                        </div>

                        <div className="p-5">
                            <h2 className={`text-xl font-semibold ${styles.titleText}`}>
                                {formData.title || 'Your property title'}
                            </h2>
                            <p className={`mt-2 text-sm ${styles.bodyText}`}>
                                {formData.location || 'Property location will appear here'}
                            </p>
                            <p className={`mt-4 text-lg font-semibold ${styles.priceText}`}>
                                {formData.price ? formatCurrency(Number(formData.price)) : 'Add a price'}
                            </p>
                            <p className={`mt-4 text-sm leading-6 ${styles.bodyText}`}>
                                {formData.description || 'A short description will help buyers understand the opportunity faster.'}
                            </p>
                        </div>
                    </div>
                </PreviewCard>

                <PreviewCard
                    icon={<MapPin size={22} />}
                    title="What happens next"
                    description="After saving, your listing is stored under your authenticated seller account."
                    className={styles.infoCard}
                    iconWrapClassName={styles.iconWrap}
                    iconClassName={styles.iconText}
                    headingClassName={styles.headingText}
                    descriptionClassName={styles.supportingText}
                >
                    <ul className={`space-y-3 text-sm leading-6 ${styles.supportingText}`}>
                        <li className={styles.listTile}>The property is linked to your account automatically.</li>
                        <li className={styles.listTile}>Your seller dashboard refreshes with the new listing.</li>
                        <li className={styles.listTile}>You can manage or delete the listing later from My Properties.</li>
                    </ul>
                </PreviewCard>
            </aside>
        </div>
    );
};

const InputBlock = ({ label, labelClassName, className, ...props }) => {
    return (
        <label className="block">
            <span className={`text-sm font-semibold ${labelClassName}`}>{label}</span>
            <input
                {...props}
                className={className}
            />
        </label>
    );
};

const TextAreaBlock = ({ label, labelClassName, className, ...props }) => {
    return (
        <label className="block">
            <span className={`text-sm font-semibold ${labelClassName}`}>{label}</span>
            <textarea
                {...props}
                rows={6}
                className={className}
            />
        </label>
    );
};

const PreviewCard = ({
    icon,
    title,
    description,
    children,
    className,
    iconWrapClassName,
    iconClassName,
    headingClassName,
    descriptionClassName,
}) => {
    return (
        <section className={className}>
            <div className={`flex items-center gap-3 ${iconClassName}`}>
                <div className={iconWrapClassName}>
                    {icon}
                </div>
                <div>
                    <h2 className={`text-lg font-semibold ${headingClassName}`}>{title}</h2>
                    <p className={`text-sm ${descriptionClassName}`}>{description}</p>
                </div>
            </div>
            <div className="mt-5">{children}</div>
        </section>
    );
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value ?? 0);
};

const getErrorMessage = (error) => {
    return error?.response?.data?.message || 'Unable to create property right now.';
};

export default PropertyForm;
