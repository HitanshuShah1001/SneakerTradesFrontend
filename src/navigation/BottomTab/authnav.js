import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../../screens/login';
import {SignUp} from '../../screens/signup';
import {OTPverify} from '../../screens/otpverify';
import {LOGIN_SCREEN, OTP_VERIFY, SIGN_UP_SCREEN} from '../../constants/Screen';
const Stack = createStackNavigator();
export const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={LOGIN_SCREEN} component={Login} />
        <Stack.Screen name={SIGN_UP_SCREEN} component={SignUp} />
        <Stack.Screen name={OTP_VERIFY} component={OTPverify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
