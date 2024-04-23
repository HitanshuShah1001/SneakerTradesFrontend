import {useContext, useEffect} from 'react';
import {Context} from '../../navigation/BottomTab';
import {SafeArea} from '../../components/SafeArea';
import {Image} from 'react-native';
import {MY_PROFILE} from '../../constants/Buttontitles';
import {PROFILE_ICON} from '../../assets';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {useNavigation} from '@react-navigation/native';
import {UPDATE_PROFILE_SCREEN} from '../../constants/Screen';
import {styles} from './styles';
import {ContactInfoWrapper} from './ContactInfo';

export const ProfileDetail = () => {
  const {user} = useContext(Context);
  const navigation = useNavigation();

  return (
    <SafeArea go_back={true} text={MY_PROFILE}>
      {user.ProfilePhoto !== '' ? (
        <Image
          source={{uri: user.ProfilePhoto}}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={PROFILE_ICON}
          style={styles.placeholder_image}
          resizeMode="contain"
        />
      )}
      <ContactInfoWrapper user={user} />
      <AuthenticationButton
        text={'Update Profile'}
        customstyles={{marginTop: 20}}
        onPress={() => navigation.navigate(UPDATE_PROFILE_SCREEN)}
      />
    </SafeArea>
  );
};
