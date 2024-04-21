import {Text, View} from 'react-native';
import {FONT_WEIGHT_BOLD, THEME_PINK} from '../constants/colorsandfonts';

export const ActionChip = ({text}) => {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = {
  chip: {
    width: 70,
    height: 30,
    borderColor: THEME_PINK,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 15,
  },
  text: {fontSize: 20, fontWeight: FONT_WEIGHT_BOLD, color: THEME_PINK},
};
