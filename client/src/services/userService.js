import apiClient from './apiClient';

export const userService = {
    getProfile: async () => {
        const response = await apiClient.get('/user/me');
        return response.data;
    },

    updateProfile: async (profileData) => {
        const response = await apiClient.put('/user/me', profileData);
        return response.data;
    },

    becomeSeller: async () => {
        const response = await apiClient.post('/user/become-seller');
        return response.data;
    }
};
