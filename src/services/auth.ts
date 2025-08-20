import api from './api';

export type LoginPayload = { login: string; password: string };
export type LoginResponse = { token: string; user: any };

export async function login(payload: LoginPayload): Promise<void> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', payload);
    const { token, user } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login');
  }
}

export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

export function getCurrentUser(): any {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}