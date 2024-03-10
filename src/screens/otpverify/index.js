import {View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Otpinput} from '../../components/Otpinput';
import {useContext, useState} from 'react';
import {SafeArea} from '../../components/SafeArea';
import {UserContext} from '../../navigation/BottomTab';
import {VERIFY_OTP} from '../../constants/Buttontitles';

export const OTPverify = props => {
  console.log(props.route.params);
  const {user, setUser} = useContext(UserContext);
  const {userData} = props.route.params;
  const [otp, setOTP] = useState('');

  const navigateToHome = () => {
    setUser(userData);
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
