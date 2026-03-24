import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Users, MapPin } from 'lucide-react';
import { buyerService } from '../../services/buyerService';

const UserDashboardGroups = () => {
    const { data: groups, isLoading, isError } = useQuery({
        queryKey: ['my-groups'],
        queryFn: buyerService.getMyGroups,
    });

    if (isLoading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-[32px] border border-red-100 bg-white p-8 text-center text-red-600">
                Failed to load your groups. Please try again.
            </div>
        );
    }

    const hasGroups = groups && groups.length > 0;

    return (
        <div className="space-y-6">
            <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">My Groups</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Track your joined groups</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    Here are the property groups you have joined. Monitor their progress towards reaching the required buyer count.
                </p>
            </section>

            {!hasGroups ? (
                <section className="rounded-[32px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] bg-orange-50 text-primary">
                        <Users size={28} />
                    </div>
                    <h2 className="mt-6 text-2xl font-semibold text-slate-900">You haven’t joined any groups yet</h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                        Browse the available properties, open one that matches your needs, and use the Join Group action when you are ready.
                    </p>
                    <Link
                        to="/user-dashboard"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                    >
                        <Plus size={16} />
                        Browse Properties
                    </Link>
                </section>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {groups.map((group) => (
                        <div key={group.groupId} className="flex flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                            <div className="p-6">
                                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                                    <span className="relative flex h-2 w-2">
                                        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${group.groupStatus === 'Full' ? 'bg-green-400' : 'bg-orange-400'}`}></span>
                                        <span className={`relative inline-flex h-2 w-2 rounded-full ${group.groupStatus === 'Full' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                                    </span>
                                    {group.groupStatus}
                                </div>
                                <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">{group.propertyTitle}</h3>
                                <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                                    <MapPin size={14} className="text-primary" />
                                    {group.propertyLocation || 'Location not specified'}
                                </p>
                            </div>
                            <div className="mt-auto border-t border-slate-100 bg-slate-50/50 p-6">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-slate-600">Members</span>
                                    <span className="font-bold text-slate-900">{group.currentMembers} <span className="text-slate-400">/ {group.requiredGroupSize}</span></span>
                                </div>
                                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                                    <div 
                                        className="h-full bg-primary transition-all duration-1000" 
                                        style={{ width: `${Math.min((group.currentMembers / group.requiredGroupSize) * 100, 100)}%` }}
                                    ></div>
                                </div>
                                <Link
                                    to={`/user-dashboard/property/${group.propertyId}`}
                                    className="mt-6 flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
                                >
                                    View Property
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboardGroups;
