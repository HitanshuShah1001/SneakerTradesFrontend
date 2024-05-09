import FastImage from 'react-native-fast-image';
import {CONTAIN} from '../constants/InputOptions';

export const LazyImageLoader = ({uri, styles, resizeMode = null}) => {
  return (
    <FastImage
      source={{uri: uri, priority: FastImage.priority.high}}
      resizeMode={resizeMode ? resizeMode : CONTAIN}
      style={styles}
    />
  );
};
