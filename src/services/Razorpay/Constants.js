import {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} from '@env';
import base64 from 'react-native-base64';
import {
  AMOUNT,
  CURRENCY,
  DESCRIPTION,
  SNEAKER_TRADES_CORP,
} from '../../constants/Razorpay';
import {THEME_PINK} from '../../constants/colorsandfonts';

export const body = {
  amount: 20000,
  currency: CURRENCY,
};

export let myHeaders = new Headers();
myHeaders.append('content-type', 'application/json');
myHeaders.append(
  'Authorization',
  'Basic ' + base64.encode(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`),
);

export const generateRazorpayOptions = ({prefill = {}, order_id}) => {
  return {
    description: DESCRIPTION,
    image: 'https://ibb.co/jyLvCGZ',
    currency: CURRENCY,
    key: RAZORPAY_KEY_ID,
    amount: AMOUNT,
    name: SNEAKER_TRADES_CORP,
    order_id: order_id,
    prefill,
    theme: {color: THEME_PINK},
  };
};
