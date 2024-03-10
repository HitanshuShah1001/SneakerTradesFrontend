import {HOME_ICON, PROFILE_ICON, REQUESTS_ICON, UPLOAD_ICON} from '../assets';
import {Home} from '../screens/home';
import {Profile} from '../screens/profile';
import {Requests} from '../screens/requests';
import {Upload} from '../screens/upload';
import {HOME, PROFILE, REQUESTS, UPLOAD} from './Screen';

export const tabScreens = [
  {name: HOME, icon: HOME_ICON, component: Home},
  {name: REQUESTS, icon: REQUESTS_ICON, component: Requests},
  {name: UPLOAD, icon: UPLOAD_ICON, component: Upload},
  {name: PROFILE, icon: PROFILE_ICON, component: Profile},
];
