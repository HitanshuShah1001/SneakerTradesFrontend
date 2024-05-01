import {Alert} from 'react-native';

export const AlertMessage = (message = ``) => {
  return Alert.alert(message);
};
