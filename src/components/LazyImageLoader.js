import FastImage from 'react-native-fast-image';

export const LazyImageLoader = ({uri, styles, resizeMode = null}) => {
  return (
    <FastImage
      source={{uri: uri, priority: FastImage.priority.high}}
      resizeMode={resizeMode ? resizeMode : 'contain'}
      style={styles}
    />
  );
};
