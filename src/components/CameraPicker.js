import {Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {GALLERY_LABEL} from '../constants/Labels';
import {REQUEST, UPLOAD} from '../constants/Choices';
import {options} from '../utils/ImageOptionGenerator';

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

export const openImagePicker = ({
  Photos,
  setPhotos,
  source,
  uploadedFor = REQUEST,
}) => {
  if (source === GALLERY_LABEL) {
    let length = 1;
    if (uploadedFor === UPLOAD) {
      length = 6;
      let indextoiterate = 0;
      while (Photos[indextoiterate].uri != '' && indextoiterate != 6) {
        length -= 1;
        indextoiterate += 1;
      }
    }
    launchImageLibrary(options(length), response => {
      let {didCancel, errorMessage, errorCode} = response || {};
      if (didCancel) {
      } else if (errorMessage) {
      } else if (errorCode) {
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
            responseArrayIndex += 1;
          }
          photoArrayIndex += 1;
        }
        setPhotos(Images);
      }
    });
  } else {
    launchCamera(options, response => {
      let {errorMessage, errorCode} = response || {};
      if (errorMessage) {
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
            responseArrayIndex += 1;
          }
          photoArrayIndex += 1;
        }
        setPhotos(Images);
      }
    });
  }
};

export const removeImage = ({Photos, setPhotos, index, uploadedFor}) => {
  if (uploadedFor === REQUEST) {
    setPhotos([{image: '', uri: '', fileName: '', type: ''}]);
    return;
  }
  const newImagesBeforeRemovedElement = Photos.slice(0, index);
  const newImagesAfterRemovedElement = Photos.slice(index + 1);
  let photosConcatenated = newImagesBeforeRemovedElement.concat(
    newImagesAfterRemovedElement,
  );

  let lengthOfPhotosConcatenated = photosConcatenated.length;
  while (lengthOfPhotosConcatenated < 6) {
    let obj = {};
    obj.fileName = '';
    obj.image = '';
    obj.type = '';
    obj.uri = '';
    photosConcatenated.push(obj);
    lengthOfPhotosConcatenated += 1;
  }

  setPhotos(photosConcatenated);
};
