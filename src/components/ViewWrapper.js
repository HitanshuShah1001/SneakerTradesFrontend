import {StyleSheet, View} from 'react-native';

export const ViewWrapper = ({children, customstyles = {}}) => {
  return <View style={[styles.container, {...customstyles}]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
