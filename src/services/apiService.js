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
  patchWithoutBody: async (token, endpoint, headers = {}) => {
    try {
      console.log(token, 'token');
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const apiresponse = await response.json();

      if (apiresponse.message.message == 'jwt malformed') {
        return {data: undefined, message: `Log User Out`};
      }
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
