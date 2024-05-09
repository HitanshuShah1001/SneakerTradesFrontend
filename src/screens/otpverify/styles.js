import {StyleSheet} from 'react-native';
import {
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_NORMAL,
  THEME_PINK,
} from '../../constants/colorsandfonts';

export const styles = StyleSheet.create({
  resendOtpContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  otpsendagaintext: {
    fontSize: 15,
    textDecorationLine: 'underline',
    color: THEME_PINK,
    marginLeft: 4,
  },
  tryagain: {fontSize: 16, fontWeight: FONT_WEIGHT_NORMAL},
  pressableresendwrapper: {marginLeft: 3, justifyContent: 'flex-end'},
  text: {
    color: THEME_PINK,
    fontWeight: FONT_WEIGHT_BOLD,
    marginLeft: 4,
    marginTop: 20,
    textAlign: 'center',
  },
});
