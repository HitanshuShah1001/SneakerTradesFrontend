import {useContext} from 'react';
import {UserContext} from '../../navigation/BottomTab';
import {SafeArea} from '../../components/SafeArea';
import {Image, View} from 'react-native';
import {ContactInfo} from '../../components/ContactInfo';

export const ProfileDetail = () => {
  const {user, setUser} = useContext(UserContext);

  return (
    <SafeArea go_back={true} text={'My Profile'}>
      <Image source={{uri: user.ProfilePhoto}} style={styles.image} />
      <View style={styles.contactcontainer}>
        <ContactInfo title={'Username'} information={user.Username} />
        <ContactInfo title={'Name'} information={user.Name} />
        <ContactInfo title={'Email ID'} information={user.Email} />
        <ContactInfo title={'Phone Number'} information={user.Phone} />
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
