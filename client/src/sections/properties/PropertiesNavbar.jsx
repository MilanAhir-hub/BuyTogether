import React, { useState } from 'react';
import { Menu, X, Bell, User, LogOut, ChevronDown } from 'lucide-react';

const PropertiesNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Properties', href: '#' },
    { name: 'My Groups', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100/50 shadow-sm font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="font-bold text-xl text-gray-900 tracking-tight">
              TogetherBuying
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors duration-200 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-1 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                  U
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 mr-1" />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 overflow-hidden transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
                  <a href="#" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <User className="h-4 w-4 mr-3 text-gray-400" />
                    Profile
                  </a>
                  <a href="#" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <div className="h-4 w-4 mr-3 rounded-full bg-indigo-100 flex items-center justify-center"><User className="h-2.5 w-2.5 text-indigo-500"/></div>
                    My Groups
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a href="#" className="flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="h-4 w-4 mr-3 text-red-500" />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md justify-center text-gray-500 hover:text-gray-900 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 origin-top animate-in fade-in slide-in-from-top-2">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="border-t border-gray-100 my-2 pt-2 pb-1">
              <div className="px-3 flex items-center mt-2 mb-3">
                 <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mr-3">
                  U
                </div>
                <div>
                  <div className="font-medium text-gray-900">User</div>
                  <div className="text-sm text-gray-500">user@example.com</div>
                </div>
              </div>
              <a href="#" className="flex items-center px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <User className="h-5 w-5 mr-3 text-gray-400" />
                Profile
              </a>
              <a href="#" className="flex items-center px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                 <div className="h-5 w-5 mr-3 rounded-full bg-indigo-100 flex items-center justify-center"><User className="h-3 w-3 text-indigo-500"/></div>
                My Groups
              </a>
              <a href="#" className="flex items-center px-3 py-2.5 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="h-5 w-5 mr-3 text-red-400" />
                Logout
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PropertiesNavbar;
