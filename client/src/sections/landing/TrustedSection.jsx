const TrustedSection = () => {
    const logos = [
        { name: "Godrej", id: 1 },
        { name: "DLF", id: 2 },
        { name: "Prestige", id: 3 },
        { name: "Lodha", id: 4 },
        { name: "Sobha", id: 5 },
    ];

    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
                    Trusted by Thousands of Home Buyers to negotiate with
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:justify-between px-4">
                    {logos.map((logo) => (
                        <div 
                            key={logo.id} 
                            className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                        >
                            <span className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tighter">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedSection;
