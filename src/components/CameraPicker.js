import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const openImagePicker = ({Photos, setPhotos, index}) => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  launchImageLibrary(options, response => {
    if (response.didCancel) {
    } else if (response.error) {
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
