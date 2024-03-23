import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../../screens/home';
import {Tabbaricon} from '../../components/Tabbaricon';
import {tabScreens} from '../../constants/Bottomtab';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SneakerDetail} from '../../screens/sneakerdetail';
import {ProfileDetail} from '../../screens/profiledetail';
import {SneakerRequestDetail} from '../../screens/sneakerrequestdetail';
import {COINS_BALANCE_AND_RECHARGE} from '../../constants/Screen';
import {Coinbalanceandrecharge} from '../../screens/coinbalanceandrecharge';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      {tabScreens.map(({name, icon, component = Home}, index) => (
        <Tab.Screen
          key={index}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({color, focused}) => <Tabbaricon source={icon} />,
            headerShown: false,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export const ActionScreens = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MyTabs} />
      <Stack.Screen name="SneakerDetail" component={SneakerDetail} />
      <Stack.Screen
        name="SneakerRequestDetail"
        component={SneakerRequestDetail}
      />
      <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
      <Stack.Screen
        name={COINS_BALANCE_AND_RECHARGE}
        component={Coinbalanceandrecharge}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
