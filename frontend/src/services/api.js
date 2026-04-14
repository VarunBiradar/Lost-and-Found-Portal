const API_BASE = 'http://localhost:8080/api';

const getHeaders = (includeAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Something went wrong');
  }
  return data;
};

// ===== Auth =====
export const register = (data) =>
  fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const login = (data) =>
  fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const getProfile = () =>
  fetch(`${API_BASE}/users/me`, {
    headers: getHeaders(true),
  }).then(handleResponse);

export const updateProfile = (data) =>
  fetch(`${API_BASE}/users/me`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(data),
  }).then(handleResponse);

// ===== Lost Items =====
export const reportLostItem = (data) =>
  fetch(`${API_BASE}/lost-items`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const getLostItems = () =>
  fetch(`${API_BASE}/lost-items`, {
    headers: getHeaders(),
  }).then(handleResponse);

export const getLostItem = (id) =>
  fetch(`${API_BASE}/lost-items/${id}`, {
    headers: getHeaders(),
  }).then(handleResponse);

export const searchLostItems = (keyword) =>
  fetch(`${API_BASE}/lost-items/search?keyword=${encodeURIComponent(keyword)}`, {
    headers: getHeaders(),
  }).then(handleResponse);

export const getLostItemsByCategory = (category) =>
  fetch(`${API_BASE}/lost-items/category/${encodeURIComponent(category)}`, {
    headers: getHeaders(),
  }).then(handleResponse);

export const getMyLostItems = () =>
  fetch(`${API_BASE}/lost-items/my`, {
    headers: getHeaders(true),
  }).then(handleResponse);

export const updateLostItemStatus = (id, status) =>
  fetch(`${API_BASE}/lost-items/${id}/status?status=${status}`, {
    method: 'PUT',
    headers: getHeaders(true),
  }).then(handleResponse);

// ===== Found Items =====
export const reportFoundItem = (data) =>
  fetch(`${API_BASE}/found-items`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const getFoundItems = () =>
  fetch(`${API_BASE}/found-items`, {
    headers: getHeaders(),
  }).then(handleResponse);

export const getFoundItem = (id) =>
  fetch(`${API_BASE}/found-items/${id}`, {
    headers: getHeaders(),
  }).then(handleResponse);

export const searchFoundItems = (keyword) =>
  fetch(`${API_BASE}/found-items/search?keyword=${encodeURIComponent(keyword)}`, {
    headers: getHeaders(),
  }).then(handleResponse);

export const getFoundItemsByCategory = (category) =>
  fetch(`${API_BASE}/found-items/category/${encodeURIComponent(category)}`, {
    headers: getHeaders(),
  }).then(handleResponse);

export const getMyFoundItems = () =>
  fetch(`${API_BASE}/found-items/my`, {
    headers: getHeaders(true),
  }).then(handleResponse);

export const updateFoundItemStatus = (id, status) =>
  fetch(`${API_BASE}/found-items/${id}/status?status=${status}`, {
    method: 'PUT',
    headers: getHeaders(true),
  }).then(handleResponse);

// ===== Claims =====
export const submitClaim = (data) =>
  fetch(`${API_BASE}/claims`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const getMyClaims = () =>
  fetch(`${API_BASE}/claims/my`, {
    headers: getHeaders(true),
  }).then(handleResponse);

export const getClaimsForItem = (itemId) =>
  fetch(`${API_BASE}/claims/item/${itemId}`, {
    headers: getHeaders(true),
  }).then(handleResponse);

export const approveClaim = (id) =>
  fetch(`${API_BASE}/claims/${id}/approve`, {
    method: 'PUT',
    headers: getHeaders(true),
  }).then(handleResponse);

export const rejectClaim = (id) =>
  fetch(`${API_BASE}/claims/${id}/reject`, {
    method: 'PUT',
    headers: getHeaders(true),
  }).then(handleResponse);

// ===== Stats =====
export const getStats = () =>
  fetch(`${API_BASE}/stats`, {
    headers: getHeaders(),
  }).then(handleResponse);
