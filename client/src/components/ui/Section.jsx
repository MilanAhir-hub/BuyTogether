import React from 'react';

const Section = ({ 
    children, 
    id, 
    className = "", 
    containerClassName = "",
    title, 
    subtitle, 
    dark = false,
    light = false
}) => {
    const bgClass = dark ? 'bg-secondary text-white' : light ? 'bg-bg-light/40' : 'bg-white text-slate-900';
    
    return (
        <section id={id} className={`py-24 px-6 ${bgClass} ${className}`}>
            <div className={`max-w-7xl mx-auto ${containerClassName}`}>
                {(title || subtitle) && (
                    <div className="mb-16 text-center">
                        {title && (
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className={`${dark ? 'text-slate-400' : 'text-slate-500'} text-lg max-w-2xl mx-auto leading-relaxed`}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
