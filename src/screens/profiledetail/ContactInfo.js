import {View} from 'react-native';
import {ContactInfo} from '../../components/ContactInfo';
import {styles} from './styles';
import {EMAIL_ID, NAME, PHONE_NUMBER, USER_NAME} from '../../constants/Labels';

export const ContactInfoWrapper = ({user}) => {
  return (
    <View style={styles.contactcontainer}>
      <ContactInfo title={USER_NAME} information={user.Username} />
      <ContactInfo title={NAME} information={user.Name} />
      <ContactInfo title={EMAIL_ID} information={user.Email} />
      <ContactInfo title={PHONE_NUMBER} information={user.Phone} />
    </View>
  );
};
