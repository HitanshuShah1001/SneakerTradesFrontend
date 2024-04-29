import {Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {GALLERY_LABEL} from '../constants/Labels';

const options = (length = 5) => ({
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 2000,
  maxWidth: 2000,
  selectionLimit: 5,
});

const SetImageObject = (imageUri, fileName, type) => {
  let indiObj = {};
  indiObj.uri = imageUri;
  indiObj.fileName = fileName;
  indiObj.type = type;
  indiObj.image = imageUri;
  return indiObj;
};

export const openImagePickerForProfilePhoto = ({setProfilePhoto, source}) => {
  if (source === GALLERY_LABEL) {
    launchImageLibrary(options(), response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let imageUri = response.uri || response.assets[0]?.uri;
        let fileName = response.fileName || response.assets[0]?.fileName;
        let type = response.uri || response.assets[0]?.type;
        let indiObj = SetImageObject(imageUri, fileName, type);
        setProfilePhoto(indiObj);
      }
    });
  } else {
    launchCamera(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let imageUri = response.uri || response.assets[0]?.uri;
        let fileName = response.fileName || response.assets[0]?.fileName;
        let type = response.uri || response.assets[0]?.type;
        let indiObj = SetImageObject(imageUri, fileName, type);
        setProfilePhoto(indiObj);
      }
    });
  }
};

export const openImagePicker = ({Photos, setPhotos, index, source}) => {
  if (source === GALLERY_LABEL) {
    launchImageLibrary(options(), response => {
      let {didCancel, errorMessage, errorCode} = response || {};
      if (didCancel) {
        Alert.alert('User cancelled');
      } else if (errorMessage) {
        Alert.alert(errorMessage);
      } else if (errorCode) {
        Alert.alert(errorCode);
      } else {
        let Images = [...Photos];
        let photoArrayIndex = 0;
        let responseArrayIndex = 0;
        while (
          photoArrayIndex < 6 &&
          responseArrayIndex < response?.assets?.length
        ) {
          if (Images[photoArrayIndex]?.uri == '') {
            Images[photoArrayIndex].image =
              response?.assets[responseArrayIndex]?.uri;
            Images[photoArrayIndex].type =
              response?.assets[responseArrayIndex]?.type;
            Images[photoArrayIndex].uri =
              response?.assets[responseArrayIndex]?.uri;
            Images[photoArrayIndex].fileName =
              response?.assets[responseArrayIndex]?.fileName;
            Images[photoArrayIndex].index = photoArrayIndex;
            responseArrayIndex += 1;
          }
          photoArrayIndex += 1;
        }
        setPhotos(Images);
      }
    });
  } else {
    launchCamera(options, response => {
      let {didCancel, errorMessage, errorCode} = response || {};
      if (errorMessage) {
        Alert.alert(errorMessage);
      } else if (didCancel) {
        Alert.alert('User cancelled');
      } else if (errorCode) {
        Alert.alert(errorCode);
      } else {
        let Images = [...Photos];
        let photoArrayIndex = 0;
        let responseArrayIndex = 0;
        while (
          photoArrayIndex < 6 &&
          responseArrayIndex < response?.assets?.length
        ) {
          if (Images[photoArrayIndex]?.uri == '') {
            Images[photoArrayIndex].image =
              response?.assets[responseArrayIndex]?.uri;
            Images[photoArrayIndex].type =
              response?.assets[responseArrayIndex]?.type;
            Images[photoArrayIndex].uri =
              response?.assets[responseArrayIndex]?.uri;
            Images[photoArrayIndex].fileName =
              response?.assets[responseArrayIndex]?.fileName;
            Images[photoArrayIndex].index = photoArrayIndex;
            responseArrayIndex += 1;
          }
          photoArrayIndex += 1;
        }
        setPhotos(Images);
      }
    });
  }
};

export const removeImage = ({Photos, setPhotos, index}) => {
  console.log(Photos, 'Photos incoming');
  const newImagesBeforeRemovedElement = Photos.slice(0, index);
  const newImagesAfterRemovedElement = Photos.slice(index + 1);
  let photosConcatenated = newImagesBeforeRemovedElement.concat(
    newImagesAfterRemovedElement,
  );
  console.log(Photos, 'Photos after remocal');
  let lengthOfPhotosConcatenated = photosConcatenated.length;
  while (lengthOfPhotosConcatenated < 6) {
    let obj = {};
    obj.fileName = '';
    obj.image = '';
    obj.index = lengthOfPhotosConcatenated - 1;
    obj.type = '';
    obj.uri = '';
    photosConcatenated.push(obj);
    lengthOfPhotosConcatenated += 1;
  }

  setPhotos(photosConcatenated);
};
