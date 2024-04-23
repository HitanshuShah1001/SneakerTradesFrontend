import {Alert, View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Otpinput} from '../../components/Otpinput';
import {useContext, useState} from 'react';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {VERIFY_OTP} from '../../constants/Buttontitles';
import {apiService} from '../../services/apiService';
import {SIGN_UP_CALL} from '../../constants/Apicall';
import {StoreTokenInLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {StoreUserInLocalStorage} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';

export const OTPverify = props => {
  const {setUser, setLoading} = useContext(Context);
  const {userDataForSignUp} = props?.route?.params || {};
  const {userData} = props?.route?.params || {};
  const {cameFromSignUp} = props?.route?.params || false;
  const [otp, setOTP] = useState('');
  const navigateToHome = async () => {
    if (cameFromSignUp) {
      setLoading(true);
      const {Username, Name, Phone, Email, ProfilePhoto, Gender} =
        userDataForSignUp;
      const formData = new FormData();
      formData.append('Username', Username);
      formData.append('Name', Name);
      formData.append('Email', Email);
      formData.append('Phone', Phone);
      if (ProfilePhoto.uri) {
        formData.append('ProfilePhoto', {
          uri: ProfilePhoto.uri,
          type: ProfilePhoto.type,
          name: ProfilePhoto.fileName,
        });
      }
      formData.append('Gender', Gender);
      const response = await apiService.postformdata(SIGN_UP_CALL, formData);
      setUser(response.user);
      await Promise.allSettled([
        StoreTokenInLocalStorage({token: response.token}),
        StoreUserInLocalStorage({userData: response.user}),
      ]);
      Alert.alert('User created succesfully!');
      setLoading(false);
    } else {
      setUser(userData);
      return await Promise.allSettled([
        StoreTokenInLocalStorage({token: userData.token}),
        StoreUserInLocalStorage({userData}),
      ]);
    }
  };

  return (
    <SafeArea go_back={true}>
      <Brandiconandtext />
      <View style={{flex: 0.7, alignItems: 'center'}}>
        <Otpinput setOTP={setOTP} />
      </View>
      <AuthenticationButton
        text={VERIFY_OTP}
        onPress={() => navigateToHome()}
      />
    </SafeArea>
  );
};
