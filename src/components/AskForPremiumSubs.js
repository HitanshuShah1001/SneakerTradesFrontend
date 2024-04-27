import {Alert} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {generateRazorpayOptions} from '../services/Razorpay/Constants';

export const askForPremiumSubs = () =>
  Alert.alert('Do you want to upgrade to premium', '', [
    {
      text: 'YES',
      onPress: () =>
        RazorpayCheckout.open(generateRazorpayOptions({order_id: 'qwqw11212'}))
          .then(data => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          })
          .catch(error => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          }),
    },

    {
      text: 'NO',
      onPress: () => {},
    },
  ]);
