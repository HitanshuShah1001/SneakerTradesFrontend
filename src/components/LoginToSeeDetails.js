import {Pressable, StyleSheet, Text} from 'react-native';
import {
  FONT_SIZE,
  FONT_WEIGHT_BOLD,
  THEME_PINK,
  WHITE,
} from '../constants/colorsandfonts';
import {useNavigation} from '@react-navigation/native';
import {HOME, LOGIN_SCREEN} from '../constants/Screen';

export const LoginToSeeDetails = ({sneaker, navigateTo = HOME, text}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.pressable}
      onPress={() =>
        navigation.navigate(LOGIN_SCREEN, {
          navigateTo: navigateTo,
          additionalParam: sneaker,
        })
      }>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  pressable: {
    backgroundColor: THEME_PINK,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '100%',
  },
  text: {
    fontSize: FONT_SIZE,
    color: WHITE,
    fontWeight: FONT_WEIGHT_BOLD,
  },
});
