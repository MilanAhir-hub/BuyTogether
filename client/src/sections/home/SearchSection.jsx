import { Search, MapPin, Building2, Wallet } from "lucide-react";

export default function SearchSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 md:p-4">
        <form className="flex flex-col md:flex-row gap-3">
          
          {/* Main Search Input */}
          <div className="flex-1 relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 md:py-4 bg-gray-50/50 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-base"
              placeholder="Search properties in your city..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:w-[60%] lg:w-[50%]">
            {/* Location Dropdown */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <select className="block w-full pl-9 pr-8 py-3 md:py-4 bg-gray-50/50 border-0 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none transition-all font-medium text-sm md:text-base h-full cursor-pointer">
                <option value="">Any Location</option>
                <option value="gurgaon">Gurgaon</option>
                <option value="bangalore">Bangalore</option>
                <option value="mumbai">Mumbai</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="pune">Pune</option>
              </select>
            </div>

            {/* Property Type Dropdown */}
            <div className="flex-1 relative hidden lg:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-4 w-4 text-gray-400" />
              </div>
              <select className="block w-full pl-9 pr-8 py-3 md:py-4 bg-gray-50/50 border-0 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none transition-all font-medium text-sm md:text-base h-full cursor-pointer">
                <option value="">Any Type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="plot">Plot</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            {/* Budget Range Dropdown */}
            <div className="flex-1 relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Wallet className="h-4 w-4 text-gray-400" />
              </div>
              <select className="block w-full pl-9 pr-8 py-3 md:py-4 bg-gray-50/50 border-0 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none transition-all font-medium text-sm md:text-base h-full cursor-pointer">
                <option value="">Budget</option>
                <option value="<50L">Below ₹50 Lakhs</option>
                <option value="50L-1Cr">₹50 Lakhs - ₹1 Crore</option>
                <option value="1Cr-3Cr">₹1 Crore - ₹3 Crores</option>
                <option value=">3Cr">Above ₹3 Crores</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="button"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gray-900 hover:bg-black text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
