import {useContext, useState} from 'react';
import {View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {styles} from '../login/styles';
import {CONFIRM_PASSWORD, PASSWORD} from '../../constants/Labels';
import {useNavigation} from '@react-navigation/native';
import {RESET_PASSWORD} from '../../constants/Buttontitles';
import {AlertMessage} from '../../utils/Alertmessage';
import {apiService} from '../../services/apiService';
import {RESET_PASSWORD_CALL} from '../../constants/Apicall';
import {STATUS_SUCCESS} from '../../constants/ApiParams';
import {LOGIN_SCREEN} from '../../constants/Screen';

export const ResetPassword = props => {
  const navigation = useNavigation();
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const {setLoading} = useContext(Context);
  const {userDataForForgotPassword} = props.route.params || {};
  const arePasswordsEqual = () =>
    !Password || !ConfirmPassword || Password !== ConfirmPassword;
  const resetPassword = async () => {
    if (!arePasswordsEqual) {
      return AlertMessage('Password and Confirm Password do not match');
    } else {
      setLoading(true);
      const response = await apiService.post(RESET_PASSWORD_CALL, {
        Email: userDataForForgotPassword.Email,
        Password,
      });
      setLoading(false);
      if (response.status === STATUS_SUCCESS) {
        AlertMessage('Password reset successful! Please login again');
        navigation.navigate(LOGIN_SCREEN);
      } else {
        AlertMessage(response.Data);
      }
    }
  };
  return (
    <SafeArea text={RESET_PASSWORD}>
      <Brandiconandtext />
      <View style={styles.inputcontainer}>
        <Textinput
          placeholder={PASSWORD}
          custVal={Password}
          setCustVal={setPassword}
          props={{secureTextEntry: true}}
        />
        <Textinput
          placeholder={CONFIRM_PASSWORD}
          custVal={ConfirmPassword}
          setCustVal={setConfirmPassword}
          props={{secureTextEntry: true}}
        />
      </View>
      <AuthenticationButton
        text={'Submit'}
        onPress={() => resetPassword()}
        showsignup={true}
      />
    </SafeArea>
  );
};
