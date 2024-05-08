import RazorpayCheckout from 'react-native-razorpay';
import {generateRazorpayOptions} from '../services/Razorpay/Constants';
import {CreateOrderForRazorPay} from '../services/Razorpay/CreateOrder';
import {apiService} from '../services/apiService';
import {SAVE_SUBSCRIPTION_DETAILS} from '../constants/Apicall';
import {AlertMessage} from '../utils/Alertmessage';
import {Alert} from 'react-native';
import {
  DO_YOU_WANT_TO_UPGRADE_TO_PREMIUM,
  NO_LABEL,
  YES_LABEL,
  YOU_HAVE_SUBSCRIBED_SUCCESFULLY,
} from '../constants/Razorpay';
import {RetrieveUserFromLocalStorage} from '../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {gneratePrefill} from '../utils/GeneratePrefill';

export const askForPremiumSubs = () =>
  Alert.alert(DO_YOU_WANT_TO_UPGRADE_TO_PREMIUM, '', [
    {
      text: YES_LABEL,
      onPress: async () => {
        try {
          const [order_details, user] = await Promise.all([
            CreateOrderForRazorPay(),
            RetrieveUserFromLocalStorage(),
          ]);
          const prefill = gneratePrefill(user);
          const order_id = JSON.parse(order_details).id;
          const paymentdetailstosave = await RazorpayCheckout.open(
            generateRazorpayOptions({order_id, prefill}),
          );
          const userresponse = await apiService.post(
            SAVE_SUBSCRIPTION_DETAILS,
            paymentdetailstosave,
          );
          AlertMessage(YOU_HAVE_SUBSCRIBED_SUCCESFULLY);
        } catch (e) {
          alert(`Error: ${e.code} | ${e.description}`);
        }
      },
    },

    {
      text: NO_LABEL,
      onPress: () => {},
    },
  ]);
