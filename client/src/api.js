const API_URL = 'http://localhost:5001/api';

export function getToken() {
  return localStorage.getItem('token');
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Login failed');

  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data.user;
}

export async function registerUser(full_name, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ full_name, email, password })
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Register failed');

  return data;
}

export async function getMyProfile() {
  const res = await fetch(`${API_URL}/profiles/me`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Profile failed');

  return data;
}

export async function saveMyProfile(profile) {
  const res = await fetch(`${API_URL}/profiles/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(profile)
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Save failed');

  return data;
}

export async function getAllProfiles() {
  const res = await fetch(`${API_URL}/profiles/all`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'HR view failed');

  return data;
}
