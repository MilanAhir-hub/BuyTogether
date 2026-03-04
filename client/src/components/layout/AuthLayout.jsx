const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-white flex">
            {/* Left side - Image/Branding */}
            <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:items-center bg-slate-900 relative overflow-hidden">
                <img
                    className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-multiply transition-transform duration-1000 hover:scale-105"
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    alt="Modern Architecture"
                />
                <div className="relative z-10 p-12 text-center">
                    <h2 className="text-4xl font-serif text-white tracking-wider mb-4">
                        BuyTogether
                    </h2>
                    <p className="text-lg text-slate-300 max-w-md mx-auto font-light">
                        The premier platform for buying, selling, and collaborating on high-value real estate properties.
                    </p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-[45%] shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] z-10">
                <div className="mx-auto w-full max-w-sm lg:max-w-md">
                    <div className="mb-10 lg:hidden text-center">
                        <h2 className="text-3xl font-serif text-slate-900 tracking-wider">
                            BuyTogether
                        </h2>
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif text-gray-900 tracking-tight">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="mt-2 text-sm text-gray-600">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <div className="mt-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
