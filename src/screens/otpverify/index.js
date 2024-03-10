import {View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Otpinput} from '../../components/Otpinput';
import {useContext, useState} from 'react';
import {SafeArea} from '../../components/SafeArea';
import {UserContext} from '../../navigation/BottomTab';

export const OTPverify = props => {
  console.log(props.route.params);
  const {user, setUser} = useContext(UserContext);
  const {userData} = props.route.params;
  const [otp, setOTP] = useState('');

  const navigateToHome = () => {
    console.log(userData);
    setUser(userData);
  };
  return (
    <SafeArea go_back={true}>
      <Brandiconandtext />
      <View style={{flex: 0.7, alignItems: 'center'}}>
        <Otpinput setOTP={setOTP} />
      </View>
      <AuthenticationButton
        text={'Verify OTP'}
        onPress={() => navigateToHome()}
      />
    </SafeArea>
  );
};
