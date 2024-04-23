import {Alert, Image, Pressable, View} from 'react-native';
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
  PROFILE_PHOTO_PLACEHOLDER,
  USER_NAME,
} from '../../constants/Labels';
import {SIGN_UP} from '../../constants/Buttontitles';
import DropdownComponent from '../../components/Dropdown';
import {useContext, useState} from 'react';
import {OTP_VERIFY} from '../../constants/Screen';
import {SELECT_GENDER} from '../../constants/Placeholders';
import {Context} from '../../navigation/BottomTab';
import {FILL_DETAILS} from '../../constants/Messages';
import {CANCEL_ICON, USER_UPLOAD_ICON} from '../../assets';
import {askForSourceDuringSignUp} from '../../components/AskForSource';

export const SignUp = () => {
  const {setLoading} = useContext(Context);
  const navigation = useNavigation();
  const [gender, setGender] = useState(null);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [phone, setPhone] = useState('');
  const [profilephoto, setProfilePhoto] = useState(PROFILE_PHOTO_PLACEHOLDER);

  const registerUser = async () => {
    if (!username || !name || !emailId || !phone || !gender) {
      return Alert.alert(FILL_DETAILS);
    }
    setLoading(true);
    const userDataForSignUp = {
      Username: username,
      Name: name,
      Email: emailId,
      Phone: phone,
      ProfilePhoto: profilephoto,
      Gender: gender,
    };
    setLoading(false);
    navigation.navigate(OTP_VERIFY, {userDataForSignUp, cameFromSignUp: true});
  };

  const handleImagePickerPress = () => {
    askForSourceDuringSignUp({setProfilePhoto});
  };
  return (
    <SafeArea go_back={true}>
      <Brandiconandtext />
      <View style={{flex: 0.9, alignItems: 'center'}}>
        <Pressable onPress={handleImagePickerPress}>
          {profilephoto.uri ? (
            <View style={{width: 100, height: 100}}>
              <Pressable
                onPress={() => setProfilePhoto(PROFILE_PHOTO_PLACEHOLDER)}>
                <Image
                  source={CANCEL_ICON}
                  style={{height: 10, width: 10, alignSelf: 'flex-end'}}
                />
              </Pressable>
              <Image source={{uri: profilephoto.uri}} style={styles.image} />
            </View>
          ) : (
            <Image source={USER_UPLOAD_ICON} style={styles.image} />
          )}
        </Pressable>
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
          value={gender}
          setValue={setGender}
          data={GENDER_ROLES}
          placeholder={SELECT_GENDER}
        />
      </View>
      <AuthenticationButton text={SIGN_UP} onPress={() => registerUser()} />
    </SafeArea>
  );
};

const styles = {
  image: {height: 80, width: 80, borderRadius: 12, alignSelf: 'center'},
};
