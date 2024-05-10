import {Image, Pressable, View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import {useNavigation} from '@react-navigation/native';
import {SafeArea} from '../../components/SafeArea';
import {
  EMAIL_ID,
  GENDER_ROLES,
  NAME,
  PASSWORD,
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
  ENTER_A_VALID_PHONE,
  FILL_DETAILS,
  SIGNUP_FIELDS_EXISTS,
} from '../../constants/Messages';
import {CANCEL_ICON, USER_UPLOAD_ICON} from '../../assets';
import {askForSourceDuringSignUp} from '../../components/AskForSource';
import {ViewWrapper} from '../../components/ViewWrapper';
import {styles} from './styles';
import {apiService} from '../../services/apiService';
import {
  CHECK_IF_USERNAME_EMAIL_PHONE_EXISTS,
  SEND_OTP_EMAIL,
} from '../../constants/Apicall';
import {AlertMessage} from '../../utils/Alertmessage';
import {STRETCH} from '../../constants/InputOptions';
import {isValidEmail, isValidPhone} from '../../utils/RegexTests';
import {LazyImageLoader} from '../../components/LazyImageLoader';
import {STATUS_SUCCESS} from '../../constants/ApiParams';

export const SignUp = () => {
  const {setLoading} = useContext(Context) || {};
  const navigation = useNavigation();
  const [gender, setGender] = useState(null);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');
  const [profilephoto, setProfilePhoto] = useState(PROFILE_PHOTO_PLACEHOLDER);

  const registerUser = async () => {
    if (!isValidPhone(phone)) {
      return AlertMessage(ENTER_A_VALID_PHONE);
    }
    if (!username || !name || !emailId || !phone || !gender) {
      return AlertMessage(FILL_DETAILS);
    } else if (!isValidEmail(emailId)) {
      return AlertMessage(ENTER_A_VALID_EMAIL);
    }
    setLoading(true);
    const response = await apiService.post(
      CHECK_IF_USERNAME_EMAIL_PHONE_EXISTS,
      {
        Username: username,
        Phone: phone,
        Email: emailId,
      },
    );
    if (SIGNUP_FIELDS_EXISTS.includes(response?.Data)) {
      setLoading(false);
      return AlertMessage(response.Data);
    } else {
      const response = await apiService.post(SEND_OTP_EMAIL, {
        Email: emailId,
      });
      setLoading(false);
      if (response.status === STATUS_SUCCESS) {
        const {
          Data: {otp},
        } = response;
        const userDataForSignUp = {
          Username: username,
          Name: name,
          Email: emailId,
          Phone: phone,
          ProfilePhoto: profilephoto,
          Gender: gender,
          otp,
        };
        setLoading(false);
        navigation.navigate(OTP_VERIFY, {
          userDataForSignUp,
          cameFromSignUp: true,
        });
      }
    }
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
        <LazyImageLoader
          uri={profilephoto.uri}
          styles={styles.image}
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
          is_mandatory
        />
        <Textinput
          placeholder={NAME}
          custVal={name}
          setCustVal={setName}
          is_mandatory
        />
        <Textinput
          placeholder={EMAIL_ID}
          custVal={emailId}
          setCustVal={setEmailId}
          is_mandatory
        />
        <Textinput
          placeholder={PASSWORD}
          custVal={Password}
          setCustVal={setPassword}
          is_mandatory
          props={{secureTextEntry: true}}
        />
        <Textinput
          placeholder={PHONE_NUMBER}
          custVal={phone}
          setCustVal={setPhone}
          inputMode={'numeric'}
          is_mandatory
        />
        <DropdownComponent
          value={gender}
          setValue={setGender}
          data={GENDER_ROLES}
          placeholder={SELECT_GENDER}
          is_mandatory
        />
      </ViewWrapper>
      <AuthenticationButton text={SIGN_UP} onPress={() => registerUser()} />
    </SafeArea>
  );
};
