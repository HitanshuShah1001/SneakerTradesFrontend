import React, {useCallback} from 'react';
import {ActivityIndicator, SafeAreaView, View, StyleSheet} from 'react-native';
import {Header} from './Header';
import {useContext} from 'react';
import {Context} from '../navigation/BottomTab';
import {SafeAreaWrapper} from './SafeAreaWrapper';
import {Animation} from './Animator';

export const SafeArea = ({children, go_back = false, text}) => {
  const {loading} = useContext(Context);

  const AnimatedIndicator = useCallback(
    () => (
      <View style={[styles.loadingContainer, StyleSheet.absoluteFillObject]}>
        <Animation />
      </View>
    ),
    [],
  );
  return (
    <SafeAreaWrapper>
      <Header go_back={go_back} text={text} />
      {loading && <AnimatedIndicator />}
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
    backgroundColor: 'white',
    zIndex: 2,
  },
  content: {
    flex: 1,
  },
  noInteraction: {
    pointerEvents: 'none',
  },
});
