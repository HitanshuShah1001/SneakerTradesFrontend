import {Alert} from 'react-native';
import {
  openImagePicker,
  openImagePickerForProfilePhoto,
  removeImage,
} from './CameraPicker';
import {
  CAMERA_LABEL,
  CANCEL_LABEL,
  GALLERY_LABEL,
  REMOVE_IMAGE,
  SELECT_SOURCE_LABEL,
} from '../constants/Labels';
import {YES_LABEL} from '../constants/Razorpay';

const Cancel_option = {
  text: CANCEL_LABEL,
  onPress: () => {},
};
export const askForSourceInUpload = ({
  index,
  Photos,
  setPhotos,
  uploadedFor,
}) => {
  Alert.alert(SELECT_SOURCE_LABEL, '', [
    {
      text: GALLERY_LABEL,
      onPress: () =>
        openImagePicker({
          Photos,
          setPhotos,
          index,
          source: GALLERY_LABEL,
          uploadedFor,
        }),
    },

    {
      text: CAMERA_LABEL,
      onPress: () =>
        openImagePicker({Photos, setPhotos, source: CAMERA_LABEL, uploadedFor}),
    },
    Cancel_option,
  ]);
};

export const askForSourceDuringSignUp = ({setProfilePhoto}) =>
  Alert.alert(SELECT_SOURCE_LABEL, '', [
    {
      text: GALLERY_LABEL,
      onPress: () =>
        openImagePickerForProfilePhoto({
          setProfilePhoto,
          source: GALLERY_LABEL,
        }),
    },
    {
      text: CAMERA_LABEL,
      onPress: () =>
        openImagePickerForProfilePhoto({setProfilePhoto, source: CAMERA_LABEL}),
    },
    Cancel_option,
  ]);

export const removeImageOption = ({index, Photos, setPhotos, uploadedFor}) => {
  Alert.alert(REMOVE_IMAGE, '', [
    {
      text: YES_LABEL,
      onPress: () => removeImage({Photos, setPhotos, index, uploadedFor}),
    },
    Cancel_option,
  ]);
};
