import {Alert, View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Otpinput} from '../../components/Otpinput';
import {useContext, useState} from 'react';
import {SafeArea} from '../../components/SafeArea';
import {UserContext} from '../../navigation/BottomTab';
import {VERIFY_OTP} from '../../constants/Buttontitles';
import {apiService} from '../../services/apiService';
import {SIGN_UP_CALL} from '../../constants/Apicall';
import {StoreTokenInLocalStorage} from '../../utils/GetAndStoreTokenInLocalStorage';
import {StoreUserInLocalStorage} from '../../utils/GetAndStoreUserDetailsInLocalStorage';

export const OTPverify = props => {
  const {setUser} = useContext(UserContext);
  const {userDataForSignUp} = props?.route?.params || {};
  const {userData} = props?.route?.params || {};
  const {cameFromSignUp} = props?.route?.params || false;
  const [otp, setOTP] = useState('');

  const navigateToHome = async () => {
    if (cameFromSignUp) {
      const {Username, Name, Phone, Email} = userDataForSignUp;
      const response = await apiService.post(SIGN_UP_CALL, {
        Username,
        Name,
        Email,
        Phone,
      });
      if (response) {
        await Promise.allSettled([
          StoreTokenInLocalStorage({token: response.token}),
          StoreUserInLocalStorage({userData: response.user}),
        ]);
        Alert.alert('User created succesfully!');
        setUser(response.user);
      }
    } else {
      setUser(userData);
    }
  };

  return (
    <SafeArea go_back={true}>
      <Brandiconandtext />
      <View style={{flex: 0.7, alignItems: 'center'}}>
        <Otpinput setOTP={setOTP} />
      </View>
      <AuthenticationButton
        text={VERIFY_OTP}
        onPress={() => navigateToHome()}
      />
    </SafeArea>
  );
};
