import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreUserInLocalStorage = async ({userData}) => {
  try {
    const user = await AsyncStorage.setItem('user', JSON.stringify(userData));
  } catch (e) {
    console.log('Error occured in stroing user local storage', e);
  }
};

export const RetrieveUserFromLocalStorage = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.log(`Error occured in retrieving user from local storage`, e);
  }
};

export const RemoveUserFromLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    console.log(`Error occured while removing item`, e);
  }
};
