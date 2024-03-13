const BASE_URL = 'http://localhost:4000';

export const apiService = {
  get: async (endpoint, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });
      const apiresponse = await response.json();
      console.log(apiresponse, 'api response in backend');
      return apiresponse.Data;
    } catch (error) {
      console.log(error);
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
      const apiresponse = await response.json();
      return apiresponse.data;
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
      const apiresponse = await response.json();
      return apiresponse.data;
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
      const apiresponse = await response.json();
      return apiresponse.data;
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
      const apiresponse = await response.json();
      return apiresponse.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
