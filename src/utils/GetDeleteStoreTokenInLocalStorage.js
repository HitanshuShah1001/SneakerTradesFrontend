import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreTokenInLocalStorage = async ({token}) => {
  try {
    const tokenToSave = await AsyncStorage.setItem('token', token);
  } catch (e) {
    console.log('Error occured in stroing token local storage', e);
  }
};

export const RetrieveTokenFromLocalStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token ?? null;
  } catch (e) {
    console.log(`Error occured in retrieving token from local storage`, e);
  }
};

export const RemoveTokenFromLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    console.log(`Error occured while removing item`, e);
  }
};
