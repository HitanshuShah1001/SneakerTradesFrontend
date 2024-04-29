import {Alert} from 'react-native';
import {openImagePicker, openImagePickerForProfilePhoto} from './CameraPicker';
import {
  CAMERA_LABEL,
  CANCEL_LABEL,
  GALLERY_LABEL,
  SELECT_SOURCE_LABEL,
} from '../constants/Labels';

const Cancel_option = {
  text: CANCEL_LABEL,
  onPress: () => {},
};
export const askForSourceInUpload = ({index, Photos, setPhotos}) => {
  Alert.alert(SELECT_SOURCE_LABEL, '', [
    {
      text: GALLERY_LABEL,
      onPress: () =>
        openImagePicker({
          Photos,
          setPhotos,
          index,
          source: GALLERY_LABEL,
        }),
    },

    {
      text: CAMERA_LABEL,
      onPress: () =>
        openImagePicker({Photos, setPhotos, index, source: 'CAMERA'}),
    },
    Cancel_option,
  ]);
};

export const askForSourceDuringSignUp = ({setProfilePhoto}) =>
  Alert.alert(SELECT_SOURCE_LABEL, '', [
    {
      text: GALLERY_LABEL,
      onPress: () =>
        openImagePickerForProfilePhoto({setProfilePhoto, source: 'GALLERY'}),
    },
    {
      text: CAMERA_LABEL,
      onPress: () => openImagePicker({setProfilePhoto, source: 'CAMERA'}),
    },
    Cancel_option,
  ]);
