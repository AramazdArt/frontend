import { apiPost } from './api';

export async function login(username, password) {
  try {
    const data = await apiPost('/api/auth/login', { username, password });
    localStorage.setItem('admin_token', data.token);
    return true;
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem('admin_token');
}

export function isAuthenticated() {
  const token = localStorage.getItem('admin_token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
