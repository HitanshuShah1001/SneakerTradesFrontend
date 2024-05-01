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

export const Login = () => {
  const navigation = useNavigation();
  const [Phone, setPhone] = useState('');
  const {setLoading} = useContext(Context);
  const checkIfUserExists = async () => {
    setLoading(true);
    const response = await apiService.post(LOGIN_CALL, {
      Phone,
    });
    setLoading(false);
    if (response) {
      await Promise.allSettled([
        StoreTokenInLocalStorage({token: response.token}),
        StoreUserInLocalStorage({userData: response.user}),
        setNotificationTimer(),
      ]);
      navigation.navigate(OTP_VERIFY, {
        userData: {...response.user, token: response.token},
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

const styles = {
  inputcontainer: {flex: 0.6, alignItems: 'center'},
};
