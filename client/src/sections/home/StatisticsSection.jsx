import { Users, Building2, TrendingDown, Map } from "lucide-react";

const stats = [
  {
    id: 1,
    icon: <Users className="h-8 w-8 text-blue-600" />,
    number: "10,000+",
    label: "Buyers Registered",
    bgClass: "bg-blue-50",
  },
  {
    id: 2,
    icon: <Building2 className="h-8 w-8 text-indigo-600" />,
    number: "150+",
    label: "Properties Listed",
    bgClass: "bg-indigo-50",
  },
  {
    id: 3,
    icon: <TrendingDown className="h-8 w-8 text-green-600" />,
    number: "₹50 Crores",
    label: "Saved by Buyers",
    bgClass: "bg-green-50",
  },
  {
    id: 4,
    icon: <Map className="h-8 w-8 text-purple-600" />,
    number: "30+",
    label: "Cities Covered",
    bgClass: "bg-purple-50",
  }
];

export default function StatisticsSection() {
  return (
    <section className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Join thousands of smart buyers who are already saving money through group purchasing.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-2xl mb-4 ${stat.bgClass}`}>
                {stat.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{stat.number}</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
