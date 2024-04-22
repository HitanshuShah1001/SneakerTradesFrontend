import {ScrollView} from 'react-native';
import {Header} from './Header';
import {useContext} from 'react';
import {Context} from '../navigation/BottomTab';
import {LoadingIndicator} from './SafeArea';
import {SafeAreaWrapper} from './SafeAreaWrapper';

export const Scroller = ({children}) => {
  const {loading} = useContext(Context);
  return (
    <SafeAreaWrapper>
      <Header text={'Sneaker Trades'} />
      {loading && <LoadingIndicator />}
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {children}
      </ScrollView>
    </SafeAreaWrapper>
  );
};
