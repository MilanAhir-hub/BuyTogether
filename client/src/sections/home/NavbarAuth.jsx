import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, X, User } from "lucide-react";

export default function NavbarAuth() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side: Logo & Desktop Links */}
          <div className="flex items-center gap-8">
            <Link to="/home" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                TogetherBuying
              </span>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/home" className="text-gray-900 border-b-2 border-blue-600 px-1 pt-1 text-sm font-medium">
                Home
              </Link>
              <Link to="/properties" className="text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-gray-300 px-1 pt-1 text-sm font-medium transition-colors">
                Properties
              </Link>
              <Link to="/my-groups" className="text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-gray-300 px-1 pt-1 text-sm font-medium transition-colors">
                My Groups
              </Link>
              <Link to="/contact" className="text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-gray-300 px-1 pt-1 text-sm font-medium transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Right side Elements */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              <Bell className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:ring-2 hover:ring-blue-300 p-1"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  M
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50 border border-gray-100">
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
            <Link to="/home" className="bg-blue-50 border-l-4 border-blue-600 text-blue-700 block pl-3 pr-4 py-2 text-base font-medium">
              Home
            </Link>
            <Link to="/properties" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors">
              Properties
            </Link>
            <Link to="/my-groups" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors">
              My Groups
            </Link>
            <Link to="/contact" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors">
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  M
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Milan</div>
                <div className="text-sm font-medium text-gray-500">milan@example.com</div>
              </div>
              <button className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
