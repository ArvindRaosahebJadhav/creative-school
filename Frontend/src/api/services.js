import apiClient from './axios';

// Teachers API
export const teachersAPI = {
  getAll: () => apiClient.get('/teachers'),
  getById: (id) => apiClient.get(`/teachers/${id}`),
  create: (data) => apiClient.post('/teachers', data),
  update: (id, data) => apiClient.put(`/teachers/${id}`, data),
  delete: (id) => apiClient.delete(`/teachers/${id}`),
};

// Gallery API
export const galleryAPI = {
  getAll: () => apiClient.get('/gallery'),
  getById: (id) => apiClient.get(`/gallery/${id}`),
  getByType: (type) => apiClient.get(`/gallery?type=${type}`),
  getByCategory: (category) => apiClient.get(`/gallery?category=${category}`),
  create: (data) => apiClient.post('/gallery', data),
  update: (id, data) => apiClient.put(`/gallery/${id}`, data),
  delete: (id) => apiClient.delete(`/gallery/${id}`),
};

// Events API
export const eventsAPI = {
  getAll: () => apiClient.get('/events'),
  getById: (id) => apiClient.get(`/events/${id}`),
  create: (data) => apiClient.post('/events', data),
  update: (id, data) => apiClient.put(`/events/${id}`, data),
  delete: (id) => apiClient.delete(`/events/${id}`),
};

// Achievements API
export const achievementsAPI = {
  getAll: () => apiClient.get('/achievements'),
  getById: (id) => apiClient.get(`/achievements/${id}`),
  getByCategory: (category) => apiClient.get(`/achievements?category=${category}`),
  create: (data) => apiClient.post('/achievements', data),
  update: (id, data) => apiClient.put(`/achievements/${id}`, data),
  delete: (id) => apiClient.delete(`/achievements/${id}`),
};

// Announcements API
export const announcementsAPI = {
  getAll: () => apiClient.get('/announcements'),
  getActive: () => apiClient.get('/announcements?active=true'),
  getById: (id) => apiClient.get(`/announcements/${id}`),
  create: (data) => apiClient.post('/announcements', data),
  update: (id, data) => apiClient.put(`/announcements/${id}`, data),
  delete: (id) => apiClient.delete(`/announcements/${id}`),
};

// Authentication API
export const authAPI = {
  login: (username, password) => apiClient.post('/auth/login', { username, password }),
  register: (username, password) => apiClient.post('/auth/register', { username, password }),
};

// School Info API
export const schoolInfoAPI = {
  getAll: () => apiClient.get('/school-info'),
  getByKey: (key) => apiClient.get(`/school-info/${key}`),
  create: (key, value) => apiClient.post('/school-info', { key, value }),
  update: (key, value) => apiClient.put(`/school-info/${key}`, { value }),
  delete: (key) => apiClient.delete(`/school-info/${key}`),
};
