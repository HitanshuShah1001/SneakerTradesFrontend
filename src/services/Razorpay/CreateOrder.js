import {CREATE_ORDER_RAZORPAY} from '../../constants/Apicall';
import {body, myHeaders} from './Constants';

export const CreateOrderForRazorPay = async () => {
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body,
  };

  fetch(CREATE_ORDER_RAZORPAY, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};
