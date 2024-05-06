import {Text} from 'react-native';
import {FONT_SIZE, FONT_WEIGHT_BOLD} from '../constants/colorsandfonts';
import {ViewWrapper} from './ViewWrapper';
import {useContext} from 'react';
import {Context} from '../navigation/BottomTab';

export const EmptyView = ({text = 'No Sneakers Found'}) => {
  const {loading} = useContext(Context);
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
