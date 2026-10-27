const API_BASE = process.env.REACT_APP_API_URL || 'https://gallery-backend-1-icba.onrender.com';

function authHeaders() {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `POST ${path} failed: ${res.status}`);
  }
  return res.json();
}

export async function apiPostForm(path, formData) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `POST ${path} failed: ${res.status}`);
  }
  return res.json();
}

export async function apiPutForm(path, formData) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `PUT ${path} failed: ${res.status}`);
  }
  return res.json();
}

export async function apiDelete(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
}
