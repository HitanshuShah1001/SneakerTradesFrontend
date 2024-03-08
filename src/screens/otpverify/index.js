import {View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Otpinput} from '../../components/Otpinput';
import {useState} from 'react';
import {SafeArea} from '../../components/SafeArea';

export const OTPverify = () => {
  const [otp, setOTP] = useState('');
  return (
    <SafeArea go_back={true}>
      <Brandiconandtext />
      <View style={{flex: 0.7, alignItems: 'center'}}>
        <Otpinput setOTP={setOTP} />
      </View>
      <AuthenticationButton text={'Verify OTP'} />
    </SafeArea>
  );
};
