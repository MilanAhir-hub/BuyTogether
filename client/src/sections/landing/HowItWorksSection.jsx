import { Search, Users, Tag } from 'lucide-react';

const HowItWorksSection = () => {
    const steps = [
        {
            icon: <Search className="h-8 w-8 text-blue-600" />,
            title: "Browse Properties",
            description: "Explore a curated list of residential projects available for group buying."
        },
        {
            icon: <Users className="h-8 w-8 text-blue-600" />,
            title: "Join a Buyer Group",
            description: "Join other interested buyers who want to purchase the same property."
        },
        {
            icon: <Tag className="h-8 w-8 text-blue-600" />,
            title: "Get Exclusive Discounts",
            description: "When enough buyers join, developers offer special discounted prices."
        }
    ];

    return (
        <section id="how-it-works" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        How Group Buying Works
                    </h2>
                    <p className="text-lg text-slate-600">
                        A simple, transparent process designed to get you the best possible price on your dream home.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                {step.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
