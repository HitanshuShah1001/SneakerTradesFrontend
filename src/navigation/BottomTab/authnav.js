import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthScreenComponents} from '../../constants/ScreensAndComponents';
const Stack = createStackNavigator();
export const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {AuthScreenComponents.map(({name, component, index}) => (
          <Stack.Screen name={name} component={component} key={index} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
