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

    update: async (id, propertyData) => {
        const response = await apiClient.put(`/properties/${id}`, propertyData);
        return response.data;
    },

    remove: async (id) => {
        const response = await apiClient.delete(`/properties/${id}`);
        return response.data;
    },

    getBuyerPropertyById: async (id) => {
        const response = await apiClient.get(`/buyer/properties/${id}`);
        return response.data;
    },

    joinGroup: async (propertyId) => {
        const response = await apiClient.post(`/buyer/properties/${propertyId}/join`);
        return response.data;
    },

    leaveGroup: async (groupId) => {
        const response = await apiClient.post(`/buyer/groups/${groupId}/leave`);
        return response.data;
    }
};
