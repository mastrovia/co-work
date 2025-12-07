import axiosInstance from './axios';
import { tokenStorage } from '@/lib/utils/token';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ApiError {
  success: boolean;
  message: string;
  error?: string;
}

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      '/auth/login',
      credentials
    );

    // Store token and user data
    if (response.data.success && response.data.token) {
      tokenStorage.setToken(response.data.token);
      tokenStorage.setUser(JSON.stringify(response.data.user));
    }

    return response.data;
  },

  async logout(): Promise<void> {
    tokenStorage.clearAll();
    await axiosInstance.post('/auth/logout');
    // Optionally call logout endpoint if backend has one
  },

  getCurrentUser(): User | null {
    const userStr = tokenStorage.getUser();
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!tokenStorage.getToken();
  },
};
