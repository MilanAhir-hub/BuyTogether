import { useParams, Link } from 'react-router-dom';
import PropertyForm from '../../components/properties/PropertyForm';

const EditProperty = () => {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#fff7f2_0%,#ffffff_38%,#fffaf7_100%)] px-6 py-12 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">Manage Listing</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-secondary">
                            Refine your property details.
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
                            Update your listing information, pricing, or group discounts below. Changes will be reflected immediately in the marketplace.
                        </p>
                    </div>

                    <Link
                        to="/seller"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-secondary transition hover:border-secondary hover:bg-secondary hover:text-white"
                    >
                        Back to Dashboard
                    </Link>
                </div>

                <PropertyForm
                    propertyId={id}
                    variant="dashboard"
                    cancelPath="/seller"
                    successRedirectPath={() => `/seller`}
                />
            </div>
        </div>
    );
};

export default EditProperty;
