import {Image, Pressable, View} from 'react-native';
import {CANCEL_ICON, PHOTO_UPLOAD} from '../../assets';
import {styles} from './styles';

export const Imageselector = ({
  index,
  image,
  removeImage,
  Photos,
  setPhotos,
  askForSourceInUpload,
}) => {
  return (
    <View style={{width: '30%', alignItems: 'center'}}>
      {image !== `` ? (
        <>
          <Pressable
            style={{alignSelf: 'flex-end'}}
            onPress={() => removeImage({Photos, setPhotos, index})}>
            <Image source={CANCEL_ICON} style={{height: 10, width: 10}} />
          </Pressable>
          <Pressable
            style={styles.photoupload}
            onPress={() => askForSourceInUpload({index, Photos, setPhotos})}>
            <Image source={{uri: image}} style={styles.selectedimage} />
          </Pressable>
        </>
      ) : (
        <Pressable
          style={styles.photoupload}
          onPress={() => askForSourceInUpload({index, Photos, setPhotos})}>
          <Image source={PHOTO_UPLOAD} style={styles.placeholderimage} />
        </Pressable>
      )}
    </View>
  );
};
