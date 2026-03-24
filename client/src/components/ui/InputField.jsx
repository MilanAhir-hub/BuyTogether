const InputField = ({ label, id, type = "text", className = "", rightIcon, ...props }) => {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-semibold text-secondary ml-4">
                    {label}
                </label>
            )}
            <div className="relative group">
                <input
                    id={id}
                    name={id}
                    type={type}
                    className={`block w-full px-6 py-3.5 bg-white border border-gray-200 rounded-full text-sm text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${rightIcon ? 'pr-12' : ''}`}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-5 text-gray-400 group-focus-within:text-primary transition-colors">
                        {rightIcon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputField;
