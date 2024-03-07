import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {FONT_SIZE} from '../constants/colorsandfonts';

export const ProfileCard = ({title, onPress = {}}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 45,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'DMSans',
    fontSize: FONT_SIZE,
  },
});
