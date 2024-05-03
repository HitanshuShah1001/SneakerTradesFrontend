import RazorpayCheckout from 'react-native-razorpay';
import {generateRazorpayOptions} from '../services/Razorpay/Constants';
import {CreateOrderForRazorPay} from '../services/Razorpay/CreateOrder';
import {apiService} from '../services/apiService';
import {SAVE_SUBSCRIPTION_DETAILS} from '../constants/Apicall';
import {AlertMessage} from '../utils/Alertmessage';
import {Alert} from 'react-native';

export const askForPremiumSubs = () =>
  Alert.alert('Do you want to upgrade to premium', '', [
    {
      text: 'YES',
      onPress: async () => {
        try {
          const order_details = await CreateOrderForRazorPay();
          const order_id = JSON.parse(order_details).id;
          const paymentdetailstosave = await RazorpayCheckout.open(
            generateRazorpayOptions({order_id}),
          );
          const userresponse = await apiService.post(
            SAVE_SUBSCRIPTION_DETAILS,
            paymentdetailstosave,
          );
          console.log(userresponse);
          AlertMessage('You have subscribed succesfully');
        } catch (e) {
          alert(`Error: ${e.code} | ${e.description}`);
        }
      },
    },

    {
      text: 'NO',
      onPress: () => {},
    },
  ]);
