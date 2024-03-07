import {Text, View} from 'react-native';
import {FONT_WEIGHT_BOLD, THEME_PINK} from '../constants/colorsandfonts';

export const Typechip = ({type}) => (
  <View
    style={{
      height: 22,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: THEME_PINK,
      borderWidth: 1,
      marginTop: 8,
      borderRadius: 6,
    }}>
    <Text
      style={{color: THEME_PINK, fontWeight: FONT_WEIGHT_BOLD, fontSize: 14}}>
      {type}
    </Text>
  </View>
);
