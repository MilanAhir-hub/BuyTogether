import React from 'react';

const Card = ({ children, className = "", variant = "default", ...props }) => {
    const baseStyles = "bg-white border transition-all duration-300";
    
    const variants = {
        default: "border-slate-200 rounded-xl shadow-sm",
        outline: "border-slate-200 rounded-xl bg-transparent",
        flat: "border-transparent rounded-xl",
        interactive: "border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 cursor-pointer"
    };

    return (
        <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;
