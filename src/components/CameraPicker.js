import {Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 2000,
  maxWidth: 2000,
};

export const openImagePickerForProfilePhoto = ({setProfilePhoto, source}) => {
  if (source === 'GALLERY') {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let imageUri = response.uri || response.assets[0]?.uri;
        let fileName = response.fileName || response.assets[0]?.fileName;
        let type = response.uri || response.assets[0]?.type;
        let indiObj = {};
        indiObj.uri = imageUri;
        indiObj.fileName = fileName;
        indiObj.type = type;
        indiObj.image = imageUri;
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
        let indiObj = {};
        indiObj.uri = imageUri;
        indiObj.fileName = fileName;
        indiObj.type = type;
        indiObj.image = imageUri;
        setProfilePhoto(indiObj);
      }
    });
  }
};

export const openImagePicker = ({Photos, setPhotos, index, source}) => {
  if (source === 'GALLERY') {
    launchImageLibrary(options, response => {
      console.log(response);
      let {didCancel, errorMessage, errorCode} = response || {};
      if (didCancel) {
        Alert.alert('User canceelled');
      } else if (errorMessage) {
        Alert.alert(errorMessage);
      } else if (errorCode) {
        Alert.alert(errorCode);
      } else {
        let imageUri = response.uri || response.assets[0]?.uri;
        let fileName = response.fileName || response.assets[0]?.fileName;
        let type = response.uri || response.assets[0]?.type;
        let newImages = [];
        for (let img of Photos) {
          let indiObj = {};
          indiObj.index = img.index;
          if (img.index == index) {
            indiObj.uri = imageUri;
            indiObj.fileName = fileName;
            indiObj.type = type;
            indiObj.image = imageUri;
          } else {
            indiObj.image = img.image;
            indiObj.uri = img.uri;
            indiObj.fileName = img.fileName;
            indiObj.type = img.type;
          }
          newImages.push(indiObj);
        }
        setPhotos(newImages);
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
        let imageUri = response.uri || response.assets[0]?.uri;
        let fileName = response.fileName || response.assets[0]?.fileName;
        let type = response.uri || response.assets[0]?.type;
        let newImages = [];
        for (let img of Photos) {
          let indiObj = {};
          indiObj.index = img.index;
          if (img.index == index) {
            indiObj.uri = imageUri;
            indiObj.fileName = fileName;
            indiObj.type = type;
            indiObj.image = imageUri;
          } else {
            indiObj.image = img.image;
            indiObj.uri = img.uri;
            indiObj.fileName = img.fileName;
            indiObj.type = img.type;
          }
          newImages.push(indiObj);
        }
        setPhotos(newImages);
      }
    });
  }
};

export const removeImage = ({Photos, setPhotos, index}) => {
  let newImages = [];
  for (let img of Photos) {
    let indiObj = {};
    indiObj.index = img.index;
    if (img.index == index) {
      indiObj.image = ``;
    } else {
      indiObj.image = img.image;
    }
    newImages.push(indiObj);
  }
  setPhotos(newImages);
};
