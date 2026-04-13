import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavbarSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Properties', href: '#' },
        { name: 'How It Works', href: '#' },
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight">
                            Together<span className="text-primary">Buy</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="text-slate-600 hover:text-slate-900 font-medium px-4 py-2"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-none transition-colors shadow-sm"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-none"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="pt-4 flex flex-col space-y-3 px-3">
                            <Link
                                to="/login"
                                className="w-full text-center text-slate-700 hover:text-slate-900 font-medium py-3 border border-slate-200 rounded-none"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-none"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavbarSection;
