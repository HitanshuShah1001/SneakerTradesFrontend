import {useContext} from 'react';
import {Context} from '../../navigation/BottomTab';
import {SafeArea} from '../../components/SafeArea';
import {Image, View} from 'react-native';
import {ContactInfo} from '../../components/ContactInfo';
import {MY_PROFILE} from '../../constants/Buttontitles';
import {EMAIL_ID, NAME, PHONE_NUMBER, USER_NAME} from '../../constants/Labels';
import {PROFILE_ICON} from '../../assets';

export const ProfileDetail = () => {
  const {user} = useContext(Context);

  return (
    <SafeArea go_back={true} text={MY_PROFILE}>
      {user.ProfilePhoto !== '' ? (
        <Image source={{uri: user.ProfilePhoto}} style={styles.image} />
      ) : (
        <Image
          source={PROFILE_ICON}
          style={styles.placeholder_image}
          resizeMode="contain"
        />
      )}

      <View style={styles.contactcontainer}>
        <ContactInfo title={USER_NAME} information={user.Username} />
        <ContactInfo title={NAME} information={user.Name} />
        <ContactInfo title={EMAIL_ID} information={user.Email} />
        <ContactInfo title={PHONE_NUMBER} information={user.Phone} />
      </View>
    </SafeArea>
  );
};

const styles = {
  image: {
    height: '30%',
    width: '90%',
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 12,
  },
  placeholder_image: {
    height: '20%',
    width: '80%',
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 12,
  },
  contactcontainer: {width: '90%', alignSelf: 'center', marginTop: 20},
};
