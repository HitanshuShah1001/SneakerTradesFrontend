import {Image, Pressable, View} from 'react-native';
import {PHOTO_UPLOAD} from '../../assets';
import {styles} from './styles';
import {useCallback} from 'react';
import {
  askForSourceInUpload,
  removeImageOption,
} from '../../components/AskForSource';
import {LazyImageLoader} from '../../components/LazyImageLoader';

export const Imageselector = ({
  index,
  image,
  Photos,
  setPhotos,
  uploadedFor,
}) => {
  const ImageSelectedAlongWithRemoveOption = useCallback(
    () => (
      <>
        <Pressable
          style={styles.photoupload}
          onPress={() =>
            removeImageOption({index, Photos, setPhotos, uploadedFor})
          }>
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
