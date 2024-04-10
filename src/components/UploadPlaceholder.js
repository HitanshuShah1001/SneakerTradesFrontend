import {Text} from 'react-native';
import {UPLOAD} from '../constants/Choices';
import {MIN_ONE_IMAGE, MIN_THREE_IMAGES} from '../constants/Placeholders';
import {styles} from '../screens/upload/styles';

export const UploadPlaceholder = ({uploadedFor}) => (
  <Text style={styles.imageplaceholder}>
    {uploadedFor === UPLOAD ? MIN_THREE_IMAGES : MIN_ONE_IMAGE}
  </Text>
);
