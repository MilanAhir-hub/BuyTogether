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
            // Token might be expired or invalid
            Cookies.remove('token');
            // could redirect to login here, but usually best handled in context or components
        }
        return Promise.reject(error);
    }
);

export default apiClient;
