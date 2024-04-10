import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../../screens/home';
import {Tabbaricon} from '../../components/Tabbaricon';
import {tabScreens} from '../../constants/Bottomtab';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SneakerDetail} from '../../screens/sneakerdetail';
import {ProfileDetail} from '../../screens/profiledetail';
import {SneakerRequestDetail} from '../../screens/sneakerrequestdetail';
import {
  COINS_BALANCE_AND_RECHARGE,
  FILTER_REQUEST_SCREEN,
  FILTER_SCREEN,
  MY_REQUEST_SCREEN,
  MY_UPLOAD_SCREEN,
  PROFILE_DETAIL,
  SNEAKER_DETAIL,
} from '../../constants/Screen';
import {Coinbalanceandrecharge} from '../../screens/coinbalanceandrecharge';
import {Filter} from '../../screens/filter';
import {MyUploads} from '../../screens/myuploads';
import {MyRequests} from '../../screens/myrequests';
import {FilterRequests} from '../../screens/filterrequest/filterrequest';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      {tabScreens.map(({name, icon, component = Home, fo_icon}, index) => (
        <Tab.Screen
          key={index}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <Tabbaricon source={fo_icon} />
              ) : (
                <Tabbaricon source={icon} />
              ),
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
      <Stack.Screen name={SNEAKER_DETAIL} component={SneakerDetail} />
      <Stack.Screen
        name={'SneakerRequestDetail'}
        component={SneakerRequestDetail}
      />
      <Stack.Screen name={PROFILE_DETAIL} component={ProfileDetail} />
      <Stack.Screen
        name={COINS_BALANCE_AND_RECHARGE}
        component={Coinbalanceandrecharge}
      />
      <Stack.Screen name={MY_UPLOAD_SCREEN} component={MyUploads} />
      <Stack.Screen name={MY_REQUEST_SCREEN} component={MyRequests} />
      <Stack.Screen name={FILTER_SCREEN} component={Filter} />
      <Stack.Screen name={FILTER_REQUEST_SCREEN} component={FilterRequests} />
    </Stack.Navigator>
  </NavigationContainer>
);
