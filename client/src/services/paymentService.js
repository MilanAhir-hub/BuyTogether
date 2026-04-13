import apiClient from './apiClient';

/**
 * Creates a Razorpay order from the backend
 * @param {string} id - The ID to commit to
 * @param {string} type - "deal" or "property"
 * @returns {Promise<object>} The server response containing order details
 */
export const createRazorpayOrder = async (id, type = "deal") => {
    if (type === "property") {
        const response = await apiClient.post('/payment/property/create-order', { propertyId: id });
        return response.data;
    } else {
        const response = await apiClient.post('/payment/create-order', { dealId: id });
        return response.data;
    }
};

/**
 * Verifies a Razorpay payment on the server and activates group joining
 * @param {object} verifyData - Object containing id, razorpayOrderId, razorpayPaymentId, razorpaySignature
 * @param {string} type - "deal" or "property"
 * @returns {Promise<object>} Verification result
 */
export const verifyRazorpayPayment = async (verifyData, type = "deal") => {
    if (type === "property") {
        const response = await apiClient.post('/payment/property/verify', {
            propertyId: verifyData.id,
            razorpayOrderId: verifyData.razorpayOrderId,
            razorpayPaymentId: verifyData.razorpayPaymentId,
            razorpaySignature: verifyData.razorpaySignature
        });
        return response.data;
    } else {
        const response = await apiClient.post('/payment/verify', {
            dealId: verifyData.id,
            razorpayOrderId: verifyData.razorpayOrderId,
            razorpayPaymentId: verifyData.razorpayPaymentId,
            razorpaySignature: verifyData.razorpaySignature
        });
        return response.data;
    }
};
