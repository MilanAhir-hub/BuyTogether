import apiClient from './apiClient';

export const buyerService = {
    getAvailableProperties: async () => {
        const response = await apiClient.get('/buyer/properties');
        return response.data;
    },
    
    getPropertyById: async (propertyId) => {
        const response = await apiClient.get(`/buyer/properties/${propertyId}`);
        return response.data;
    },

    joinGroup: async (propertyId) => {
        const response = await apiClient.post(`/buyer/properties/${propertyId}/join`);
        return response.data;
    },

    getMyGroups: async () => {
        const response = await apiClient.get('/buyer/groups/my');
        return response.data;
    },

    getGroupDetails: async (groupId) => {
        const response = await apiClient.get(`/buyer/groups/${groupId}`);
        return response.data;
    },

    leaveGroup: async (groupId) => {
        const response = await apiClient.post(`/buyer/groups/${groupId}/leave`);
        return response.data;
    }
};
