import {Alert} from 'react-native';
import {openImagePicker, openImagePickerForProfilePhoto} from './CameraPicker';

export const askForSourceInUpload = ({index, Photos, setPhotos}) =>
  Alert.alert('Select Source', '', [
    {
      text: 'Gallery',
      onPress: () =>
        openImagePicker({Photos, setPhotos, index, source: 'GALLERY'}),
    },
    {
      text: 'Camera',
      onPress: () =>
        openImagePicker({Photos, setPhotos, index, source: 'CAMERA'}),
    },
  ]);

export const askForSourceDuringSignUp = ({setProfilePhoto}) =>
  Alert.alert('Select Source', '', [
    {
      text: 'Gallery',
      onPress: () =>
        openImagePickerForProfilePhoto({setProfilePhoto, source: 'GALLERY'}),
    },
    {
      text: 'Camera',
      onPress: () => openImagePicker({setProfilePhoto, source: 'CAMERA'}),
    },
  ]);
