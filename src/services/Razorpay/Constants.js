import {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} from '@env';
import base64 from 'react-native-base64';
import {
  AMOUNT,
  CURRENCY,
  DESCRIPTION,
  RZP_IMAGE,
  SNEAKER_TRADES_CORP,
} from '../../constants/Razorpay';
import {THEME_PINK} from '../../constants/colorsandfonts';
import {APPLICATION_JSON} from '../../constants/ApiParams';

export const body = {
  amount: 20000,
  currency: CURRENCY,
};

export let myHeaders = new Headers();
myHeaders.append('content-type', APPLICATION_JSON);
myHeaders.append(
  'Authorization',
  'Basic ' + base64.encode(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`),
);

export const generateRazorpayOptions = ({prefill = {}, order_id}) => {
  return {
    description: DESCRIPTION,
    image: RZP_IMAGE,
    currency: CURRENCY,
    key: RAZORPAY_KEY_ID,
    amount: AMOUNT,
    name: SNEAKER_TRADES_CORP,
    order_id: order_id,
    prefill,
    theme: {color: THEME_PINK},
  };
};
