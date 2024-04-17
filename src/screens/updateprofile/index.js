import {Alert, Image, Pressable, StyleSheet, View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Textinput} from '../../components/Textinput';
import {SafeArea} from '../../components/SafeArea';
import {
  EMAIL_ID,
  GENDER_ROLES,
  NAME,
  PHONE_NUMBER,
  USER_NAME,
} from '../../constants/Labels';
import {UPDATE_PROFILE} from '../../constants/Buttontitles';
import DropdownComponent from '../../components/Dropdown';
import {useContext, useState} from 'react';
import {SELECT_GENDER} from '../../constants/Placeholders';
import {Context} from '../../navigation/BottomTab';
import {FILL_DETAILS} from '../../constants/Messages';
import {PROFILE_ICON} from '../../assets';
import {askForSourceDuringSignUp} from '../../components/AskForSource';
import {UPDATE_PROFILE} from '../../constants/Apicall';
import {apiService} from '../../services/apiService';

export const UpdateProfile = () => {
  const {user} = useContext(Context);
  const {setLoading} = useContext(Context);
  const [gender, setGender] = useState(user?.Gender || null);
  const [username, setUsername] = useState(user.Username);
  const [name, setName] = useState(user.Name);
  const [emailId, setEmailId] = useState(user.Email);
  const [phone, setPhone] = useState(user.Phone);
  const [profilephoto, setProfilePhoto] = useState(user?.ProfilePhoto);

  const registerUser = async () => {
    if (!username || !name || !emailId || !phone || !gender) {
      return Alert.alert(FILL_DETAILS);
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('Username', username);
    formData.append('Name', name);
    formData.append('Email', emailId);
    formData.append('Phone', phone);
    if (profilephoto !== user?.ProfilePhoto) {
      formData.append('ProfilePhoto', {
        uri: profilephoto.uri,
        type: profilephoto.type,
        name: profilephoto.fileName,
      });
    } else {
      formData.append('ProfilePhoto', profilephoto);
    }
    formData.append('Gender', gender);
    const response = await apiService.postformdata(UPDATE_PROFILE, formData);
    setUser(response.user);
    setLoading(false);
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
          gender={gender}
          setGender={setGender}
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
