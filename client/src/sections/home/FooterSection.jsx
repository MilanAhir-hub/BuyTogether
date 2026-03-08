import { Mail, Phone, MapPin } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-white tracking-tight">
              TogetherBuying
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed font-medium">
              Helping home buyers save money through group purchasing. Unlock exclusive discounts by buying together with others.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 md:ml-auto">
            <h3 className="text-lg font-bold text-white tracking-wide">Quick Links</h3>
            <ul className="space-y-3 font-medium">
              <li>
                <a href="/home" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="/properties" className="text-gray-400 hover:text-white transition-colors">Properties</a>
              </li>
              <li>
                <a href="/my-groups" className="text-gray-400 hover:text-white transition-colors">My Groups</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4 md:ml-auto">
            <h3 className="text-lg font-bold text-white tracking-wide">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-gray-400" />
                <a href="mailto:support@togetherbuying.com" className="text-gray-400 hover:text-white transition-colors font-medium">
                  support@togetherbuying.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 text-gray-400" />
                <a href="tel:+918001234567" className="text-gray-400 hover:text-white transition-colors font-medium">
                  +91 800 123 4567
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-gray-400" />
                <span className="text-gray-400 font-medium leading-relaxed">
                  Cyber City, DLF Phase 2<br />
                  Gurgaon, Haryana 122002
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-950 border-t border-gray-800 text-center py-6 px-4">
        <p className="text-gray-500 font-medium text-sm">
          © 2026 TogetherBuying. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
