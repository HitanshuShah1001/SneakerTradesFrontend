import {SafeArea} from '../../components/SafeArea';
import {Image} from 'react-native';
import {MY_PROFILE, UPDATE_PROFILE} from '../../constants/Buttontitles';
import {PROFILE_PLACEHOLDER_ICON} from '../../assets';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {useNavigation} from '@react-navigation/native';
import {UPDATE_PROFILE_SCREEN} from '../../constants/Screen';
import {styles} from './styles';
import {ContactInfoWrapper} from './ContactInfo';
import {LazyImageLoader} from '../../components/LazyImageLoader';

export const ProfileDetail = props => {
  const navigation = useNavigation();
  const {user} = props.route.params || {};
  return (
    <SafeArea go_back={true} text={MY_PROFILE}>
      {user?.ProfilePhoto !== '' ? (
        <LazyImageLoader uri={user.ProfilePhoto} styles={styles.image} />
      ) : (
        <Image
          source={PROFILE_PLACEHOLDER_ICON}
          style={styles.placeholder_image}
          resizeMode="contain"
        />
      )}
      <ContactInfoWrapper user={user} />
      <AuthenticationButton
        text={UPDATE_PROFILE}
        customstyles={{marginTop: 20}}
        onPress={() => navigation.navigate(UPDATE_PROFILE_SCREEN)}
      />
    </SafeArea>
  );
};
