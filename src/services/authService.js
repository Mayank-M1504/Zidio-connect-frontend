// authService.js
// Stub for authentication API integration

export const login = async (data) => {
  // Example: return fetch('/api/login', { method: 'POST', body: JSON.stringify(data) })
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};

export const signup = async (data) => {
  // Example: return fetch('/api/signup', { method: 'POST', body: JSON.stringify(data) })
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
}; 