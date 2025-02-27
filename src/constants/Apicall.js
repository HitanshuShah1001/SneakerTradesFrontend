export const SIGN_UP_CALL = 'user/signUp';
export const LOGIN_CALL = 'user/login';
export const UPDATE_PROFILE_CALL = 'user/update';
export const RESET_PASSWORD_CALL = 'user/resetpassword';
export const UPLOAD_CALL = 'sneaker/upload';
export const UPLOAD_REQUEST_CALL = 'sneakerrequests/createrequest';
export const GET_SNEAKERS_OWNED = `sneaker/getsneakersowned`;
export const CHECK_IF_USERNAME_EMAIL_PHONE_EXISTS = `user/usernameemailphoneexists`;
export const SEND_OTP_EMAIL_FOR_SIGNUP = `user/sendemailforsignup`;
export const SEND_OTP_EMAIL_FOR_RESET_PASSWORD = `user/sendemailforresetpassword`;
export const GET_SNEAKER_REQUESTS_CREATED = `sneakerrequests/requestscreated`;
export const SAVE_SUBSCRIPTION_DETAILS = `usersubscription/savesubscriptiondetails`;
export const RAISE_QUERY_CALL = `user/raisequery`;
export const CREATE_ORDER_RAZORPAY = `https://api.razorpay.com/v1/orders`;
export const DELETE_USER = `user/delete`;
export const DELETE_SNEAKER_CALL = id => `sneaker/delete/${id}`;
export const DELETE_SNEAKER_REQUEST_CALL = id => `sneakerrequests/delete/${id}`;
export const GET_SNEAKER_FOR_PURCHASE_AND_BORROW_CALL = ({page, limit = 10}) =>
  `sneaker/forpurchaseandborrow?page=${page}&limit=${limit}`;
export const GET_SNEAKERREQUESTS_CALL = ({page, limit = 10}) =>
  `sneakerrequests/requests?page=${page}&limit=${limit}`;
