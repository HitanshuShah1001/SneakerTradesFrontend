import {Alert, View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import {useNavigation} from '@react-navigation/native';
import {SafeArea} from '../../components/SafeArea';
import {
  EMAIL_ID,
  GENDER_ROLES,
  NAME,
  PHONE_NUMBER,
  USER_NAME,
} from '../../constants/Labels';
import {SIGN_UP} from '../../constants/Buttontitles';
import DropdownComponent from '../../components/Dropdown';
import {useContext, useState} from 'react';
import {OTP_VERIFY} from '../../constants/Screen';
import {SELECT_GENDER} from '../../constants/Placeholders';
import {Context} from '../../navigation/BottomTab';
import {FILL_DETAILS} from '../../constants/Messages';
export const SignUp = () => {
  const {setLoading} = useContext(Context);
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [phone, setPhone] = useState('');

  const registerUser = async () => {
    if (!username || !name || !emailId || !phone || !value) {
      return Alert.alert(FILL_DETAILS);
    }
    setLoading(true);
    const userDataForSignUp = {
      Username: username,
      Name: name,
      Email: emailId,
      Phone: phone,
    };
    setLoading(false);
    navigation.navigate(OTP_VERIFY, {userDataForSignUp, cameFromSignUp: true});
  };
  return (
    <SafeArea go_back={true}>
      <Brandiconandtext />
      <View style={{flex: 0.8, alignItems: 'center'}}>
        <Textinput
          placeholder={USER_NAME}
          custVal={username}
          setCustVal={setUsername}
        />
        <Textinput placeholder={NAME} custVal={name} setCustVal={setName} />
        <Textinput
          placeholder={EMAIL_ID}
          custVal={emailId}
          setCustVal={setEmailId}
        />
        <Textinput
          placeholder={PHONE_NUMBER}
          custVal={phone}
          setCustVal={setPhone}
        />
        <DropdownComponent
          value={value}
          setValue={setValue}
          data={GENDER_ROLES}
          placeholder={SELECT_GENDER}
        />
      </View>
      <AuthenticationButton text={SIGN_UP} onPress={() => registerUser()} />
    </SafeArea>
  );
};
