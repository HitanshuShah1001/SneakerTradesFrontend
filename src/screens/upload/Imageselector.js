import {Image, Pressable, View} from 'react-native';
import {CANCEL_ICON, PHOTO_UPLOAD} from '../../assets';
import {styles} from './styles';
import {useCallback} from 'react';
import {askForSourceInUpload} from '../../components/AskForSource';
import {LazyImageLoader} from '../../components/LazyImageLoader';

export const Imageselector = ({
  index,
  image,
  removeImage,
  Photos,
  setPhotos,
  uploadedFor,
}) => {
  const ImageSelectedAlongWithRemoveOption = useCallback(
    () => (
      <>
        <Pressable
          style={{alignSelf: 'flex-end', marginTop: 6}}
          onPress={() => removeImage({Photos, setPhotos, index, uploadedFor})}>
          <Image source={CANCEL_ICON} style={styles.cancel_icon} />
        </Pressable>
        <Pressable style={styles.photoupload} onPress={() => {}}>
          <LazyImageLoader uri={image} styles={styles.selectedimage} />
        </Pressable>
      </>
    ),
    [],
  );

  const ImageSelectorOption = useCallback(
    () => (
      <Pressable
        style={styles.photoupload}
        onPress={() =>
          askForSourceInUpload({index, Photos, setPhotos, uploadedFor})
        }>
        <Image source={PHOTO_UPLOAD} style={styles.placeholderimage} />
      </Pressable>
    ),
    [],
  );

  return (
    <View style={styles.imageselectorwrapper}>
      {image !== `` ? (
        <ImageSelectedAlongWithRemoveOption />
      ) : (
        <ImageSelectorOption />
      )}
    </View>
  );
};
