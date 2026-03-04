const Button = ({ children, type = "button", className = "", ...props }) => {
    return (
        <button
            type={type}
            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
