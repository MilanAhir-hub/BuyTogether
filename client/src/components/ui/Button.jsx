import React from 'react';

const Button = ({ 
    children, 
    type = "button", 
    variant = "primary", 
    className = "", 
    ...props 
}) => {
    const baseStyles = "w-40 py-3 active:scale-95 transition-all duration-200 text-sm font-medium rounded-none flex items-center justify-center cursor-pointer";
    
    const variants = {
        primary: "bg-primary text-white hover:bg-primary-dark shadow-sm",
        secondary: "bg-secondary text-white hover:bg-slate-800",
        outline: "border-2 border-primary text-primary hover:bg-bg-light",
        ghost: "text-primary hover:bg-bg-light"
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
