import {SafeAreaView} from 'react-native';

export const SafeAreaWrapper = ({children}) => {
  return <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>;
};
