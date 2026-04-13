import apiClient from './apiClient';

export const joinDealGroup = async (dealId) => {
    const response = await apiClient.post(`/dealgroups/join/${dealId}`);
    return response.data;
};

export const leaveDealGroup = async (dealId) => {
    const response = await apiClient.post(`/dealgroups/leave/${dealId}`);
    return response.data;
};

export const getGroupStatus = async (groupId) => {
    const response = await apiClient.get(`/dealgroups/${groupId}`);
    return response.data;
};

export const getMyGroups = async () => {
    const response = await apiClient.get('/dealgroups/my-groups');
    return response.data;
};

export const confirmOrder = async (groupId) => {
    const response = await apiClient.post(`/orders/confirm/${groupId}`);
    return response.data;
};

export const getMyOrders = async () => {
    const response = await apiClient.get('/orders/my-orders');
    return response.data;
};
