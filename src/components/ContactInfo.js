import {StyleSheet, Text, View} from 'react-native';
import {TITLE_COLOR} from '../constants/colorsandfonts';

export const ContactInfo = ({title, information}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.information}>{information}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 20},
  title: {fontWeight: 400, fontSize: 12, color: TITLE_COLOR},
  information: {fontWeight: 400, fontSize: 18, color: '#000000'},
});
