import {SafeAreaView, ScrollView} from 'react-native';
import {Header} from './Header';

export const Scroller = ({children}) => {
  return (
    <SafeAreaView>
      <Header text={'Sneaker Trades'} />
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
