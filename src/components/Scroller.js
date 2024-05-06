import {ScrollView} from 'react-native';
import {Header} from './Header';
import {useContext} from 'react';
import {Context} from '../navigation/BottomTab';
import {SafeAreaWrapper} from './SafeAreaWrapper';
import {LoadingIndicator} from './SafeArea';

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
