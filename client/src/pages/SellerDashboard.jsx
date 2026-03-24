import { useMemo, useState } from 'react';
import {
    Building2,
    LayoutDashboard,
    LogOut,
    Menu,
    PlusSquare,
    ShieldCheck,
    X,
} from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const navItems = [
    {
        label: 'Dashboard',
        description: 'Overview and activity',
        path: '/dashboard',
        end: true,
        icon: LayoutDashboard,
    },
    {
        label: 'My Properties',
        description: 'Your active listings',
        path: '/dashboard/properties',
        icon: Building2,
    },
    {
        label: 'Add Property',
        description: 'Create a new listing',
        path: '/dashboard/add-property',
        icon: PlusSquare,
    },
];

const SellerDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const activeItem = useMemo(() => {
        return navItems.find((item) => {
            if (item.end) {
                return location.pathname === item.path;
            }

            return location.pathname.startsWith(item.path);
        }) ?? navItems[0];
    }, [location.pathname]);

    const handleLogout = async () => {
        await logout();
        setIsSidebarOpen(false);
        navigate('/');
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <div
                className={`fixed inset-0 z-30 bg-slate-950/45 transition-opacity lg:hidden ${
                    isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
                onClick={handleCloseSidebar}
            />

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-[290px] flex-col border-r border-white/10 bg-[linear-gradient(180deg,#d73b0b_0%,#a82e08_55%,#8b2606_100%)] px-5 py-5 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-white shadow-lg shadow-indigo-950/40">
                            <Building2 size={22} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-200/80">
                                Seller Space
                            </p>
                            <h1 className="text-xl font-semibold">TogetherBuy</h1>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleCloseSidebar}
                        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 lg:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mt-8 rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur">
                    <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-orange-50">
                            <ShieldCheck size={22} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Logged in as</p>
                            <p className="mt-2 truncate text-base font-semibold text-white">
                                {user?.username || user?.email || 'Seller'}
                            </p>
                            <p className="mt-1 truncate text-sm text-slate-300">{user?.email || 'Authenticated account'}</p>
                        </div>
                    </div>
                </div>

                <nav className="mt-8 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end}
                                onClick={handleCloseSidebar}
                                className={({ isActive }) =>
                                    `group flex items-center gap-3 rounded-[24px] px-4 py-4 transition ${
                                        isActive
                                            ? 'bg-white text-primary shadow-[0_18px_50px_rgba(168,46,8,0.35)]'
                                            : 'text-orange-50 hover:bg-white/10 hover:text-white'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-2xl transition ${
                                                isActive ? 'bg-bg-light text-primary' : 'bg-white/10 text-orange-50 group-hover:bg-white/12'
                                            }`}
                                        >
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <p className={`text-sm font-semibold ${isActive ? 'text-primary' : 'text-white'}`}>{item.label}</p>
                                            <p className={`text-xs ${isActive ? 'text-primary/70' : 'text-orange-100/70'}`}>{item.description}</p>
                                        </div>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-auto flex items-center justify-center gap-3 rounded-[24px] border border-white/10 bg-white/6 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/20 hover:text-white"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </aside>

            <div className="lg:pl-[290px]">
                <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-100/90 backdrop-blur">
                    <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setIsSidebarOpen(true)}
                                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 lg:hidden"
                            >
                                <Menu size={20} />
                            </button>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Seller dashboard</p>
                                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{activeItem.label}</h2>
                            </div>
                        </div>

                        <div className="hidden rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-sm sm:block">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Workspace</p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">Manage your listings securely</p>
                        </div>
                    </div>
                </header>

                <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SellerDashboard;
