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
            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken);
                    // Check token expiration
                    const currentTime = Date.now() / 1000;
                    if (decoded.exp < currentTime) {
                        handleLogout(); // Token expired
                    } else {
                        // Normally user info might be fetched from a /me endpoint or taken directly from payload
                        setUser(normalizeUser({
                            id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                            email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                            username: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
                            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'User'
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
            
            // The backend returns { success: true, message: "...", data: { token: "...", user: { ... } } }
            if (response.success && response.data?.token) {
                const { token, user } = response.data;
                Cookies.set('token', token, { expires: 1/12 }); // expires in 2 hours
                setToken(token);
                setUser(normalizeUser(user));
                return { success: true };
            }
            return { success: false, message: response.message || 'Login failed' };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const handleSignup = async (userData) => {
        try {
            const response = await authService.signup(userData);
            
            // The backend returns { success: true, message: "...", data: { token: "...", user: { ... } } }
            if (response.success && response.data?.token) {
                const { token, user } = response.data;
                Cookies.set('token', token, { expires: 1/12 });
                setToken(token);
                setUser(normalizeUser(user));
                return { success: true };
            }
            return { success: false, message: response.message || 'Signup failed' };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Signup failed' };
        }
    };

    const handleLogout = async () => {
        try {
            // Optional: Call backend to invalidate token if backend handles stateless logout logic
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

    return {
        ...userData,
        role: userData.role || 'User',
    };
};
