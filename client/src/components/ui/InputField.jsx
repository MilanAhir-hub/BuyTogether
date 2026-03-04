const InputField = ({ label, id, type = "text", className = "", rightIcon, ...props }) => {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1 relative">
                <input
                    id={id}
                    name={id}
                    type={type}
                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm transition-colors ${rightIcon ? 'pr-10' : ''}`}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {rightIcon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputField;
