export const SIGN_UP_CALL = 'user/signUp';
export const LOGIN_CALL = 'user/login';
export const UPDATE_PROFILE_CALL = 'user/update';
export const RESET_PASSWORD_CALL = 'user/resetpassword';
export const UPLOAD_CALL = 'sneaker/upload';
export const UPLOAD_REQUEST_CALL = 'sneakerrequests/createrequest';
export const GET_SNEAKER_FOR_PURCHASE_AND_BORROW = `sneaker/forpurchaseandborrow`;
export const GET_SNEAKER_REQUESTS = `sneakerrequests/requests`;
export const GET_SNEAKERS_OWNED = `sneaker/getsneakersowned`;
export const CHECK_IF_USERNAME_EMAIL_PHONE_EXISTS = `user/usernameemailphoneexists`;
export const SEND_OTP_EMAIL = `user/sendemail`;
export const GET_SNEAKER_REQUESTS_CREATED = `sneakerrequests/requestscreated`;
export const SAVE_SUBSCRIPTION_DETAILS = `usersubscription/savesubscriptiondetails`;
export const CREATE_ORDER_RAZORPAY = `https://api.razorpay.com/v1/orders`;
export const DELETE_SNEAKER_CALL = id => `sneaker/delete/${id}`;
export const DELETE_SNEAKER_REQUEST_CALL = id => `sneakerrequests/delete/${id}`;
