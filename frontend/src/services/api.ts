import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { type ApiResponse, type DatabaseTime, type User } from '../types';

const api: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Type-safe API methods
export const apiService = {
  // Test connection
  test: async (): Promise<ApiResponse<string>> => {
    const response: AxiosResponse<ApiResponse<string>> = await api.get('/test');
    return response.data;
  },

  // Get database time
  getData: async (): Promise<ApiResponse<DatabaseTime>> => {
    const response = await api.get('/data');
    return response.data;
  },

  // Create user
  createUser: async (name: string, email: string): Promise<ApiResponse<User>> => {
    const response = await api.post('/users', { name, email });
    return response.data;
  },

  // Get all users (example)
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get('/users');
    return response.data;
  },
};

export default api;