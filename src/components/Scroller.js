import {SafeAreaView, ScrollView} from 'react-native';

export const Scroller = ({children}) => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
