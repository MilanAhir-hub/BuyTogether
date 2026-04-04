import apiClient from './apiClient';

export const getAllDeals = async () => {
    const response = await apiClient.get('/deals');
    return response.data;
};

export const getDealById = async (id) => {
    const response = await apiClient.get(`/deals/${id}`);
    return response.data;
};

export const createDeal = async (dealData) => {
    const response = await apiClient.post('/deals', dealData);
    return response.data;
};
