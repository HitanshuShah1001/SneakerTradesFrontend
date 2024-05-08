import {Text} from 'react-native';
import {FONT_SIZE, FONT_WEIGHT_BOLD} from '../constants/colorsandfonts';
import {useContext} from 'react';
import {Context} from '../navigation/BottomTab';
import {NO_SNEAKERS_FOUND} from '../constants/Labels';

export const EmptyView = ({text = NO_SNEAKERS_FOUND}) => {
  const {loading} = useContext(Context) || {};
  if (loading) {
    return null;
  } else {
    return (
      <Text
        style={{
          fontSize: FONT_SIZE,
          fontWeight: FONT_WEIGHT_BOLD,
          textAlign: 'center',
        }}>
        {text}
      </Text>
    );
  }
};
