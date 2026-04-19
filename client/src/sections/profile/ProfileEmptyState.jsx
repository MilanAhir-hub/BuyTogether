const ProfileEmptyState = ({ title, description }) => {
    return (
        <div className="rounded-xl border border-dashed border-primary/20 bg-bg-light/70 p-6 text-left">
            <p className="text-base font-semibold text-secondary">{title}</p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p>
        </div>
    );
};

export default ProfileEmptyState;
