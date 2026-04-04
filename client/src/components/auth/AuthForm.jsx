import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft01Icon } from 'hugeicons-react';
import { Eye, EyeOff } from 'lucide-react';

const AuthForm = ({ initialMode = "login" }) => {
    const [state, setState] = useState(initialMode);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' }); // type can be 'error' or 'success'
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        setIsLoading(true);

        try {
            const result = state === "login"
                ? await login({ email: formData.email, password: formData.password })
                : await signup({ username: formData.name, email: formData.email, password: formData.password });

            if (result.success) {
                const successMsg = state === "login" ? "Login successful!" : "Account created successfully!";
                setMessage({ text: successMsg, type: 'success' });
                toast.success(successMsg);
                
                // Redirect to home after a short delay to allow the user to see the success message
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            } else {
                const errorMsg = result.message || (state === "login" ? "Login failed" : "Signup failed");
                setMessage({ text: errorMsg, type: 'error' });
                toast.error(errorMsg);
            }
        } catch (err) {
            const errorMsg = "An unexpected error occurred. Please try again.";
            setMessage({ text: errorMsg, type: 'error' });
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-bg-light/40 relative overflow-hidden">
            {/* Background blobs for depth */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -ml-48 -mt-48"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-light/5 rounded-full blur-[100px] -mr-48 -mb-48"></div>

            {/* Back Button */}
            <Link 
                to="/" 
                className="absolute top-10 left-10 flex items-center gap-2.5 text-text-secondary hover:text-primary transition-all duration-300 group z-10"
            >
                <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all border border-gray-100">
                    <ArrowLeft01Icon size={20} />
                </div>
            </Link>

            <form onSubmit={handleSubmit} className="sm:w-[450px] w-full text-center border border-gray-100 rounded-[40px] px-10 py-12 bg-white shadow-2xl shadow-primary/5 relative z-10">
                <h1 className="text-gray-900 text-3xl font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
                <p className="text-gray-500 text-sm mt-2">Please {state === "login" ? "sign in" : "register"} to continue</p>
                
                {message.text && (
                    <div className={`mt-4 p-3 border text-sm rounded-lg text-left transition-all duration-300 ${
                        message.type === 'error' 
                            ? 'bg-red-50 border-red-100 text-red-600' 
                            : 'bg-green-50 border-green-100 text-green-600'
                    }`}>
                        {message.text}
                    </div>
                )}

                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            className="w-full border-none outline-none ring-0 text-gray-700 bg-transparent" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                )}
                
                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email id" 
                        className="w-full border-none outline-none ring-0 text-gray-700 bg-transparent" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 focus-within:border-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="Password (min 6 characters)" 
                        className="w-full border-none outline-none ring-0 text-gray-700 bg-transparent" 
                        value={formData.password} 
                        onChange={handleChange} 
                        minLength={6}
                        required 
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-primary transition-colors shrink-0"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="mt-8 w-full h-12 rounded-full text-white bg-primary hover:bg-primary-dark transition-all duration-300 font-semibold shadow-md active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                        <span className="mb-0.5">{state === "login" ? "Login" : "Sign up"}</span>
                    )}
                </button>
                
                <p 
                    onClick={() => {
                        setState(prev => prev === "login" ? "register" : "login");
                        setMessage({ text: '', type: '' }); // Clear message when switching modes
                    }} 
                    className="text-gray-500 text-[15px] mt-6 cursor-pointer select-none"
                >
                    {state === "login" ? "Don't have an account?" : "Already have an account?"} 
                    <span className="text-primary hover:underline ml-1 font-semibold">click here</span>
                </p>
            </form>
        </div>
    );
};

export default AuthForm;
