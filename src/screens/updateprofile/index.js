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
import {PROFILE_PLACEHOLDER_ICON} from '../../assets';
import {UPDATE_PROFILE_CALL} from '../../constants/Apicall';
import {apiService} from '../../services/apiService';
import {StoreUserInLocalStorage} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {LazyImageLoader} from '../../components/LazyImageLoader';
import {CONTAIN} from '../../constants/InputOptions';

export const UpdateProfile = () => {
  const {userContext, setLoading} = useContext(Context) || {};
  const [gender, setGender] = useState(userContext?.Gender || null);
  const [username, setUsername] = useState(userContext.Username);
  const [name, setName] = useState(userContext.Name);
  const [emailId, setEmailId] = useState(userContext.Email);
  const [phone, setPhone] = useState(userContext.Phone);
  const [profilephoto, setProfilePhoto] = useState(userContext?.ProfilePhoto);

  const updateUserDetails = async () => {
    if (!username || !name || !emailId || !phone || !gender) {
      return Alert.alert(FILL_DETAILS);
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('Username', username);
    formData.append('Name', name);
    formData.append('Email', emailId);
    formData.append('Phone', phone);
    if (profilephoto?.uri != undefined) {
      formData.append('ProfilePhoto', {
        uri: profilephoto.uri,
        type: profilephoto.type,
        name: profilephoto.fileName,
      });
    } else {
      formData.append('ProfilePhoto', profilephoto);
    }
    formData.append('Gender', gender);
    const response = await apiService.patchformdata(
      UPDATE_PROFILE_CALL,
      formData,
    );
    StoreUserInLocalStorage({userData: response.Data});
    setLoading(false);
  };

  return (
    <SafeArea go_back={true}>
      <View style={{flex: 0.9, alignItems: 'center'}}>
        {userContext.ProfilePhoto || profilephoto.image ? (
          <LazyImageLoader
            uri={
              userContext.ProfilePhoto
                ? userContext.ProfilePhoto
                : profilephoto.image
            }
            styles={styles.image}
          />
        ) : (
          <Image
            source={PROFILE_PLACEHOLDER_ICON}
            style={styles.placeholder_image}
            resizeMode={CONTAIN}
          />
        )}
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
      <AuthenticationButton
        text={UPDATE_PROFILE}
        onPress={() => updateUserDetails()}
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
