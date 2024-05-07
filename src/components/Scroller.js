import {ScrollView} from 'react-native';
import {Header} from './Header';
import {useContext} from 'react';
import {Context} from '../navigation/BottomTab';
import {SafeAreaWrapper} from './SafeAreaWrapper';
import {LoadingIndicator} from './SafeArea';
import {SNEAKER_TRADES} from '../constants/Labels';

export const Scroller = ({children}) => {
  const {loading} = useContext(Context);
  return (
    <SafeAreaWrapper>
      <Header text={SNEAKER_TRADES} />
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
