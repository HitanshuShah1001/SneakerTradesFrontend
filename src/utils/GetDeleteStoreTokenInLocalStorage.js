import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN} from '../constants/LocalStorageVars';

export const StoreTokenInLocalStorage = async ({token}) => {
  try {
    const tokenToSave = await AsyncStorage.setItem(TOKEN, token);
  } catch (e) {
    console.log('Error occured in stroing token local storage', e);
  }
};

export const RetrieveTokenFromLocalStorage = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN);
    return token ?? null;
  } catch (e) {
    console.log(`Error occured in retrieving token from local storage`, e);
  }
};

export const RemoveTokenFromLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN);
  } catch (e) {
    console.log(`Error occured while removing item`, e);
  }
};
