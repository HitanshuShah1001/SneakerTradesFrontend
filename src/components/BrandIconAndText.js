import {Image, StyleSheet, View} from 'react-native';
import {BRAND_ICON, SNEAKER_TRADES_TEXT} from '../assets';

const HEADERICONANDTEXT = ({source}) => (
  <Image style={styles.text} source={source} />
);
export const Brandiconandtext = () => (
  <View style={styles.container}>
    <HEADERICONANDTEXT source={BRAND_ICON} />
    <HEADERICONANDTEXT source={SNEAKER_TRADES_TEXT} />
  </View>
);

const styles = StyleSheet.create({
  text: {marginTop: 20},
  container: {alignItems: 'center', flex: 0.3},
});
