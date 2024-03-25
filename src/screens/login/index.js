import {useContext, useState} from 'react';
import {Alert, View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import {useNavigation} from '@react-navigation/native';
import {SafeArea} from '../../components/SafeArea';
import {apiService} from '../../services/apiService';
import {OTP_VERIFY} from '../../constants/Screen';
import {NO_USER_FOUND} from '../../constants/Messages';
import {GENERATE_OTP} from '../../constants/Buttontitles';
import {StoreTokenInLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {StoreUserInLocalStorage} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {Context} from '../../navigation/BottomTab';
import {LOGIN_CALL} from '../../constants/Apicall';

export const Login = () => {
  const navigation = useNavigation();
  const [Phone, setPhone] = useState('');
  const {setLoading} = useContext(Context);
  const checkIfUserExists = async () => {
    setLoading(true);
    const response = await apiService.post(LOGIN_CALL, {
      Phone: `${Phone}`,
    });
    setLoading(false);
    if (!response) {
      Alert.alert(NO_USER_FOUND);
    } else {
      await Promise.allSettled([
        StoreTokenInLocalStorage({token: response.token}),
        StoreUserInLocalStorage({userData: response.user}),
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
          placeholder="Enter your 10 Digit Mobile Number"
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
