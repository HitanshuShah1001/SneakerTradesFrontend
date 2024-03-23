import {Image, Pressable, Text, View} from 'react-native';
import {COINS} from '../assets';
import {
  FONT_SIZE,
  FONT_WEIGHT_BOLD,
  THEME_PINK,
} from '../constants/colorsandfonts';

export const UnlockOwnerDetails = ({
  onPress,
  text = 'Unlock Owner Details for 10 Coins',
}) => {
  return (
    <Pressable
      style={({pressed}) => [styles.pressable, pressed && {opacity: 0.5}]}
      onPress={onPress}>
      <Text
        style={{
          color: THEME_PINK,
          fontSize: FONT_SIZE,
          fontWeight: FONT_WEIGHT_BOLD,
        }}>
        {text}
      </Text>
      <Image source={COINS} />
    </Pressable>
  );
};

const styles = {
  pressable: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: THEME_PINK,
    height: 50,
    borderRadius: 12,
    marginTop: 25,
  },
};
