import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const openImagePicker = ({images, setImages, index}) => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  launchImageLibrary(options, response => {
    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      // console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;

      let newImages = [];
      for (let img of images) {
        let indiObj = {};
        indiObj.index = img.index;
        if (img.index == index) {
          indiObj.image = imageUri;
        } else {
          indiObj.image = img.image;
        }
        newImages.push(indiObj);
      }
      setImages(newImages);
    }
  });
};

export const removeImage = ({images, setImages, index}) => {
  let newImages = [];
  for (let img of images) {
    let indiObj = {};
    indiObj.index = img.index;
    if (img.index == index) {
      indiObj.image = ``;
    } else {
      indiObj.image = img.image;
    }
    newImages.push(indiObj);
  }
  setImages(newImages);
};
