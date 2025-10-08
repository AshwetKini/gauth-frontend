import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Try to refresh token
      try {
        const refreshResponse = await api.post('/auth/refresh', {});
        const newToken = refreshResponse.data.accessToken;
        Cookies.set('accessToken', newToken);
        
        // Retry original request
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        Cookies.remove('accessToken');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
