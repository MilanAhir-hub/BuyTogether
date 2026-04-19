import { MapPin, Users, Zap, Clock } from "lucide-react";

const activeGroups = [
  {
    id: 1,
    name: "Green Valley Apartments",
    city: "Ahmedabad",
    totalNeeded: 6,
    buyersJoined: 4,
    discountEstimate: "8-10%",
    closesIn: "5 days"
  },
  {
    id: 2,
    name: "Silver Oak Residency",
    city: "Pune",
    totalNeeded: 10,
    buyersJoined: 8,
    discountEstimate: "12-15%",
    closesIn: "2 days"
  },
  {
    id: 3,
    name: "Royal Enclave",
    city: "Jaipur",
    totalNeeded: 5,
    buyersJoined: 2,
    discountEstimate: "5-7%",
    closesIn: "12 days"
  }
];

export default function ActiveGroupsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Active Buyer Groups</h2>
        <a href="#" className="hidden sm:inline-flex text-sky-600 font-medium hover:text-blue-700 hover:underline transition-all">
          Browse all
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeGroups.map((group) => {
          const progressPercentage = (group.buyersJoined / group.totalNeeded) * 100;
          return (
            <div key={group.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group relative overflow-hidden">
              
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-xl -z-10 opacity-50 transition-transform group-hover:scale-110"></div>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-sky-600 transition-colors">
                    {group.name}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm font-medium">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {group.city}
                  </div>
                </div>
                <div className="bg-green-50 text-green-700 font-bold text-xs px-2.5 py-1 rounded-xl flex items-center border border-green-100 shadow-sm">
                  <Zap className="h-3 w-3 mr-1" />
                  {group.discountEstimate} off
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
                <div className="flex justify-between items-center text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1.5 text-blue-500" /> 
                    Buyers Joined
                  </span>
                  <span className="text-blue-700 font-bold">{group.buyersJoined} / {group.totalNeeded}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-xl h-2.5 mb-2 overflow-hidden">
                  <div 
                    className="bg-linear-to-r from-blue-500 to-sky-500 h-2.5 rounded-xl transition-all duration-1000" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-right font-medium flex items-center justify-end">
                  <Clock className="h-3 w-3 mr-1" /> Closes in {group.closesIn}
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <button className="flex-1 py-2.5 px-4 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black hover:shadow-md transition-all text-center">
                  Join Group
                </button>
                <button className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all text-center">
                  View Details
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
