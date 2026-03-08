import { ArrowRight, Users } from "lucide-react";

export default function WelcomeBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      <div className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-white rounded-3xl p-8 md:p-12 overflow-hidden shadow-sm border border-indigo-100">
        
        {/* Background Decorative patterns */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-80 h-80 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Welcome Text Content */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Milan</span> 👋
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl font-medium">
                Explore properties and join buyer groups to unlock exclusive discounts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                Browse Properties
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </button>
              <button className="inline-flex justify-center items-center px-6 py-3 text-base font-medium rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all duration-200">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                View My Groups
              </button>
            </div>
          </div>

          {/* Right side Illustration / Image mock */}
          <div className="w-full md:w-1/3 max-w-sm hidden md:block">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" 
                alt="Modern Real Estate" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full inline-block mb-2 border border-white/30">
                  New Match
                </div>
                <div className="font-semibold text-lg leading-tight">Skyline Residency</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
