import React from 'react';
import {Image, View, Text, StyleSheet, Pressable} from 'react-native';
import {FONT_SIZE} from '../constants/colorsandfonts';
import {Typechip} from './Typechip';
import {LazyImageLoader} from './LazyImageLoader';

const Sneakercard = ({
  source,
  brand,
  name,
  price,
  type,
  onPress = () => {},
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <LazyImageLoader uri={source} styles={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.price}>{price}</Text>
        <Typechip type={type} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 12,
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '25%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18, // Adjust font size as needed
    fontWeight: 'bold', // Adjust font weight as needed
    marginBottom: 5, // Adjust margin as needed
  },
  brand: {
    fontSize: FONT_SIZE, // Adjust font size as needed
    marginBottom: 5, // Adjust margin as needed
  },
  price: {
    fontSize: FONT_SIZE, // Adjust font size as needed
    color: '#007bff', // Adjust color as needed
    fontWeight: 'bold', // Adjust font weight as needed
  },
});

export default Sneakercard;
