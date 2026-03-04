import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../../components/layout/AuthLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <AuthLayout
            title="Create an account"
            subtitle={
                <>
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-slate-900 hover:text-slate-700 transition-colors">
                        Sign in here
                    </Link>
                </>
            }
        >
            <form className="space-y-6" action="#" method="POST">
                <InputField
                    label="Full name"
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                />

                <InputField
                    label="Email address"
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                />

                <InputField
                    label="Password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" aria-hidden="true" />
                            ) : (
                                <Eye className="h-5 w-5" aria-hidden="true" />
                            )}
                        </button>
                    }
                />

                <InputField
                    label="Confirm password"
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    rightIcon={
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5" aria-hidden="true" />
                            ) : (
                                <Eye className="h-5 w-5" aria-hidden="true" />
                            )}
                        </button>
                    }
                />

                <div className="flex items-center">
                    <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-slate-900 focus:ring-slate-900 border-gray-300 rounded-sm"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                        I agree to the{' '}
                        <a href="#" className="font-medium text-slate-900 hover:text-slate-700">
                            Terms
                        </a>
                        {' '}and{' '}
                        <a href="#" className="font-medium text-slate-900 hover:text-slate-700">
                            Privacy Policy
                        </a>
                    </label>
                </div>

                <div>
                    <Button type="submit">
                        Create account
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Signup;