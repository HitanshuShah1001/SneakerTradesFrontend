import {Children} from 'react';
import {View} from 'react-native';

export const ViewWrapper = ({children}) => {
  return <View style={{flex: 1}}>{children}</View>;
};
