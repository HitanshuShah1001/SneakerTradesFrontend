import {useContext, useState} from 'react';
import {View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import {useNavigation} from '@react-navigation/native';
import {SafeArea} from '../../components/SafeArea';
import {apiService} from '../../services/apiService';
import {OTP_VERIFY} from '../../constants/Screen';
import {GENERATE_OTP} from '../../constants/Buttontitles';
import {StoreTokenInLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {StoreUserInLocalStorage} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {Context} from '../../navigation/BottomTab';
import {LOGIN_CALL} from '../../constants/Apicall';
import {setNotificationTimer} from '../../components/NotificationTimer';
import {ENTER_TEN_DIGIT_MOBILE_NUMBER} from '../../constants/Placeholders';
import {AlertMessage} from '../../utils/Alertmessage';
import {STATUS_FAIL} from '../../constants/ApiParams';
import {styles} from './styles';

export const Login = () => {
  const navigation = useNavigation();
  const [Phone, setPhone] = useState('');
  const {setLoading} = useContext(Context);
  const checkIfUserExists = async () => {
    setLoading(true);
    const response = await apiService.post(LOGIN_CALL, {
      Phone,
    });
    console.log(response);
    if (response.status === STATUS_FAIL) {
      setLoading(false);
      return AlertMessage(response.Data);
    } else {
      setLoading(false);
      await Promise.allSettled([
        StoreTokenInLocalStorage({token: response.Data.token}),
        StoreUserInLocalStorage({userData: response.Data.user}),
        setNotificationTimer(),
      ]);
      navigation.navigate(OTP_VERIFY, {
        userData: {...response.Data.user, token: response.Data.token},
      });
    }
  };
  return (
    <SafeArea>
      <Brandiconandtext />
      <View style={styles.inputcontainer}>
        <Textinput
          placeholder={ENTER_TEN_DIGIT_MOBILE_NUMBER}
          custVal={Phone}
          setCustVal={setPhone}
        />
      </View>
      <AuthenticationButton
        text={GENERATE_OTP}
        onPress={() => checkIfUserExists()}
        showsignup={true}
      />
    </SafeArea>
  );
};
