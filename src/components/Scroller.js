import {ScrollView} from 'react-native';
import {Header} from './Header';
import {useContext} from 'react';
import {Context} from '../navigation/BottomTab';
import {SafeAreaWrapper} from './SafeAreaWrapper';
import {LoadingIndicator} from './SafeArea';
import {SNEAKER_TRADES} from '../constants/Labels';

export const Scroller = ({
  children,
  go_back = false,
  text = SNEAKER_TRADES,
}) => {
  const {loading} = useContext(Context) || {};
  return (
    <SafeAreaWrapper>
      <Header text={text} go_back={go_back} />
      {loading && <LoadingIndicator />}
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaWrapper>
  );
};
