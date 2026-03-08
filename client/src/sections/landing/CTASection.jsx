import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="py-24 bg-linear-to-br from-slate-900 to-blue-900 overflow-hidden relative">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                    Ready to Find Your Dream Home?
                </h2>
                <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    Join hundreds of smart buyers saving money through collective purchasing today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a 
                        href="#properties" 
                        className="w-full sm:w-auto px-10 py-4 bg-white text-slate-900 font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300"
                    >
                        Explore Properties
                    </a>
                    <Link 
                        to="/signup" 
                        className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-slate-900 transition-all duration-300"
                    >
                        Create Free Account
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
