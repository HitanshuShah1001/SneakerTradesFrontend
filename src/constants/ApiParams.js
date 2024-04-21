export const POST = 'POST';
export const GET = 'GET';
export const PATCH = 'PATCH';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const APPLICATION_JSON = 'application/json';
export const STATUS_FAIL = 'Fail';
export const STATUS_SUCCESS = 'Success';
export const MESSAGE_JWT_EXPIRED = 'jwt expired';
export const BASE_URL = 'http://localhost:4000';
export const HEADERS = (headers = {}) => {
  return {...headers, 'Content-Type': APPLICATION_JSON};
};
