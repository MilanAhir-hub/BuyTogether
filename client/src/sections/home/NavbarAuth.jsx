import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, X, User } from "lucide-react";

export default function NavbarAuth() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side: Logo & Desktop Links */}
          <div className="flex items-center gap-8">
            <Link to="/home" className="shrink-0 flex items-center">
              <span className="text-xl font-bold text-secondary">
                Together<span className="text-primary">Buy</span>
              </span>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {[
                { name: 'Home', path: '/home' },
                { name: 'Properties', path: '/properties' },
                { name: 'My Groups', path: '/my-groups' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-none ${
                      isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/25 -translate-y-px' 
                      : 'text-gray-500 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side Elements */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-none transition-colors relative">
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-none"></span>
              <Bell className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex text-sm bg-gray-100 rounded-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:ring-2 hover:ring-blue-300 p-1"
              >
                <div className="h-8 w-8 rounded-none bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  M
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-none shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50 border border-gray-100">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Profile
                  </Link>
                  <Link to="/my-groups" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    My Groups
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link to="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-none text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg absolute w-full z-40">
          <div className="pt-2 pb-3 space-y-1">
            {[
              { name: 'Home', path: '/home' },
              { name: 'Properties', path: '/properties' },
              { name: 'My Groups', path: '/my-groups' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block pl-3 pr-4 py-3 border-l-4 text-base font-medium transition-colors ${
                    isActive 
                    ? 'bg-primary/5 border-primary text-primary' 
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="shrink-0">
                <div className="h-10 w-10 rounded-none bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  M
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Milan</div>
                <div className="text-sm font-medium text-gray-500">milan@example.com</div>
              </div>
              <button className="ml-auto shrink-0 bg-white p-1 rounded-none text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <Link to="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors">
                Profile
              </Link>
              <Link to="/my-groups" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors">
                My Groups
              </Link>
              <Link to="/logout" className="block px-4 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors">
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
