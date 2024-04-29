import React from 'react';
import LottieView from 'lottie-react-native';

export const Animation = () => {
  return (
    <LottieView source={require('../assets/animator.json')} autoPlay loop />
  );
};
