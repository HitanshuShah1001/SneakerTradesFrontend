import {Alert} from 'react-native';
import {
  BASE_URL,
  DELETE,
  GET,
  HEADERS,
  PATCH,
  POST,
  PUT,
} from '../constants/ApiParams';
import {
  RemoveTokenFromLocalStorage,
  RetrieveTokenFromLocalStorage,
} from '../utils/GetDeleteStoreTokenInLocalStorage';
import {RemoveUserFromLocalStorage} from '../utils/GetDeleteStoreUserDetailsInLocalStorage';

class ApiService {
  async responseHandler(apiresponse) {
    const {status, Data} = apiresponse || {};
    if (status === 'Fail') {
      if (Data?.message === 'jwt expired') {
        return await Promise.allSettled([
          RemoveTokenFromLocalStorage(),
          RemoveUserFromLocalStorage(),
        ]);
      } else {
        return Data;
      }
    } else {
      return Data;
    }
  }

  async get(endpoint) {
    try {
      const token = await RetrieveTokenFromLocalStorage();
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: GET,
        headers: {...HEADERS(), Authorization: `Bearer ${token}`},
      });
      const apiresponse = await response.json();
      return this.responseHandler(apiresponse);
    } catch (error) {
      console.log(error);
    }
  }

  async post(endpoint, body, headers = {}) {
    try {
      const token = await RetrieveTokenFromLocalStorage();
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: POST,
        body: JSON.stringify(body),
        headers: {...HEADERS(), Authorization: `Bearer ${token}`},
      });
      const apiresponse = await response.json();
      return this.responseHandler(apiresponse);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async postformdata(endpoint, body) {
    try {
      const token = await RetrieveTokenFromLocalStorage();
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: POST,
        body,
        headers: {...HEADERS(), Authorization: `Bearer ${token}`},
      });
      const apiresponse = await response.json();
      return this.responseHandler(apiresponse);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async patchformdata(endpoint, body, headers = {}) {
    try {
      const token = await RetrieveTokenFromLocalStorage();
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: PATCH,
        body,
        headers: {...HEADERS(), Authorization: `Bearer ${token}`},
      });
      const apiresponse = await response.json();
      return this.responseHandler(apiresponse);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async put(endpoint, body) {
    try {
      const token = await RetrieveTokenFromLocalStorage();
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: PUT,
        body: JSON.stringify(body),
        headers: {...HEADERS(), Authorization: `Bearer ${token}`},
      });
      const apiresponse = await response.json();
      return this.responseHandler(apiresponse);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async patchWithoutBody(endpoint) {
    try {
      const token = await RetrieveTokenFromLocalStorage();
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: PATCH,
        headers: {...HEADERS(), Authorization: `Bearer ${token}`},
      });
      const apiresponse = await response.json();
      return this.responseHandler(apiresponse);
    } catch (error) {
      throw new Error(error);
    }
  }
  async delete(endpoint, headers = {}) {
    try {
      const token = await RetrieveTokenFromLocalStorage();
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: DELETE,
        headers: {...HEADERS(headers), Authorization: `Bearer ${token}`},
      });
      const apiresponse = await response.json();
      const {status} = apiresponse || {};
      if (status === 'Success') {
        return 'Deleted Succesfully';
      }
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const apiService = new ApiService();
