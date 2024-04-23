import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabScreens} from './Bottomtab';
import {
  FILTER_REQUEST_SCREEN,
  FILTER_SCREEN,
  MAIN_TABS,
  MY_REQUEST_SCREEN,
  MY_UPLOAD_SCREEN,
  PROFILE_DETAIL,
  SNEAKER_DETAIL,
  SNEAKER_REQUEST_DETAIL,
  SNEAKER_REQUEST_UPLOADED_DETAIL,
  SNEAKER_UPLOADED_DETAIL,
  UPDATE_PROFILE_SCREEN,
} from '../constants/Screen';
import {SneakerDetail} from '../screens/sneakerdetail';
import {MyUploadSneakerDetail} from '../screens/myuploadsneakerdetail';
import {MySneakerRequestDetail} from '../screens/myrequestsneakerdetail';
import {SneakerRequestDetail} from '../screens/sneakerrequestdetail';
import {ProfileDetail} from '../screens/profiledetail';
import {MyUploads} from '../screens/myuploads';
import {MyRequests} from '../screens/myrequests';
import {Filter} from '../screens/filter';
import {FilterRequests} from '../screens/filterrequest/filterrequest';
import {UpdateProfile} from '../screens/updateprofile';
import {Tabbaricon} from '../components/Tabbaricon';

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      {tabScreens.map(({name, icon, component = Home, fo_icon}, index) => (
        <Tab.Screen
          key={index}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({focused}) =>
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

export const ScreensAndComponents = [
  {name: MAIN_TABS, component: MyTabs},
  {name: SNEAKER_DETAIL, component: SneakerDetail},
  {name: SNEAKER_UPLOADED_DETAIL, component: MyUploadSneakerDetail},
  {name: SNEAKER_REQUEST_UPLOADED_DETAIL, component: MySneakerRequestDetail},
  {name: SNEAKER_REQUEST_DETAIL, component: SneakerRequestDetail},
  {name: PROFILE_DETAIL, component: ProfileDetail},
  {name: MY_UPLOAD_SCREEN, component: MyUploads},
  {name: MY_REQUEST_SCREEN, component: MyRequests},
  {name: FILTER_SCREEN, component: Filter},
  {name: FILTER_REQUEST_SCREEN, component: FilterRequests},
  {name: UPDATE_PROFILE_SCREEN, component: UpdateProfile},
];
