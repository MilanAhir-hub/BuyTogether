import { CheckCircle2 } from 'lucide-react';

const BenefitsSection = () => {
    const benefits = [
        "Save Lakhs on Property Price",
        "Transparent Buying Process",
        "Verified Real Estate Projects",
        "Professional Negotiation with Builders",
        "Community Driven Buying"
    ];

    return (
        <section className="py-20 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Illustration Image */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-blue-100 rounded-xl transform -rotate-3 scale-105 z-0"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1556912167-f556f1f39fdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                            alt="People discussing real estate" 
                            className="relative z-10 rounded-xl shadow-xl w-full object-cover h-[400px] lg:h-[500px]"
                        />
                    </div>

                    {/* Right: Benefits List */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Why Choose Group Buying?
                        </h2>
                        <p className="text-lg text-slate-600 mb-10">
                            We bring buyers together to create collective bargaining power, ensuring you get the best possible deal on premium real estate projects.
                        </p>
                        
                        <div className="space-y-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="shrink-0 mt-1">
                                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                                    </div>
                                    <p className="ml-4 text-xl font-medium text-slate-800">
                                        {benefit}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12">
                            <a href="#" className="inline-flex items-center text-sky-600 font-semibold text-lg hover:text-blue-700 transition-colors">
                                Learn more about our process &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
