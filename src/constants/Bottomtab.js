import {HOME_ICON, PROFILE_ICON, REQUESTS_ICON, UPLOAD_ICON} from '../assets';
import {Home} from '../screens/home';
import {Profile} from '../screens/profile';
import {Upload} from '../screens/upload';

export const tabScreens = [
  {name: 'Home', icon: HOME_ICON, component: Home},
  {name: 'Requests', icon: REQUESTS_ICON, component: Upload},
  {name: 'Upload', icon: UPLOAD_ICON, component: Upload},
  {name: 'Profile', icon: PROFILE_ICON, component: Profile},
];
