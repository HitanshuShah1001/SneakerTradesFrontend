import {OtpInput} from 'react-native-otp-entry';
import {THEME_PINK} from '../constants/colorsandfonts';

export const Otpinput = ({setOTP}) => {
  return (
    <OtpInput
      numberOfDigits={6}
      onTextChange={text => setOTP(text)}
      focusColor={'white'}
      theme={otpprops}
    />
  );
};

const otpprops = {
  containerStyle: {
    width: '80%',
  },
  pinCodeContainerStyle: {
    width: 35,
    height: 35,
    borderRadius: 6,

    backgroundColor: '#FFF',
  },
  pinCodeTextStyle: {
    fontSize: 18,
    color: THEME_PINK,
  },
  focusStickStyle: {
    height: 18,
  },
  focusedPinCodeContainerStyle: {
    borderColor: '#000',
  },
};
