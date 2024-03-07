import {Image, View} from 'react-native';
import {BRAND_ICON, SNEAKER_TRADES_TEXT} from '../assets';

export const Brandiconandtext = () => (
  <View style={styles.container}>
    <Image style={styles.text} source={BRAND_ICON} />
    <Image style={styles.text} source={SNEAKER_TRADES_TEXT} />
  </View>
);

const styles = {
  text: {marginTop: 20},
  container: {alignItems: 'center', flex: 0.3},
};
