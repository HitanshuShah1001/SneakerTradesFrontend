import {AuthNavigation} from './authnav';
import {ActionScreens} from './bottomtab';
import {createContext, useEffect, useState} from 'react';
import {RetrieveUserFromLocalStorage} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {SneakerWrapper} from '../../screens/sneakercontext/SneakerContext';

export const Context = createContext();
export const Navigation = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 6000);
    }
  }, [loading]);
  const getUserDetails = async () => {
    const userDetails = await RetrieveUserFromLocalStorage();
    setUser(userDetails);
  };
  useEffect(() => {
    getUserDetails();
  }, [user]);

  return (
    <Context.Provider value={{user, setUser, loading, setLoading}}>
      {user ? (
        <SneakerWrapper>
          <ActionScreens />
        </SneakerWrapper>
      ) : (
        <AuthNavigation />
      )}
    </Context.Provider>
  );
};
