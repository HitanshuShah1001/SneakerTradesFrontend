import {useContext, useState} from 'react';
import {Pressable, View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import {SafeArea} from '../../components/SafeArea';
import {apiService} from '../../services/apiService';
import {LOGIN} from '../../constants/Buttontitles';
import {StoreTokenInLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {StoreUserInLocalStorage} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {Context} from '../../navigation/BottomTab';
import {
  LOGIN_CALL,
  SEND_OTP_EMAIL_FOR_RESET_PASSWORD,
} from '../../constants/Apicall';
import {setNotificationTimer} from '../../components/NotificationTimer';
import {AlertMessage} from '../../utils/Alertmessage';
import {STATUS_FAIL, STATUS_SUCCESS} from '../../constants/ApiParams';
import {styles} from './styles';
import {EMAIL_ID, PASSWORD} from '../../constants/Labels';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {OTP_VERIFY, UPLOAD} from '../../constants/Screen';
import {isValidEmail} from '../../utils/RegexTests';
import {ENTER_A_VALID_EMAIL, FILL_DETAILS} from '../../constants/Messages';

export const Login = props => {
  const navigation = useNavigation();
  const {navigateTo, additionalParam} = props.route.params || {};
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const {setUser, setLoading} = useContext(Context);
  const login = async () => {
    if (!Email || !Password) {
      return AlertMessage(FILL_DETAILS);
    }
    setLoading(true);
    const response = await apiService.postwithouttoken(LOGIN_CALL, {
      Email,
      Password,
    });
    setLoading(false);
    if (response.status === STATUS_FAIL) {
      return AlertMessage(response.Data);
    } else {
      setUser(response.user);
      Promise.allSettled([
        StoreTokenInLocalStorage({token: response.Data.token}),
        StoreUserInLocalStorage({userData: response.Data.user}),
        setNotificationTimer(),
      ]).then(() => {
        navigation.navigate(navigateTo ?? UPLOAD, {
          sneaker: additionalParam,
        });
      });
    }
  };

  const forgotPassword = async () => {
    if (!isValidEmail(Email) || !Email) {
      return AlertMessage(ENTER_A_VALID_EMAIL);
    }
    setLoading(true);
    const response = await apiService.postwithouttoken(
      SEND_OTP_EMAIL_FOR_RESET_PASSWORD,
      {
        Email,
      },
    );
    if (response.status === STATUS_SUCCESS) {
      navigation.navigate(OTP_VERIFY, {
        forgotPasswordAction: true,
        userDataForForgotPassword: {
          otp: response.Data.otp,
          Email,
        },
      });
    } else {
      return AlertMessage(response.Data);
    }
  };
  return (
    <SafeArea go_back>
      <Brandiconandtext />
      <View style={styles.inputcontainer}>
        <Textinput
          placeholder={EMAIL_ID}
          custVal={Email}
          setCustVal={setEmail}
        />
        <Textinput
          placeholder={PASSWORD}
          custVal={Password}
          setCustVal={setPassword}
          props={{secureTextEntry: true}}
        />
        <Pressable style={{marginTop: 10}} onPress={() => forgotPassword()}>
          <Text style={styles.navigator}>Forgot password?</Text>
        </Pressable>
      </View>
      <AuthenticationButton
        text={LOGIN}
        onPress={() => login()}
        showsignup={true}
      />
    </SafeArea>
  );
};
