import FastImage from 'react-native-fast-image';
import {CONTAIN} from '../constants/InputOptions';
import {ActivityIndicator} from 'react-native';
import {useState} from 'react';
import {PROFILE_PHOTO_PLACEHOLDER} from '../constants/Labels';
import {
  PLACEHOLDER_WHILE_DOWNLOADING,
  PROFILE_PLACEHOLDER_ICON,
} from '../assets';

export const LazyImageLoader = ({uri, styles, resizeMode = null}) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <FastImage
        source={{uri: uri, priority: FastImage.priority.high}}
        resizeMode={resizeMode ? resizeMode : CONTAIN}
        style={styles}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        defaultSource={PLACEHOLDER_WHILE_DOWNLOADING}
      />
    </>
  );
};
