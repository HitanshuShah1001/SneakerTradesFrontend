import {Alert, Pressable, View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Otpinput} from '../../components/Otpinput';
import {useCallback, useContext, useEffect, useState} from 'react';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {VERIFY_OTP} from '../../constants/Buttontitles';
import {apiService} from '../../services/apiService';
import {SIGN_UP_CALL} from '../../constants/Apicall';
import {StoreTokenInLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {StoreUserInLocalStorage} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {setNotificationTimer} from '../../components/NotificationTimer';
import {ViewWrapper} from '../../components/ViewWrapper';
import {Text} from 'react-native-paper';
import {styles} from './styles';
import {STATUS_FAIL} from '../../constants/ApiParams';
import {AlertMessage} from '../../utils/Alertmessage';
import {OTP_SENT_MESSAGE} from '../../constants/Labels';

export const OTPverify = props => {
  const {setUser, setLoading} = useContext(Context);
  const {userDataForSignUp} = props?.route?.params || {};
  const [timeleft, setTimeLeft] = useState(30);
  const [showtryagaintext, setShowTryAgainText] = useState(true);
  const [otp, setOTP] = useState('');
  const navigateToHome = async () => {
    if (otp.toString() === userDataForSignUp.otp) {
      setLoading(true);
      const {Username, Name, Phone, Email, ProfilePhoto, Gender, Password} =
        userDataForSignUp;
      const formData = new FormData();
      formData.append('Username', Username);
      formData.append('Name', Name);
      formData.append('Email', Email);
      formData.append('Phone', Phone);
      formData.append('Password', Password);
      if (ProfilePhoto.uri) {
        formData.append('ProfilePhoto', {
          uri: ProfilePhoto.uri,
          type: ProfilePhoto.type,
          name: ProfilePhoto.fileName,
        });
      }
      formData.append('Gender', Gender);
      const response = await apiService.postformdata(SIGN_UP_CALL, formData);
      if (response.status === STATUS_FAIL) {
        setLoading(false);
        return Alert.alert('Some error occured');
      } else {
        setUser(response.user);
        await Promise.allSettled([
          StoreTokenInLocalStorage({token: response.Data.token}),
          StoreUserInLocalStorage({userData: response.Data.user}),
          setNotificationTimer(),
        ]);
        AlertMessage('User created succesfully!');
        setLoading(false);
      }
    } else {
      AlertMessage('Invalid OTP');
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setTimeLeft(timeleft => timeleft - 1);
    }, 1000);

    if (timeleft <= 0) {
      setShowTryAgainText(false);
      clearTimeout(timer);
    }
  }, [timeleft]);

  const ResendOtpOption = useCallback(() => {
    return (
      <View style={styles.resendOtpContainer}>
        {showtryagaintext ? (
          <Text style={styles.tryagain}>
            Resend again in {timeleft} seconds
          </Text>
        ) : (
          <Pressable style={styles.pressableresendwrapper} onPress={() => {}}>
            <Text style={styles.otpsendagaintext}>Resend OTP</Text>
          </Pressable>
        )}
      </View>
    );
  }, [timeleft, showtryagaintext]);

  return (
    <SafeArea go_back={true}>
      <Brandiconandtext />
      <ViewWrapper customstyles={{flex: 0.7, alignItems: 'center'}}>
        <Otpinput setOTP={setOTP} />
        <ResendOtpOption />
        <Text style={styles.text}>{OTP_SENT_MESSAGE}</Text>
      </ViewWrapper>
      <AuthenticationButton
        text={VERIFY_OTP}
        onPress={() => navigateToHome()}
      />
    </SafeArea>
  );
};
