import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthNavigation} from './authnav';
import {ActionScreens} from './bottomtab';
import {createContext, useState} from 'react';

const Tab = createBottomTabNavigator();
export const UserContext = createContext();
export const Navigation = () => {
  const [user, setUser] = useState(undefined);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {user ? <ActionScreens /> : <AuthNavigation />}
    </UserContext.Provider>
  );
};
