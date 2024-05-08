export const POST = 'POST';
export const GET = 'GET';
export const PATCH = 'PATCH';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const APPLICATION_JSON = 'application/json';
export const FORM_DATA = 'multipart/form-data';
export const STATUS_FAIL = 'Fail';
export const STATUS_SUCCESS = 'Success';
export const MESSAGE_JWT_EXPIRED = 'jwt expired';
export const BASE_URL = 'https://sneakertrades-40ac0b208284.herokuapp.com';
export const HEADERS = (headers = {}) => {
  return {...headers, 'Content-Type': APPLICATION_JSON};
};

export const HEADERS_FOR_FORM_DATA = (headers = {}) => {
  return {...headers, 'Content-Type': FORM_DATA};
};
