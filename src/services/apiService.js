import {Alert} from 'react-native';
import {
  APPLICATION_JSON,
  BASE_URL,
  GET,
  HEADERS,
  POST,
  PUT,
} from '../constants/ApiParams';
import {RemoveTokenFromLocalStorage} from '../utils/GetDeleteStoreTokenInLocalStorage';
import {RemoveUserFromLocalStorage} from '../utils/GetDeleteStoreUserDetailsInLocalStorage';

export const responseHandler = async apiresponse => {
  const {status, Data} = apiresponse || {};
  if (status === 'Fail') {
    if (Data?.message == 'jwt expired') {
      return await Promise.allSettled([
        RemoveTokenFromLocalStorage(),
        RemoveUserFromLocalStorage(),
      ]);
    } else {
      Alert.alert(Data);
    }
  } else {
    return Data;
  }
};
export const apiService = {
  get: async (endpoint, headers = {}, body) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: GET,
        headers: HEADERS(headers),
        body: JSON.stringify(body),
      });
      const apiresponse = await response.json();
      return responseHandler(apiresponse);
    } catch (error) {
      console.log(error);
    }
  },
  post: async (endpoint, body, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: POST,
        body: JSON.stringify(body),
        headers: HEADERS(headers),
      });
      const apiresponse = await response.json();
      return responseHandler(apiresponse);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  postformdata: async (endpoint, body, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: POST,
        body,
        headers: {
          ...headers,
        },
      });
      const apiresponse = await response.json();
      return responseHandler(apiresponse);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  put: async (endpoint, body, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: PUT,
        body: JSON.stringify(body),
        headers: HEADERS(headers),
      });
      const apiresponse = await response.json();
      return responseHandler(apiresponse);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  patchWithoutBody: async (token, endpoint, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': APPLICATION_JSON,
        },
      });

      const apiresponse = await response.json();
      return responseHandler(apiresponse);
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (endpoint, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: HEADERS(headers),
      });
      const apiresponse = await response.json();
      return responseHandler(apiresponse);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
