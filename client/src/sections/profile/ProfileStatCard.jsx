const ProfileStatCard = ({ label, value, helper, icon }) => {
    return (
        <article className="rounded-[28px] border border-white/70 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {icon}
            </div>
            <p className="text-3xl font-semibold tracking-tight text-secondary">{value}</p>
            <p className="mt-2 text-sm font-medium text-secondary">{label}</p>
            <p className="mt-1 text-sm text-text-secondary">{helper}</p>
        </article>
    );
};

export default ProfileStatCard;
