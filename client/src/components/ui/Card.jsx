import React from 'react';

const Card = ({ children, className = "", variant = "default", ...props }) => {
    const baseStyles = "bg-white border transition-all duration-300";
    
    const variants = {
        default: "border-slate-200 rounded-none shadow-sm",
        outline: "border-slate-200 rounded-none bg-transparent",
        flat: "border-transparent rounded-none",
        interactive: "border-slate-200 rounded-none shadow-sm hover:shadow-md hover:border-slate-300 cursor-pointer"
    };

    return (
        <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;
