import {ActionScreens} from './bottomtab';
import {createContext, useEffect, useState} from 'react';
import {SneakerWrapper} from '../../screens/sneakercontext/SneakerContext';
import {SneakerRequestWrapper} from '../../screens/sneakercontext/SneakerRequestContext';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

export const Context = createContext();
export const Navigation = () => {
  const [userContext, setUserContext] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [isConnected, setConnected] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 8000);
    }
  }, [loading]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      Alert.alert(
        'Internet Connection',
        'You are offline. Some features may not be available.',
      );
    }
  }, [isConnected]);

  return (
    <Context.Provider
      value={{userContext, setUserContext, loading, setLoading}}>
      <SneakerWrapper>
        <SneakerRequestWrapper>
          <ActionScreens />
        </SneakerRequestWrapper>
      </SneakerWrapper>
    </Context.Provider>
  );
};
