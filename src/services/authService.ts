// services/authService.ts
import axios from './axiosConfig'; // Importar la instancia configurada
import type { LoginRequest, LoginResponse } from '../shared/types/authTypes';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('🔐 Login attempt...');
      
      const response = await axios.post<LoginResponse>(
        '/auth/login',
        credentials,
        {
          withCredentials: true // Asegurar que envíe cookies
        }
      );
      
      console.log('✅ Login successful');
      return response.data;
    } catch (error: any) {
      console.error('❌ Login error:', error);
      throw error;
    }
  }

  async refreshToken(): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        '/auth/refresh',
        {},
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('❌ Refresh token error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(
        '/auth/logout',
        {},
        {
          withCredentials: true
        }
      );
    } catch (error: any) {
      console.error('❌ Logout error:', error);
      // Aún así proceder con logout local
    }
  }
}

export const authService = new AuthService();