import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from '../constants/LocalStorageVars';

export const StoreUserInLocalStorage = async ({userData}) => {
  console.log(userData, 'userdta');
  try {
    const user = await AsyncStorage.setItem(USER, JSON.stringify(userData));
  } catch (e) {
    console.log('Error occured in stroing user local storage', e);
  }
};

export const RetrieveUserFromLocalStorage = async () => {
  try {
    const user = await AsyncStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.log(`Error occured in retrieving user from local storage`, e);
  }
};

export const RemoveUserFromLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem(USER);
  } catch (e) {
    console.log(`Error occured while removing item`, e);
  }
};
