import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: 'http://localhost:5096/api',
    withCredentials: true, // Important for CORS to send/receive cookies if set by backend, but we manage JWT manually in cookie for now
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log(`[apiClient] Attaching token to ${config.url}`);
        } else {
            console.log(`[apiClient] No token found for ${config.url}`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (optional: handle 401s globally)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('[apiClient] 401 Unauthorized detected! Not clearing token to debug.');
            // Cookies.remove('token');
        }
        return Promise.reject(error);
    }
);

export default apiClient;
