/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Navigation} from './src/navigation/BottomTab';
import {PaperProvider} from 'react-native-paper';
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered',
]);
function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}

export default App;
