import React, {useCallback} from 'react';
import {ActivityIndicator, SafeAreaView, View, StyleSheet} from 'react-native';
import {Header} from './Header';
import {useContext} from 'react';
import {Context} from '../navigation/BottomTab';
import {SafeAreaWrapper} from './SafeAreaWrapper';

export const LoadingIndicator = () => (
  <View style={[styles.loadingContainer, StyleSheet.absoluteFillObject]}>
    <ActivityIndicator />
  </View>
);
export const SafeArea = ({children, go_back = false, text}) => {
  const {loading} = useContext(Context) || {};

  return (
    <SafeAreaWrapper>
      <Header go_back={go_back} text={text} />
      {loading && <LoadingIndicator />}
      <View
        style={[
          styles.content,
          loading && styles.blur,
          loading && styles.noInteraction,
        ]}>
        {children}
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
  content: {
    flex: 1,
  },
  noInteraction: {
    pointerEvents: 'none',
  },
});
