import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="bg-slate-50 py-16 md:py-24 lg:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
                    {/* Left text content */}
                    <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Buy Property <span className="text-blue-600 block sm:inline">Together</span><br className="hidden lg:block"/>
                            Save More with Group Buying
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
                            Join other homebuyers and purchase properties collectively to unlock exclusive discounted prices from developers.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
                            <a
                                href="#properties"
                                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Browse Properties
                            </a>
                            <a
                                href="#how-it-works"
                                className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 text-lg font-medium rounded-xl shadow-sm transition-all duration-300"
                            >
                                How It Works
                            </a>
                        </div>
                    </div>

                    {/* Right side image */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeefa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Modern luxury apartment building exterior"
                                className="w-full h-[400px] lg:h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
