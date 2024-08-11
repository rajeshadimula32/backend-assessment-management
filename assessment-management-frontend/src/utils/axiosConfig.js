import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/api', // Base URL for the API
});

// Request interceptor to attach token to headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
