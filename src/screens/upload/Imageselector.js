import {Image, Pressable, View} from 'react-native';
import {CANCEL_ICON, PHOTO_UPLOAD} from '../../assets';
import {styles} from './styles';
import {useCallback} from 'react';
import {askForSourceInUpload} from '../../components/AskForSource';

export const Imageselector = ({
  index,
  image,
  removeImage,
  Photos,
  setPhotos,
  max_select,
}) => {
  const ImageSelectedAlongWithRemoveOption = useCallback(
    () => (
      <>
        <Pressable
          style={{alignSelf: 'flex-end'}}
          onPress={() => removeImage({Photos, setPhotos, index})}>
          <Image source={CANCEL_ICON} style={styles.cancel_icon} />
        </Pressable>
        <Pressable
          style={styles.photoupload}
          onPress={() =>
            askForSourceInUpload({index, Photos, setPhotos, max_select})
          }>
          <Image source={{uri: image}} style={styles.selectedimage} />
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
          askForSourceInUpload({index, Photos, setPhotos, max_select})
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
