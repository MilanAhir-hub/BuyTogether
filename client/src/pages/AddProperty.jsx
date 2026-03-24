import { Link } from 'react-router-dom';
import PropertyForm from '../components/properties/PropertyForm';

const AddProperty = () => {
    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#fff7f2_0%,#ffffff_38%,#fffaf7_100%)] px-6 py-12 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">New Property</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-secondary">
                            Add a fresh listing to the marketplace.
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
                            Fill in the listing details below. The authenticated user will automatically become the owner of this property.
                        </p>
                    </div>

                    <Link
                        to="/properties"
                        className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
                    >
                        Back to listings
                    </Link>
                </div>

                <PropertyForm
                    cancelPath="/properties"
                    successRedirectPath={(createdProperty) => `/properties/${createdProperty.id}`}
                />
            </div>
        </div>
    );
};

export default AddProperty;
