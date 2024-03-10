import {View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import {useNavigation} from '@react-navigation/native';
import {SafeArea} from '../../components/SafeArea';
import {EMAIL_ID, NAME, PHONE_NUMBER, USER_NAME} from '../../constants/Labels';
import {OTP_VERIFY} from '../../constants/Screen';
import {SIGN_UP} from '../../constants/Buttontitles';
export const SignUp = () => {
  const navigation = useNavigation();
  return (
    <SafeArea>
      <Brandiconandtext />
      <View style={{flex: 0.8, alignItems: 'center'}}>
        <Textinput placeholder={USER_NAME} />
        <Textinput placeholder={NAME} />
        <Textinput placeholder={EMAIL_ID} />
        <Textinput placeholder={PHONE_NUMBER} />
        {/* <DropdownComponent placeholder="Gender" /> */}
      </View>
      <AuthenticationButton
        text={SIGN_UP}
        onPress={() => navigation.navigate(OTP_VERIFY)}
      />
    </SafeArea>
  );
};
