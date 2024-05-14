import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ScreensAndComponents} from '../../constants/ScreensAndComponents';

const Stack = createStackNavigator();

export const ActionScreens = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {ScreensAndComponents.map(({name, component}, index) => (
        <Stack.Screen
          name={name}
          component={component}
          key={index}
          options={{gestureEnabled: false}}
        />
      ))}
    </Stack.Navigator>
  </NavigationContainer>
);
