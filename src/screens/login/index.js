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
import {LOGIN_CALL} from '../../constants/Apicall';
import {setNotificationTimer} from '../../components/NotificationTimer';
import {AlertMessage} from '../../utils/Alertmessage';
import {STATUS_FAIL} from '../../constants/ApiParams';
import {styles} from './styles';
import {EMAIL_ID, PASSWORD} from '../../constants/Labels';
import {Text} from 'react-native-paper';

export const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const {setUser, setLoading} = useContext(Context);
  const checkIfUserExists = async () => {
    setLoading(true);
    const response = await apiService.post(LOGIN_CALL, {
      Email,
      Password,
    });
    if (response.status === STATUS_FAIL) {
      setLoading(false);
      return AlertMessage(response.Data);
    } else {
      setLoading(false);
      setUser(response.Data.user);
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
        <Pressable style={{marginTop: 10}}>
          <Text style={styles.navigator}>Forgot password?</Text>
        </Pressable>
      </View>
      <AuthenticationButton
        text={LOGIN}
        onPress={() => checkIfUserExists()}
        showsignup={true}
      />
    </SafeArea>
  );
};
