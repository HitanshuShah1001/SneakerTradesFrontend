import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthNavigation} from './authnav';
import {ActionScreens} from './bottomtab';

const Tab = createBottomTabNavigator();

export const Navigation = () => {
  if (1 == 1) {
    return <AuthNavigation />;
  } else {
    return <ActionScreens />;
  }
};
