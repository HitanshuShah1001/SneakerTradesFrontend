import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FONT_WEIGHT_BOLD, THEME_PINK} from '../constants/colorsandfonts';
import {useNavigation} from '@react-navigation/native';
import {SIGN_UP_SCREEN} from '../constants/Screen';
export const AuthenticationButton = ({
  text,
  showsignup = false,
  onPress = () => {},
  customstyles = {},
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.pressablecontainer, {...customstyles}]}>
      <Pressable
        style={({pressed}) => [styles.pressable, pressed && {opacity: 0.5}]}
        onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
      {showsignup && (
        <Pressable
          style={({pressed}) => {
            return styles.signupnavigatiorpressable;
          }}
          onPress={() => navigation.navigate(SIGN_UP_SCREEN)}>
          <Text style={{color: THEME_PINK}}>Don't have an account?</Text>
          <Text style={styles.navigator}>Sign Up</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  signupnavigatiorpressable: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  navigator: {
    color: THEME_PINK,
    fontWeight: FONT_WEIGHT_BOLD,
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
});
