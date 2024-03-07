import {Pressable, Text, View} from 'react-native';
import {FONT_WEIGHT_BOLD, THEME_PINK} from '../constants/colorsandfonts';

export const AuthenticationButton = ({
  text,
  customstyles,
  onPress = () => {},
}) => {
  return (
    <View style={styles.pressablecontainer}>
      <Pressable style={styles.pressable} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = {
  pressablecontainer: {
    flex: 0.16,
    alignItems: 'center',
  },
  pressable: {
    width: '90%',
    backgroundColor: THEME_PINK,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 6,
  },
  text: {color: 'white', fontSize: 22, fontWeight: FONT_WEIGHT_BOLD},
};
