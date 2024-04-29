import {Alert, View} from 'react-native';
import {UPLOAD} from '../../constants/Choices';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {IMAGE_PLACEHOLDERS} from '../../constants/Labels';
import {styles} from './styles';

const isAnyFieldEmpty = fields => {
  for (let field of fields) {
    if (!field) {
      return true;
    }
  }
  return false;
};

export const areAllFieldsValid = ({Name, Gender, Type, Size}) => {
  return !isAnyFieldEmpty([Name, Gender, Type, Size]);
};

export const ResetFields = ({
  uploadedFor,
  setBrand,
  setGender,
  setName,
  setPrice,
  setSize,
  setType,
  setUploadedFor,
}) => {
  const UPLOADORREQUEST =
    uploadedFor === UPLOAD
      ? `Sneaker uploaded succesfully`
      : `Sneaker requested succesfully`;
  Alert.alert(UPLOADORREQUEST);
  setBrand('');
  setGender('');
  setName('');
  setPrice('');
  setSize('');
  setType('');
  setUploadedFor(UPLOAD);
};

export const UploadSneakerButton = ({onPress}) => (
  <View style={styles.uploadbutton}>
    <AuthenticationButton text={UPLOAD} onPress={onPress} />
  </View>
);
