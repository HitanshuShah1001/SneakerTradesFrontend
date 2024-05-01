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
import {useCallback, useContext, useState} from 'react';
import {OTP_VERIFY} from '../../constants/Screen';
import {SELECT_GENDER} from '../../constants/Placeholders';
import {Context} from '../../navigation/BottomTab';
import {
  ENTER_A_VALID_EMAIL,
  FILL_DETAILS,
  USERNAME_ALREADY_EXISTS,
} from '../../constants/Messages';
import {CANCEL_ICON, USER_UPLOAD_ICON} from '../../assets';
import {askForSourceDuringSignUp} from '../../components/AskForSource';
import {ViewWrapper} from '../../components/ViewWrapper';
import {styles} from './styles';
import {apiService} from '../../services/apiService';
import {CHECK_IF_USERNAME_EXISTS} from '../../constants/Apicall';
import {AlertMessage} from '../../utils/Alertmessage';
import {STRETCH} from '../../constants/InputOptions';
import {isValidEmail} from '../../utils/RegexTests';

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
      return AlertMessage(FILL_DETAILS);
    } else if (!isValidEmail(emailId)) {
      return AlertMessage(ENTER_A_VALID_EMAIL);
    }
    const response = await apiService.post(CHECK_IF_USERNAME_EXISTS, {
      Username: username,
    });
    if (response === USERNAME_ALREADY_EXISTS) {
      return AlertMessage(USERNAME_ALREADY_EXISTS);
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

  const ProfilePhoto = useCallback(
    () => (
      <View style={styles.profilephotowrapper}>
        <Pressable onPress={() => setProfilePhoto(PROFILE_PHOTO_PLACEHOLDER)}>
          <Image source={CANCEL_ICON} style={styles.canceliconimage} />
        </Pressable>
        <Image
          source={{uri: profilephoto.uri}}
          style={styles.image}
          resizeMode={STRETCH}
        />
      </View>
    ),
    [profilephoto],
  );

  return (
    <SafeArea go_back={true}>
      <Brandiconandtext />
      <ViewWrapper customstyles={{flex: 0.9, alignItems: 'center'}}>
        <Pressable onPress={handleImagePickerPress}>
          {profilephoto.uri ? (
            <ProfilePhoto />
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
          inputMode={'numeric'}
        />
        <DropdownComponent
          value={gender}
          setValue={setGender}
          data={GENDER_ROLES}
          placeholder={SELECT_GENDER}
        />
      </ViewWrapper>
      <AuthenticationButton text={SIGN_UP} onPress={() => registerUser()} />
    </SafeArea>
  );
};
