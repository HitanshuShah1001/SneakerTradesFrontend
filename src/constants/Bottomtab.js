import {
  HOME_ICON,
  HOME_ICON_FOCUSED,
  PROFILE_ICON,
  PROFILE_ICON_FOCUSED,
  REQUESTS_ICON,
  REQUEST_ICON_FOCUSED,
  UPLOAD_ICON,
  UPLOAD_ICON_FOCUSED,
} from '../assets';
import {Home} from '../screens/home';
import {Profile} from '../screens/profile';
import {Requests} from '../screens/requests';
import {Upload} from '../screens/upload';
import {HOME, PROFILE, REQUESTS, UPLOAD} from './Screen';

export const tabScreens = [
  {name: HOME, icon: HOME_ICON, component: Home, fo_icon: HOME_ICON_FOCUSED},
  {
    name: REQUESTS,
    icon: REQUESTS_ICON,
    component: Requests,
    fo_icon: REQUEST_ICON_FOCUSED,
  },
  {
    name: UPLOAD,
    icon: UPLOAD_ICON,
    component: Upload,
    fo_icon: UPLOAD_ICON_FOCUSED,
  },
  {
    name: PROFILE,
    icon: PROFILE_ICON,
    component: Profile,
    fo_icon: PROFILE_ICON_FOCUSED,
  },
];
