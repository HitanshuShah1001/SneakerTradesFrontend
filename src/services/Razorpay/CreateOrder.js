import {CREATE_ORDER_RAZORPAY} from '../../constants/Apicall';
import {POST} from '../../constants/ApiParams';
import {body, myHeaders} from './Constants';

export const CreateOrderForRazorPay = async () => {
  const requestOptions = {
    method: POST,
    headers: myHeaders,
    body: JSON.stringify(body),
  };
  try {
    let response = await fetch(CREATE_ORDER_RAZORPAY, requestOptions);
    let textualresponse = await response.text();
    return textualresponse;
  } catch (e) {
    console.log(error, 'Error');
  }
};
