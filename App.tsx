/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Navigation} from './src/navigation/BottomTab';
import {PaperProvider} from 'react-native-paper';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}

export default App;
