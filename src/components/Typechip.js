import {StyleSheet, Text, View} from 'react-native';
import {FONT_WEIGHT_BOLD, THEME_PINK} from '../constants/colorsandfonts';

export const Typechip = ({type}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{type}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 22,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: THEME_PINK,
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 6,
  },
  text: {color: THEME_PINK, fontWeight: FONT_WEIGHT_BOLD, fontSize: 14},
});
