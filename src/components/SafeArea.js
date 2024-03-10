import {SafeAreaView} from 'react-native';
import {Header} from './Header';

export const SafeArea = ({children, go_back = false, text}) => (
  <SafeAreaView style={{flex: 1}}>
    <Header go_back={go_back} text={text} />
    {children}
  </SafeAreaView>
);
