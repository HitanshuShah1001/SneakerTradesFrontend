import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthNavigation} from './authnav';
import {ActionScreens} from './bottomtab';
import {createContext, useEffect, useState} from 'react';
import {RetrieveUserFromLocalStorage} from '../../utils/GetAndStoreUserDetailsInLocalStorage';

const Tab = createBottomTabNavigator();
export const UserContext = createContext();
export const Navigation = () => {
  const [user, setUser] = useState(undefined);
  const getUserDetails = async () => {
    const isUserLoggedIn = await RetrieveUserFromLocalStorage();
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {user ? <ActionScreens /> : <AuthNavigation />}
    </UserContext.Provider>
  );
};
