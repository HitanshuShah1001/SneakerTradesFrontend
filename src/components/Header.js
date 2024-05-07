import React from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FONT_WEIGHT_NORMAL, THEME_PINK} from '../constants/colorsandfonts';
import {BACK_ICON, BRAND_ICON} from '../assets';
import {SNEAKER_TRADES} from '../constants/Labels';

export const Header = ({text, go_back = false}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {go_back ? (
        <Pressable onPress={handleGoBack} style={{zIndex: 2}}>
          <Image source={BACK_ICON} />
        </Pressable>
      ) : (
        <Image source={BRAND_ICON} style={styles.image} />
      )}

      <Text style={styles.headerText}>{text ?? SNEAKER_TRADES}</Text>
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
    fontWeight: FONT_WEIGHT_NORMAL,
    fontSize: 20,
    color: THEME_PINK,
    textAlign: 'center',
    position: 'absolute',
    width: Dimensions.get('window').width * 0.9,
  },
  image: {
    height: 45,
    width: 45,
  },
};
