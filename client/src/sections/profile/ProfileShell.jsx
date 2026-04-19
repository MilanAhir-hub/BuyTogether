import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, PencilLine, UserRound } from 'lucide-react';

const ProfileShell = ({ title, description, children, showEdit = false }) => {
    const location = useLocation();

    return (
        <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(242,106,61,0.14),transparent_30%),linear-gradient(180deg,#fff7f3_0%,#ffffff_42%,#fff5ef_100%)] px-4 pb-16 pt-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <div className="rounded-xl border border-white/70 bg-white/80 p-6 shadow-[0_30px_90px_rgba(215,59,11,0.08)] backdrop-blur xl:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-4">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                            >
                                <ArrowLeft size={16} />
                                Back to home
                            </Link>

                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 rounded-xl bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white">
                                    <UserRound size={14} />
                                    Profile space
                                </div>
                                <h1 className="text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
                                    {title}
                                </h1>
                                <p className="max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {showEdit && location.pathname === '/profile' && (
                            <Link
                                to="/profile/edit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dark"
                            >
                                <PencilLine size={16} />
                                Edit profile
                            </Link>
                        )}
                    </div>
                </div>

                {children}
            </div>
        </section>
    );
};

export default ProfileShell;
