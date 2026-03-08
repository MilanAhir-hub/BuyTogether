import React from 'react';
import { Users, AlertCircle, ArrowRight } from 'lucide-react';

const GroupBuyingSection = () => {
  const buyersJoined = 3;
  const maxBuyers = 5;
  const progressPercentage = Math.min((buyersJoined / maxBuyers) * 100, 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Inter']">
      <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-[2rem] p-1 relative overflow-hidden shadow-2xl">
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <div className="w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-[1.8rem] p-8 md:p-12 relative z-10 border border-white/20 flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Left Content */}
          <div className="flex-1 w-full text-center md:text-left">
            <div className="inline-flex items-center py-1.5 px-3 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-100 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
              Active Group Pool
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Join the Buyer Group
            </h2>
            <p className="text-indigo-100/80 text-lg max-w-xl mx-auto md:mx-0 leading-relaxed mb-6">
              Team up with other buyers to unlock exclusive discounts and priority allocations for this premium property.
            </p>

            <div className="flex items-start bg-indigo-950/40 rounded-xl p-4 border border-indigo-500/20 max-w-lg mx-auto md:mx-0">
              <AlertCircle className="h-5 w-5 text-indigo-300 mt-0.5 flex-shrink-0" />
              <p className="ml-3 text-sm text-indigo-100/80 leading-relaxed">
                <span className="font-semibold text-white">Note:</span> Once the group is full, all joined buyers will receive the final discounted pricing and next steps for booking.
              </p>
            </div>
          </div>

          {/* Right Content - Progress & Action Card */}
          <div className="w-full md:w-[400px] bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] relative">
            
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</p>
                <div className="flex items-center">
                  <span className="text-3xl font-extrabold text-gray-900">{buyersJoined}</span>
                  <span className="text-xl font-medium text-gray-400 mx-1">/</span>
                  <span className="text-xl font-medium text-gray-600">{maxBuyers}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center text-sm font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  <Users className="h-4 w-4 mr-1.5" />
                  {progressPercentage}% Filled
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-3 mb-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progressPercentage}%` }}
              >
                  <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>

            <button className="w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300 flex items-center justify-center group transform hover:-translate-y-0.5">
              Reflect Interest
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
            </button>
            
            <p className="text-center text-xs text-gray-500 mt-4 font-medium">
              Only {maxBuyers - buyersJoined} spots remaining!
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default GroupBuyingSection;
