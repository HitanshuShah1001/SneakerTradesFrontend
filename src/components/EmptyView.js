import {Text, View} from 'react-native';
import {FONT_SIZE, FONT_WEIGHT_BOLD} from '../constants/colorsandfonts';
import {ViewWrapper} from './ViewWrapper';

export const EmptyView = ({text = 'No Sneakers Found'}) => (
  <ViewWrapper
    customstyles={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: FONT_SIZE, fontWeight: FONT_WEIGHT_BOLD}}>
      {text}
    </Text>
  </ViewWrapper>
);
