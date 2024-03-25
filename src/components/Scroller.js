import {SafeAreaView, ScrollView} from 'react-native';
import {Header} from './Header';
import {useContext} from 'react';
import {Context} from '../navigation/BottomTab';
import {LoadingIndicator} from './SafeArea';

export const Scroller = ({children}) => {
  const {loading} = useContext(Context);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header text={'Sneaker Trades'} />
      {loading && <LoadingIndicator />}
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
