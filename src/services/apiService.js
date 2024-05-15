import {
  BASE_URL,
  DELETE,
  GET,
  HEADERS,
  PATCH,
  POST,
  PUT,
  STATUS_FAIL,
  STATUS_SUCCESS,
} from '../constants/ApiParams';
import {
  DELETED_SUCCESFULLY,
  TOKEN_EXPIRED_STATUSES,
} from '../constants/Backendresponses';
import {SOME_ERROR_OCCURED} from '../constants/Messages';
import {AlertMessage} from '../utils/Alertmessage';
import {
  RemoveTokenFromLocalStorage,
  RetrieveTokenFromLocalStorage,
} from '../utils/GetDeleteStoreTokenInLocalStorage';
import {RemoveUserFromLocalStorage} from '../utils/GetDeleteStoreUserDetailsInLocalStorage';

class ApiService {
  async responseHandler(apiresponse) {
    const {status, Data, message} = apiresponse || {};
    if (status === STATUS_FAIL) {
      if (TOKEN_EXPIRED_STATUSES.includes(Data?.message)) {
        return await Promise.allSettled([
          RemoveTokenFromLocalStorage(),
          RemoveUserFromLocalStorage(),
        ]);
      } else {
        return {status, Data};
      }
    } else {
      return {status, Data, message};
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
    } catch (error) {}
  }

  async post(endpoint, body) {
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
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      const apiresponse = await response.json();
      return this.responseHandler(apiresponse);
    } catch (error) {
      console.log(error);
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
      if (status === STATUS_SUCCESS) {
        return DELETED_SUCCESFULLY;
      } else {
        return AlertMessage(SOME_ERROR_OCCURED);
      }
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const apiService = new ApiService();
