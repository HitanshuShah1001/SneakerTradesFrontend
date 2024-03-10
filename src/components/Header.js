import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FONT_WEIGHT_NORMAL, THEME_PINK} from '../constants/colorsandfonts';
import {BACK_ICON, BRAND_ICON} from '../assets';

export const Header = ({text, go_back = false}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {go_back ? (
        <Pressable onPress={handleGoBack}>
          <Image source={BACK_ICON} />
        </Pressable>
      ) : (
        <Image source={BRAND_ICON} style={styles.image} />
      )}

      <Text style={styles.headerText}>{text ?? 'Sneaker Trades'}</Text>
    </View>
  );
};

const styles = {
  container: {
    width: '90%',
    marginTop: 12,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    height: 50,
    alignItems: 'center',
    borderRadius: 12,
  },
  headerText: {
    marginLeft: 10,
    fontWeight: FONT_WEIGHT_NORMAL,
    fontSize: 20,
    color: THEME_PINK,
    flex: 1,
    textAlign: 'center',
  },
  image: {
    height: 45,
    width: 45,
  },
};
