import axios from 'axios';

export const baseURL = 'http://localhost:9091/api/';

export const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 30000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
