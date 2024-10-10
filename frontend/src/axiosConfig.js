import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/', // Update this for production
  withCredentials: true, // Ensure credentials are sent
});

// Add CSRF token and Authorization token to headers for every request
axiosInstance.interceptors.request.use((config) => {
  const csrftoken = Cookies.get('csrftoken'); // Get CSRF token
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken; // Include CSRF token
  }

  // Get the token from local storage and include it in the Authorization header
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`; // Include the token
  }

  return config;
});

// Handle response errors
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Handle unauthorized access (for example, redirect to login)
      console.error("Unauthorized! Redirecting to login...");
      window.location.href = '/login'; // Change this to your login route
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
