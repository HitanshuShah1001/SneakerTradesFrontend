import {useContext} from 'react';
import {Context} from '../../navigation/BottomTab';
import {SafeArea} from '../../components/SafeArea';
import {Image, View} from 'react-native';
import {ContactInfo} from '../../components/ContactInfo';
import {MY_PROFILE} from '../../constants/Buttontitles';
import {EMAIL_ID, NAME, PHONE_NUMBER, USER_NAME} from '../../constants/Labels';

export const ProfileDetail = () => {
  const {user, setUser} = useContext(Context);

  return (
    <SafeArea go_back={true} text={MY_PROFILE}>
      <Image source={{uri: user.ProfilePhoto}} style={styles.image} />
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
  contactcontainer: {width: '90%', alignSelf: 'center', marginTop: 20},
};
