import {View, Pressable, Image} from 'react-native';
import {CANCEL_ICON, PHOTO_UPLOAD} from '../assets';
import {openImagePicker, removeImage} from './CameraPicker';

const CancelIcon = () => (
  <Image source={CANCEL_ICON} style={{height: 10, width: 10}} />
);
export const Imageselector = ({index, image, images, setImages}) => {
  return (
    <View style={styles.imagecontainer}>
      {image !== `` ? (
        <>
          <Pressable
            style={{alignSelf: 'flex-end', marginBottom: -1}}
            onPress={() => removeImage({images, setImages, index})}>
            <CancelIcon />
          </Pressable>
          <Pressable
            style={styles.photoupload}
            onPress={() => openImagePicker({images, setImages, index})}>
            <Image source={{uri: image}} style={styles.selectedimage} />
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            style={{alignSelf: 'flex-end', marginBottom: -1}}></Pressable>
          <Pressable
            style={styles.photoupload}
            onPress={() => openImagePicker({images, setImages, index})}>
            <Image source={PHOTO_UPLOAD} style={styles.image} />
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = {
  imagecontainer: {width: '30%', alignItems: 'center'},
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
    resizeMode: 'contain',
  },
  selectedimage: {height: '100%', width: '100%', borderRadius: 12},
};
