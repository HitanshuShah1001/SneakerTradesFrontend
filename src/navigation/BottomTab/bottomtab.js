import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../../screens/home';
import {Tabbaricon} from '../../components/Tabbaricon';
import {tabScreens} from '../../constants/Bottomtab';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SneakerDetail} from '../../screens/sneakerdetail';

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
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SneakerDetail" component={SneakerDetail} />
    </Stack.Navigator>
  </NavigationContainer>
);
