import { useMemo, useState } from 'react';
import {
    LayoutDashboard,
    Search,
    ShoppingBag,
    UserCircle,
    LogOut,
    Menu,
    X,
    ArrowLeft
} from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
    {
        label: 'Dashboard',
        description: 'Overview & savings',
        path: '/buyer',
        end: true,
        icon: LayoutDashboard,
    },
    {
        label: 'Browse Properties',
        description: 'Find group deals',
        path: '/buyer/properties',
        icon: Search,
    },
    {
        label: 'My Activity',
        description: 'Joined deals',
        path: '/buyer/activity',
        icon: ShoppingBag,
    },
    {
        label: 'Profile',
        description: 'Manage settings',
        path: '/buyer/profile',
        icon: UserCircle,
    },
];

const BuyerLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const activeItem = useMemo(() => {
        return navItems.find((item) => {
            if (item.end) {
                return location.pathname === item.path || location.pathname === '/buyer/dashboard';
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
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
            {/* Mobile Sidebar Backdrop */}
            <div
                className={`fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm transition-opacity lg:hidden ${
                    isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
                onClick={handleCloseSidebar}
            />

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand / Logo */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
                    <Link to="/" className="flex items-center gap-3">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Buyer Portal</p>
                            <h1 className="text-xl font-bold tracking-tight text-secondary">Together<span className="text-primary">Buy</span></h1>
                        </div>
                    </Link>

                    <button
                        onClick={handleCloseSidebar}
                        className="flex h-8 w-8 items-center justify-center rounded-none bg-slate-100 text-slate-600 lg:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* User Info */}
                <div className="px-6 py-6 border-b border-slate-100">
                    <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-none bg-primary/10 text-primary">
                            <UserCircle size={24} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Logged in as</p>
                            <p className="mt-1 truncate text-sm font-bold text-slate-800">
                                {user?.username || user?.email || 'Buyer Account'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end}
                                onClick={handleCloseSidebar}
                                className={({ isActive }) =>
                                    `group flex items-center gap-3 rounded-none px-4 py-3.5 transition-all ${
                                        isActive
                                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-none transition-all ${
                                                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-white'
                                            }`}
                                        >
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <p className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-700'}`}>{item.label}</p>
                                            <p className={`text-[11px] ${isActive ? 'text-white/80' : 'text-slate-400'}`}>{item.description}</p>
                                        </div>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Footer Actions */}
                <div className="p-4 border-t border-slate-100 space-y-2">
                    <Link
                        to="/properties"
                        className="flex items-center justify-center gap-2 rounded-none bg-slate-50 border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        <ArrowLeft size={16} />
                        Exit to Marketplace
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-2 rounded-none bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 lg:pl-[280px] flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="sticky top-0 z-20 flex h-16 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="flex h-10 w-10 items-center justify-center rounded-none border border-slate-200 text-slate-600"
                    >
                        <Menu size={20} />
                    </button>
                    <h2 className="ml-4 text-lg font-bold text-slate-800">{activeItem.label}</h2>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default BuyerLayout;
