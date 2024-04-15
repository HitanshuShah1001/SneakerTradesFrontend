import {Alert, Image, Pressable, StyleSheet, View} from 'react-native';
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
import {UPDATE_PROFILE} from '../../constants/Buttontitles';
import DropdownComponent from '../../components/Dropdown';
import {useContext, useEffect, useState} from 'react';
import {OTP_VERIFY} from '../../constants/Screen';
import {SELECT_GENDER} from '../../constants/Placeholders';
import {Context} from '../../navigation/BottomTab';
import {FILL_DETAILS} from '../../constants/Messages';
import {CANCEL_ICON, PROFILE_ICON, USER_UPLOAD_ICON} from '../../assets';
import {askForSourceDuringSignUp} from '../../components/AskForSource';

export const UpdateProfile = () => {
  const {user} = useContext(Context);
  const {setLoading} = useContext(Context);
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [username, setUsername] = useState(user.Username);
  const [name, setName] = useState(user.Name);
  const [emailId, setEmailId] = useState(user.Email);
  const [phone, setPhone] = useState(user.Phone);
  const [profilephoto, setProfilePhoto] = useState(PROFILE_PHOTO_PLACEHOLDER);
  useEffect(() => {
    console.log(user);
  }, []);
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
      ProfilePhoto: profilephoto,
    };
    setLoading(false);
    navigation.navigate(OTP_VERIFY, {userDataForSignUp, cameFromSignUp: true});
  };

  const handleImagePickerPress = () => {
    askForSourceDuringSignUp({setProfilePhoto});
  };
  return (
    <SafeArea go_back={true}>
      <View style={{flex: 0.9, alignItems: 'center'}}>
        <Pressable onPress={handleImagePickerPress}>
          {user.ProfilePhoto !== '' ? (
            <Image source={{uri: user.ProfilePhoto}} style={styles.image} />
          ) : (
            <Image
              source={PROFILE_ICON}
              style={styles.placeholder_image}
              resizeMode="contain"
            />
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
          value={value}
          setValue={setValue}
          data={GENDER_ROLES}
          placeholder={SELECT_GENDER}
        />
      </View>
      <AuthenticationButton
        text={UPDATE_PROFILE}
        onPress={() => registerUser()}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  placeholder_image: {
    height: 80,
    width: 80,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 12,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 12,
  },
});
