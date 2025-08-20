import { apiFetch } from './api';

export type LoginPayload = { login: string; password: string };
export type LoginResponse = { token: string };

export async function login(payload: LoginPayload): Promise<void> {
  const data = await apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  localStorage.setItem('token', data.token);
}

export function logout() {
  localStorage.removeItem('token');
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}
