import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { UserIcon, Logout01Icon, Settings02Icon } from 'hugeicons-react';
import { LayoutDashboard, ShoppingBag, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import {
    getDashboardRouteByRole,
    getDashboardLabelByRole,
    getDashboardDescriptionByRole
} from '../../utils/dashboardRoutes';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const profileRef = useRef(null);
    const dashboardRoute = getDashboardRouteByRole(user?.role);
    const isSeller = user?.role === 'Seller' || user?.role === 'Admin';
    
    // Hide navbar logic moved to the bottom before return to avoid Hook Order Violation

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    // Navigation links configuration
    const navLinks = [
        { name: 'Home', path: '/', scrollId: 'hero' },
        { name: 'How it works', path: '/how-it-works', scrollId: 'how-it-works' },
        { name: 'Properties', path: '/properties', scrollId: 'properties' },
        { name: 'About us', path: '/', scrollId: 'about' },
        { name: 'Contact us', path: '/', scrollId: 'contact' }
    ];

    // Handle cross-page scrolling after navigation
    useEffect(() => {
        if (location.state?.scrollId) {
            const element = document.getElementById(location.state.scrollId);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const handleNavClick = (e, link) => {
        setIsMenuOpen(false);
        
        const isLandingPage = location.pathname === '/' || location.pathname === '/home';
        
        if (isLandingPage && link.scrollId) {
            const element = document.getElementById(link.scrollId);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (link.scrollId) {
            // If navigating from another page to home, pass the scrollId in state
            e.preventDefault();
            navigate(link.path, { state: { scrollId: link.scrollId } });
        }
    };

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
        setIsProfileOpen(false);
        navigate('/');
    };


    // Hide navbar on login and signup pages
    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null;
    }

    return (
        <>
            {/* Backdrop Overlay with Blur - sits above Navbar (z-40) */}
            <div 
                className={`fixed inset-0 z-48 bg-black/20 backdrop-blur-md transition-opacity duration-300 md:hidden ${
                    isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* Mobile Sidebar - Increased Width (w-80) */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl transition-transform duration-300 md:hidden ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="p-6 flex flex-col h-full relative">
                    {/* Cross Button - Positioned to match the hamburger menu's location */}
                    <div className="h-20 flex items-center mb-6">
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-all focus:outline-none"
                        >
                            <div className="w-6 h-0.5 bg-secondary rounded-none transition-all duration-300 rotate-45 translate-y-1"></div>
                            <div className="w-6 h-0.5 bg-secondary rounded-none transition-all duration-300 -rotate-45 -translate-y-1"></div>
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        {isAuthenticated && (
                            <>
                                <Link 
                                    to="/profile" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-4 mb-4 p-4 bg-bg-light rounded-none group"
                                >
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-none flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <UserIcon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Logged in as</p>
                                        <p className="text-secondary font-bold truncate max-w-[150px]">{user?.username || 'User'}</p>
                                    </div>
                                </Link>

                                {dashboardRoute ? (
                                    <Link
                                        to={dashboardRoute}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="mb-4 flex items-center gap-4 rounded-none border border-primary/10 bg-white px-4 py-4 text-secondary transition hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-none bg-primary/10 text-primary">
                                            <LayoutDashboard size={22} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">{getDashboardLabelByRole(user?.role)}</p>
                                            <p className="text-xs text-text-secondary">{getDashboardDescriptionByRole(user?.role)}</p>
                                        </div>
                                    </Link>
                                ) : null}
                            </>
                        )}

                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path && 
                                           (link.scrollId ? (link.name === 'Home' || location.pathname !== '/') : true);
                            
                            return (
                                <Link 
                                    key={link.name} 
                                    to={link.path}
                                    onClick={(e) => handleNavClick(e, link)}
                                    className={`text-lg font-bold text-left px-4 py-3 border-l-4 transition-all ${
                                        isActive 
                                        ? 'bg-primary/5 border-primary text-primary' 
                                        : 'border-transparent text-secondary hover:text-primary hover:bg-gray-50'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-auto pt-10 border-t border-gray-100 flex flex-col gap-4">
                        {isAuthenticated ? (
                            <Button 
                                onClick={handleLogout}
                                className="w-full py-4 rounded-none bg-secondary hover:bg-black"
                            >
                                Logout
                            </Button>
                        ) : (
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full py-4 rounded-none">Login Now</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <nav className="fixed top-0 left-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="flex justify-between items-center h-20">
                        
                        {/* LEFT: Mobile Toggle & Logo Group */}
                        <div className="flex items-center gap-4">
                            {/* Custom 2-Line Animated Hamburger */}
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-all relative z-50 focus:outline-none"
                            >
                                <div className={`w-6 h-0.5 bg-secondary rounded-none transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
                                <div className={`w-6 h-0.5 bg-secondary rounded-none transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
                            </button>

                            {/* Logo Section */}
                            <Link 
                                to="/" 
                                onClick={(e) => handleNavClick(e, { path: '#hero', type: 'scroll' })}
                                className="flex items-center gap-2.5 group"
                            >
                                <span className="text-2xl font-bold text-secondary tracking-tight hidden sm:block">
                                    Together<span className="text-primary">Buy</span>
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path && 
                                               (link.scrollId ? (link.name === 'Home' || location.pathname !== '/') : true);
                                
                                return (
                                    <Link 
                                        key={link.name} 
                                        to={link.path}
                                        onClick={(e) => handleNavClick(e, link)}
                                        className={`px-5 py-2 text-[15px] font-semibold transition-all duration-300 rounded-none cursor-pointer ${
                                            isActive 
                                            ? 'bg-primary text-white shadow-lg shadow-primary/25 -translate-y-px' 
                                            : 'text-text-secondary hover:text-primary hover:bg-primary/5'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Action Column */}
                        <div className="flex items-center gap-4 relative" ref={profileRef}>
                            {isAuthenticated ? (
                                <>
                                    <button 
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className={`w-11 h-11 rounded-none flex items-center justify-center transition-all duration-300 ${
                                            isProfileOpen 
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                                            : 'bg-bg-light text-secondary hover:text-primary hover:bg-primary/10'
                                        }`}
                                    >
                                        <UserIcon size={22} />
                                    </button>

                                    {/* Profile Dropdown */}
                                    <div className={`absolute top-full right-0 mt-3 w-64 bg-white border border-gray-100 rounded-none shadow-2xl shadow-primary/10 py-3 transition-all duration-300 origin-top-right ${
                                        isProfileOpen 
                                        ? 'opacity-100 scale-100 translate-y-0' 
                                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                    }`}>
                                        <div className="px-6 py-4 border-b border-gray-50 mb-2">
                                            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Signed in as</p>
                                            <p className="text-secondary font-bold truncate">{user?.email || 'User'}</p>
                                        </div>
                                        
                                        {dashboardRoute ? (
                                            <Link 
                                                to={dashboardRoute}
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3.5 px-6 py-3 text-[15px] text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
                                            >
                                                <LayoutDashboard size={18} />
                                                <span className="font-semibold">{getDashboardLabelByRole(user?.role)}</span>
                                            </Link>
                                        ) : null}

                                        <Link 
                                            to="/my-deals" 
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center gap-3.5 px-6 py-3 text-[15px] text-text-secondary hover:text-emerald-500 hover:bg-emerald-50 transition-colors"
                                        >
                                            <ShoppingBag size={18} />
                                            <span className="font-semibold">My Deals</span>
                                        </Link>

                                        <Link 
                                            to="/profile" 
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center gap-3.5 px-6 py-3 text-[15px] text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
                                        >
                                            <Settings02Icon size={18} />
                                            <span className="font-semibold">My Profile</span>
                                        </Link>
                                        
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3.5 px-6 py-3 text-[15px] text-red-500 hover:bg-red-50 transition-colors border-t border-gray-50 mt-2"
                                        >
                                            <Logout01Icon size={18} />
                                            <span className="font-semibold">Logout</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <Link to="/login">
                                    <Button className="w-32 py-2.5 text-[15px]">Login</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
