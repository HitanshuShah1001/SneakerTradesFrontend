/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Navigation} from './src/navigation/BottomTab';
import {PaperProvider} from 'react-native-paper';
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered',
]);
function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}

export default App;
