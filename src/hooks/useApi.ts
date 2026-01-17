import { useState, useCallback } from 'react';

// Base API URL - replace with your actual API URL
const API_BASE_URL = '/api';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Helper to get auth token
const getAuthToken = () => localStorage.getItem('admin_token');

// Generic fetch wrapper with auth
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const token = getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

// Hook for API calls
export function useApi<T>() {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(async (
    endpoint: string,
    options: RequestInit = {}
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await apiFetch<T>(endpoint, options);
    
    setState({
      data: result.data,
      error: result.error,
      loading: false,
    });

    return result;
  }, []);

  return { ...state, execute };
}

// CRUD API functions (to be used with your backend)
export const api = {
  // Notices
  notices: {
    getAll: () => apiFetch('/notices'),
    getById: (id: string) => apiFetch(`/notices/${id}`),
    create: (data: any) => apiFetch('/notices', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiFetch(`/notices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => apiFetch(`/notices/${id}`, { method: 'DELETE' }),
  },
  
  // Events
  events: {
    getAll: () => apiFetch('/events'),
    getById: (id: string) => apiFetch(`/events/${id}`),
    create: (data: any) => apiFetch('/events', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiFetch(`/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => apiFetch(`/events/${id}`, { method: 'DELETE' }),
  },
  
  // Faculty
  faculty: {
    getAll: () => apiFetch('/faculty'),
    getById: (id: string) => apiFetch(`/faculty/${id}`),
    create: (data: any) => apiFetch('/faculty', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiFetch(`/faculty/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => apiFetch(`/faculty/${id}`, { method: 'DELETE' }),
  },
  
  // Courses
  courses: {
    getAll: () => apiFetch('/courses'),
    getById: (id: string) => apiFetch(`/courses/${id}`),
    create: (data: any) => apiFetch('/courses', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiFetch(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => apiFetch(`/courses/${id}`, { method: 'DELETE' }),
  },
  
  // Results
  results: {
    getAll: () => apiFetch('/results'),
    getById: (id: string) => apiFetch(`/results/${id}`),
    create: (data: any) => apiFetch('/results', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiFetch(`/results/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => apiFetch(`/results/${id}`, { method: 'DELETE' }),
  },
  
  // Examination
  examination: {
    getAll: () => apiFetch('/examination'),
    getById: (id: string) => apiFetch(`/examination/${id}`),
    create: (data: any) => apiFetch('/examination', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiFetch(`/examination/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => apiFetch(`/examination/${id}`, { method: 'DELETE' }),
  },
  
  // Pages
  pages: {
    getAll: () => apiFetch('/pages'),
    getById: (id: string) => apiFetch(`/pages/${id}`),
    update: (id: string, data: any) => apiFetch(`/pages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  },
  
  // Media
  media: {
    getAll: () => apiFetch('/media'),
    upload: (formData: FormData) => apiFetch('/media/upload', { 
      method: 'POST', 
      body: formData,
      headers: {} // Let browser set Content-Type for FormData
    }),
    delete: (id: string) => apiFetch(`/media/${id}`, { method: 'DELETE' }),
  },
};
