import PropertyForm from '../../components/properties/PropertyForm';

const DashboardAddProperty = () => {
    return (
        <div className="space-y-6">
            <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Add Property</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-secondary">Create a new seller listing</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
                    Publish a property directly from your dashboard. The listing will be attached to your authenticated account automatically.
                </p>
            </section>

            <PropertyForm
                variant="dashboard"
                cancelPath="/dashboard/properties"
                successMessage="Property created and added to your dashboard."
                successRedirectPath="/dashboard/properties"
            />
        </div>
    );
};

export default DashboardAddProperty;
