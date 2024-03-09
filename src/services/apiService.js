// apiService.js

const BASE_URL = 'https://api.example.com';

export const apiService = {
  get: async (endpoint, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  post: async (endpoint, body, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  put: async (endpoint, body, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  patch: async (endpoint, body, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  delete: async (endpoint, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
