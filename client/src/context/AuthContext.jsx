import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(Cookies.get('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            const storedToken = Cookies.get('token');
            console.log('[AuthContext] Initializing. Stored token:', storedToken ? 'YES (truncated...)' : 'NO');
            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken);
                    console.log('[AuthContext] Decoded token:', decoded);
                    // Check token expiration
                    const currentTime = Date.now() / 1000;
                    if (decoded.exp < currentTime) {
                        handleLogout(); // Token expired
                    } else {
                        // Normally user info might be fetched from a /me endpoint or taken directly from payload
                        setUser(normalizeUser({
                            id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || decoded.sub || decoded.id,
                            email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || decoded.email,
                            username: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || decoded.unique_name || decoded.username,
                            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.role || decoded.Role || 'User'
                        }));
                        setToken(storedToken);
                    }
                } catch (error) {
                    console.error('Failed to decode token on load', error);
                    handleLogout();
                }
            } else {
                setUser(null);
                setToken(null);
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const handleLogin = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            if (response.success && response.data?.token) {
                const { token, user } = response.data;
                Cookies.set('token', token, { expires: 1/12, path: '/' });
                setToken(token);
                setUser(normalizeUser(user));
                return { success: true };
            }
            return { success: false, message: response.message || 'Login failed' };
        } catch (error) {
            console.error('Login error details:', error.response?.data);
            let errorMessage = error.response?.data?.message || 'Login failed';
            if (error.response?.status === 400 && error.response?.data?.errors) {
                const validationErrors = error.response.data.errors;
                const firstErrorKey = Object.keys(validationErrors)[0];
                if (firstErrorKey) {
                    const firstErrorMessage = Array.isArray(validationErrors[firstErrorKey]) 
                        ? validationErrors[firstErrorKey][0] 
                        : validationErrors[firstErrorKey];
                    errorMessage = firstErrorMessage;
                }
            }
            return { success: false, message: errorMessage };
        }
    };

    const handleSignup = async (userData) => {
        try {
            const response = await authService.signup(userData);
            if (response.success && response.data?.token) {
                const { token, user } = response.data;
                Cookies.set('token', token, { expires: 1/12, path: '/' });
                setToken(token);
                setUser(normalizeUser(user));
                return { success: true };
            }
            return { success: false, message: response.message || 'Signup failed' };
        } catch (error) {
            console.error('Signup error details:', error.response?.data);
            let errorMessage = error.response?.data?.message || 'Signup failed';
            if (error.response?.status === 400 && error.response?.data?.errors) {
                const validationErrors = error.response.data.errors;
                const firstErrorKey = Object.keys(validationErrors)[0];
                if (firstErrorKey) {
                    const firstErrorMessage = Array.isArray(validationErrors[firstErrorKey]) 
                        ? validationErrors[firstErrorKey][0] 
                        : validationErrors[firstErrorKey];
                    errorMessage = firstErrorMessage;
                }
            }
            return { success: false, message: errorMessage };
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            // ignore backend logout failure
        } finally {
            Cookies.remove('token');
            setToken(null);
            setUser(null);
        }
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const normalizeUser = (userData) => {
    if (!userData) {
        return null;
    }

    // Backend returns 'Role', but frontend expects 'role'
    // Also handle JWT decoded keys which might be in full URI format or just 'role'
    const role = userData.role || userData.Role || 'User';

    return {
        ...userData,
        role: role,
    };
};
