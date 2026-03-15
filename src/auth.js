// Change these credentials before deploying
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Aramazd2024';

export function login(username, password) {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem('admin_auth', '1');
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('admin_auth');
}

export function isAuthenticated() {
  return localStorage.getItem('admin_auth') === '1';
}
