import {SafeAreaView, TextInput, View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import DropdownComponent from '../../components/Dropdown';

export const SignUp = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Brandiconandtext />
      <View style={{flex: 0.8, alignItems: 'center'}}>
        <Textinput placeholder="Username" />
        <Textinput placeholder="Name" />
        <Textinput placeholder="Email ID" />
        <Textinput placeholder="Phone No." />
        <DropdownComponent placeholder="Gender" />
      </View>
      <AuthenticationButton text={'Sign Up'} />
    </SafeAreaView>
  );
};
