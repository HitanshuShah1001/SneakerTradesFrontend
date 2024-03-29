import {Text, View} from 'react-native';
import {FONT_SIZE, FONT_WEIGHT_BOLD} from '../constants/colorsandfonts';

export const EmptyView = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: FONT_SIZE, fontWeight: FONT_WEIGHT_BOLD}}>
      No Sneakers Found
    </Text>
  </View>
);
