import apiClient from './apiClient';

export const propertyService = {
    getAll: async () => {
        const response = await apiClient.get('/properties');
        return response.data;
    },

    getMine: async () => {
        const response = await apiClient.get('/properties/my-properties');
        return response.data;
    },

    getById: async (id) => {
        const response = await apiClient.get(`/properties/${id}`);
        return response.data;
    },

    create: async (propertyData) => {
        const response = await apiClient.post('/properties', propertyData);
        return response.data;
    },

    remove: async (id) => {
        const response = await apiClient.delete(`/properties/${id}`);
        return response.data;
    }
};
