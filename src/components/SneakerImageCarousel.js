import {Image, Pressable} from 'react-native';
import {
  FONT_SIZE,
  FONT_WEIGHT_BOLD,
  TITLE_COLOR,
} from '../constants/colorsandfonts';

export const Sneakerimages = ({Photos, setSelectedSneakerImage}) => {
  const handleImagePress = photo => {
    setSelectedSneakerImage(photo);
  };
  return (
    <>
      {Photos.map((photo, index) => (
        <Pressable key={index} onPress={photo => handleImagePress(photo)}>
          <Image source={{uri: photo}} style={styles.thumbnailImage} />
        </Pressable>
      ))}
    </>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 10,
  },
  mainImage: {
    height: '40%',
    width: '100%',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 12,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  thumbnailImage: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  detailsContainer: {
    alignItems: 'flex-start',
    marginTop: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '400',
  },
  brand: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT_BOLD,
  },
  additionalDetails: {
    alignItems: 'flex-start',
    marginTop: 16,
  },
  detailText: {
    fontSize: FONT_SIZE,
    fontWeight: '400',
    color: TITLE_COLOR,
  },
};
