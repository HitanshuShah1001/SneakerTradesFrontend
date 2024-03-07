import {SafeAreaView, TextInput, View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import {Otpinput} from '../../components/Otpinput';
import {useState} from 'react';

export const OTPverify = () => {
  const [otp, setOTP] = useState('');
  return (
    <SafeAreaView style={{flex: 1}}>
      <Brandiconandtext />
      <View style={{flex: 0.7, alignItems: 'center'}}>
        <Otpinput setOTP={setOTP} />
      </View>
      <AuthenticationButton text={'Verify OTP'} />
    </SafeAreaView>
  );
};
