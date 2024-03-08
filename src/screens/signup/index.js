import {View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import {useNavigation} from '@react-navigation/native';
import {SafeArea} from '../../components/SafeArea';
export const SignUp = () => {
  const navigation = useNavigation();
  return (
    <SafeArea>
      <Brandiconandtext />
      <View style={{flex: 0.8, alignItems: 'center'}}>
        <Textinput placeholder="Username" />
        <Textinput placeholder="Name" />
        <Textinput placeholder="Email ID" />
        <Textinput placeholder="Phone No." />
        {/* <DropdownComponent placeholder="Gender" /> */}
      </View>
      <AuthenticationButton
        text={'Sign Up'}
        onPress={() => navigation.navigate('OtpVerify')}
      />
    </SafeArea>
  );
};
