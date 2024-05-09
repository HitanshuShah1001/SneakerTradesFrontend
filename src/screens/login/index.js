import {useContext, useState} from 'react';
import {View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import {SafeArea} from '../../components/SafeArea';
import {apiService} from '../../services/apiService';
import {GENERATE_OTP} from '../../constants/Buttontitles';
import {StoreTokenInLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {StoreUserInLocalStorage} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {Context} from '../../navigation/BottomTab';
import {LOGIN_CALL} from '../../constants/Apicall';
import {setNotificationTimer} from '../../components/NotificationTimer';
import {AlertMessage} from '../../utils/Alertmessage';
import {STATUS_FAIL} from '../../constants/ApiParams';
import {styles} from './styles';
import {EMAIL_ID, PASSWORD} from '../../constants/Labels';

export const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const {setLoading} = useContext(Context);
  const checkIfUserExists = async () => {
    setLoading(true);
    const response = await apiService.post(LOGIN_CALL, {
      Phone,
    });
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
    }
  };
  return (
    <SafeArea>
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
      </View>
      <AuthenticationButton
        text={GENERATE_OTP}
        onPress={() => checkIfUserExists()}
        showsignup={true}
      />
    </SafeArea>
  );
};
