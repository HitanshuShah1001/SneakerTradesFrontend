import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthNavigation} from './authnav';
import {ActionScreens} from './bottomtab';
import {createContext, useEffect, useState} from 'react';
import {RetrieveUserFromLocalStorage} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';

const Tab = createBottomTabNavigator();
export const UserContext = createContext();
export const Navigation = () => {
  const [user, setUser] = useState(undefined);
  const getUserDetails = async () => {
    const userDetails = await RetrieveUserFromLocalStorage();
    setUser(userDetails);
  };
  useEffect(() => {
    getUserDetails();
  }, [user]);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {user ? <ActionScreens /> : <AuthNavigation />}
    </UserContext.Provider>
  );
};
