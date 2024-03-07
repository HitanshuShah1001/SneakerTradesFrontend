import {Image, Text, View} from 'react-native';
import {COINS} from '../assets';
import {
  FONT_SIZE,
  FONT_WEIGHT_BOLD,
  THEME_PINK,
} from '../constants/colorsandfonts';

export const UnlockOwnerDetails = () => {
  return (
    <View
      style={{
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: THEME_PINK,
        height: 50,
        borderRadius: 4,
        marginTop: 25,
      }}>
      <Text
        style={{
          color: THEME_PINK,
          fontSize: FONT_SIZE,
          fontWeight: FONT_WEIGHT_BOLD,
        }}>
        Unlock owner details
      </Text>
      <Image source={COINS} />
    </View>
  );
};
