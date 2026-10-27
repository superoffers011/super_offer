import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enables browser to automatically transmit & receive HTTP-Only Session Cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('diwali_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle global errors (e.g. expired token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired or invalid
      if (localStorage.getItem('diwali_token')) {
        localStorage.removeItem('diwali_token');
        localStorage.removeItem('diwali_user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints with OTP verification & Session Cookies
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  verifyOtp: (data) => api.post('/auth/verify-otp', data),
  resendOtp: (data) => api.post('/auth/resend-otp', data),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  getFullProfile: () => api.get('/auth/profile-full'),
};

// Offers Endpoints
export const offersAPI = {
  getAll: (params) => api.get('/offers', { params }),
  getById: (id) => api.get(`/offers/${id}`),
  getCategories: () => api.get('/offers/categories'),
};

// Payment & User Lottery Endpoints
export const paymentAPI = {
  createOrder: (offerId) => api.post('/payment/create-order', { offerId }),
  verifyPayment: (paymentData) => api.post('/payment/verify-payment', paymentData),
  getMyCoupons: () => api.get('/user/my-coupons'),
};

// Admin Endpoints
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  createOffer: (offerData) => api.post('/admin/offers', offerData),
  updateOffer: (id, offerData) => api.put(`/admin/offers/${id}`, offerData),
  deleteOffer: (id) => api.delete(`/admin/offers/${id}`),
  drawWinner: (prize) => api.post('/admin/draw-winner', { prize }),
  getWinners: () => api.get('/admin/winners'),
  seedDatabase: () => api.post('/admin/seed'),
};

// Contact & Support Grievance Endpoints
export const contactAPI = {
  submitInquiry: (data) => api.post('/contact', data),
};

export default api;
