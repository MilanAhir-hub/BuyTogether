import axios from 'axios';
import { getCookie } from '../utils/cookie';

const apiClient = axios.create({
    baseURL: 'http://localhost:8085/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
    (config) => {
        const token = getCookie('token');
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
