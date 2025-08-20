import axios from 'axios';

export function getToken(): string | null {
  return localStorage.getItem("token");
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    // Garantir que headers existe
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;