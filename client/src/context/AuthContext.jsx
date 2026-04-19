import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/authService';
import { getCookie, setCookie, removeCookie } from '../utils/cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(getCookie('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('[AuthContext] Initializing. document.cookie presence:', !!document.cookie);
        if (document.cookie) {
            console.log('[AuthContext] Raw document.cookie length:', document.cookie.length);
        }
        
        const initializeAuth = () => {
            const storedToken = getCookie('token');
            console.log('[AuthContext] getCookie("token") result:', storedToken ? 'Token Found (len: ' + storedToken.length + ')' : 'Not Found');
            
            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken);
                    console.log('[AuthContext] Token Decoded Successfully. User:', decoded.unique_name || decoded.sub || 'unknown');
                    
                    // Check token expiration
                    const currentTime = Date.now() / 1000;
                    if (decoded.exp && decoded.exp < currentTime) {
                        console.warn('[AuthContext] Token expired. Logging out.');
                        handleLogout();
                    } else {
                        // Extended claim mapping for .NET Identity
                        const userData = {
                            id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || 
                                decoded.nameid || decoded.sub || decoded.id || decoded.Id,
                            email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || 
                                   decoded.email || decoded.Email,
                            username: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 
                                      decoded.unique_name || decoded.username || decoded.Username,
                            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 
                                  decoded.role || decoded.Role || 'User'
                        };
                        
                        setUser(normalizeUser(userData));
                        setToken(storedToken);
                    }
                } catch (error) {
                    console.error('[AuthContext] Failed to decode token on load:', error);
                    handleLogout();
                }
            } else {
                console.log('[AuthContext] No token found during initializeAuth');
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
            console.log('[AuthContext] Login response:', response);
            if (response.success && (response.data?.token || response.data?.Token)) {
                const token = response.data.token || response.data.Token;
                const user = response.data.user || response.data.User;
                
                // Set token cookie
                console.log('[AuthContext] Login success, setting cookie...');
                setCookie('token', token);
                
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
            console.log('[AuthContext] Signup response:', response);
            if (response.success && (response.data?.token || response.data?.Token)) {
                const token = response.data.token || response.data.Token;
                const user = response.data.user || response.data.User;
                
                setCookie('token', token);
                
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
            removeCookie('token');
            removeCookie('Token'); // also remove PascalCase version if exists
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

