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

export const OTPverify = props => {
  const {setUser} = useContext(UserContext);
  const {userDataForSignUp} = props?.route?.params || {};
  const {userData} = props?.route?.params || {};
  const {cameFromSignUp} = props?.route?.params || false;
  const [otp, setOTP] = useState('');
  console.log(userDataForSignUp, 'user data for sign up');
  console.log(cameFromSignUp, 'came from sign up');
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
