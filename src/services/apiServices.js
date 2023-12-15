import axiosClient from "@/services/axiosClient";

const apiServices = {
  login: async (body) => {
    const url = '/auth/login';
    return await axiosClient.post(url, body);
  },
  getProfile: async () => {
    const url = '/users/me';
    return await axiosClient.get(url);
  },
  getCategories: async (params = {}) => {
    const url = '/categories';
    return await axiosClient.get(url, {params});
  },
  getAllProducts: async (params = {}) => {
    const url = '/products';
    return await axiosClient.get(url, {params});
  },
  getMaxPrice: async (params = {}) => {
    const url = '/products/max-price';
    return await axiosClient.get(url, {params})
  },
  getProductById: async (id) => {
    const url = `/products/${id}`;
    return await axiosClient.get(url);
  },
  getAllOrders: async (params = {}) => {
    const url = '/orders/mine';
    return await axiosClient.get(url, {params});
  },
  createOrder: async (body) => {
    const url = '/orders'
    return await axiosClient.post(url, body);
  },
  updateOrderById: async (id, body) => {
    const url = `/orders/${id}`
    return await axiosClient.put(url, body);
  },
  purchaseOrder: async (id) => {
    const url = `/orders/${id}/purchase`
    return await axiosClient.post(url)
  },
  confirmOrder: async (id) => {
    const url = `/orders/${id}/confirm-received`
    return await axiosClient.post(url)
  },
  cancelOrder: async (id) => {
    const url = `/orders/${id}/cancel`
    return await axiosClient.post(url)
  },
  allUsers: async (params = {}) => {
    const url = '/users'
    return await axiosClient.get(url, {params})
  },
  allSchools: async (params = {}) => {
    const url = '/schools';
    return await axiosClient.get(url, {params});
  },
  getClasses: async (params = {}) => {
    const url = '/classes';
    return await axiosClient.get(url, {params});
  },
  getAllReviews: async (params = {}) => {
    const url = '/reviews';
    return await axiosClient.get(url, {params});
  },
  createReview: async (body) => {
    const url = '/reviews'
    return await axiosClient.post(url, body);
  },
  getAllCampaigns: async (params = {}) => {
    const url = '/posts';
    return await axiosClient.get(url, {params});
  },
  getCampaignById: async (id) => {
    const url = `/posts/${id}`;
    return await axiosClient.get(url);
  },
}
export default apiServices;
