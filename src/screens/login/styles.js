import {StyleSheet} from 'react-native';
import {FONT_WEIGHT_BOLD, THEME_PINK} from '../../constants/colorsandfonts';

export const styles = StyleSheet.create({
  inputcontainer: {flex: 0.6, alignItems: 'center'},
  navigator: {
    color: THEME_PINK,
    fontWeight: FONT_WEIGHT_BOLD,
    marginLeft: 4,
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});
