import {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} from '@env';
export const body = {
  amount: 20000,
  currency: 'INR',
};

export let myHeaders = new Headers();
myHeaders.append('content-type', 'application/json');
myHeaders.append(
  'Authorization',
  'Basic ' + base64.encode(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`),
);
