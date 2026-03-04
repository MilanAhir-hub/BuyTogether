import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../../components/layout/AuthLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <AuthLayout
            title="Sign in to your account"
            subtitle={
                <>
                    Or{' '}
                    <Link to="/signup" className="font-medium text-slate-900 hover:text-slate-700 transition-colors">
                        create a new account
                    </Link>
                </>
            }
        >
            <form className="space-y-6" action="#" method="POST">
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
                    autoComplete="current-password"
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


                <div>
                    <Button type="submit">
                        Sign in
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;