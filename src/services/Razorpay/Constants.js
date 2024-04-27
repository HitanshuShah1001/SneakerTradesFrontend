import {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} from '@env';
import base64 from 'react-native-base64';
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

export const generateRazorpayOptions = ({prefill = {}, order_id}) => {
  return {
    description: 'Sneaker Trades Premium Subscription!',
    image: 'https://ibb.co/jyLvCGZ',
    currency: 'INR',
    key: RAZORPAY_KEY_ID,
    amount: '20000',
    name: 'Sneaker Trades Corp',
    order_id: order_id,
    prefill,
    theme: {color: '#53a20e'},
  };
};
