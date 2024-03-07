import {SafeAreaView, View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import {useNavigation} from '@react-navigation/native';

export const Login = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Brandiconandtext />
      <View style={{flex: 0.6, alignItems: 'center'}}>
        <Textinput placeholder="Phone No." />
      </View>
      <AuthenticationButton
        text={'Generate OTP'}
        onPress={() => navigation.navigate('OtpVerify')}
      />
    </SafeAreaView>
  );
};
