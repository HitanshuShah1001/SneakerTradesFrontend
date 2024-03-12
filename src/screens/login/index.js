import {useState} from 'react';
import {Alert, View} from 'react-native';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Brandiconandtext} from '../../components/BrandIconAndText';
import {Textinput} from '../../components/Textinput';
import {useNavigation} from '@react-navigation/native';
import {SafeArea} from '../../components/SafeArea';
import {apiService} from '../../services/apiService';
import {OTP_VERIFY} from '../../constants/Screen';
import {NO_USER_FOUND} from '../../constants/Messages';
import {GENERATE_OTP} from '../../constants/Buttontitles';

export const Login = () => {
  const navigation = useNavigation();
  const [Phone, setPhone] = useState('');
  const checkIfUserExists = async () => {
    const response = await apiService.post('user/login', {
      Phone: `+91-${Phone}`,
    });

    if (!response) {
      Alert.alert(NO_USER_FOUND);
    } else {
      navigation.navigate(OTP_VERIFY, {userData: response.user});
    }
  };
  return (
    <SafeArea>
      <Brandiconandtext />
      <View style={styles.inputcontainer}>
        <Textinput
          placeholder="Enter your 10 Digit Mobile Number"
          custVal={Phone}
          setCustVal={setPhone}
        />
      </View>
      <AuthenticationButton
        text={GENERATE_OTP}
        onPress={() => checkIfUserExists()}
      />
    </SafeArea>
  );
};

const styles = {
  inputcontainer: {flex: 0.6, alignItems: 'center'},
};
