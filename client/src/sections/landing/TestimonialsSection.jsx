const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: "Rajesh Kumar",
            city: "Mumbai",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "\"Through group buying I saved nearly ₹7 lakhs on my apartment purchase in Lodha Altamount. The process was surprisingly smooth and transparent.\""
        },
        {
            id: 2,
            name: "Priya Sharma",
            city: "Bangalore",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "\"I never thought I could afford a premium property from Prestige, but pooling together with 20 other buyers brought the price down significantly.\""
        },
        {
            id: 3,
            name: "Amit Patel",
            city: "Gurgaon",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "\"The TogetherBuy team handled all negotiations with the builder. I just joined the group and secured a 12% discount on my new home.\""
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        What Our Buyers Say
                    </h2>
                    <p className="text-lg text-slate-600">
                        Real stories from home buyers who unlocked massive savings.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div 
                            key={testimonial.id} 
                            className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center mb-6">
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name} 
                                    className="w-14 h-14 rounded-xl object-cover mr-4"
                                />
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">{testimonial.name}</h4>
                                    <span className="text-sm font-medium text-slate-500">{testimonial.city}</span>
                                </div>
                            </div>
                            <p className="text-slate-600 italic leading-relaxed text-lg">
                                {testimonial.text}
                            </p>
                            <div className="mt-6 flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
