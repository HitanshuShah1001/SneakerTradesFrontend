import {StyleSheet, Text, View} from 'react-native';
import {FONT_WEIGHT_BOLD, TITLE_COLOR} from '../constants/colorsandfonts';

export const OwnerDetails = ({Name, Email, Phone}) => {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.name}>{Name}</Text>
      <View style={styles.additionalDetails}>
        <Text style={styles.detailText}>Phone - {Phone}</Text>
        <Text style={styles.detailText}>Email: {Email}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  detailsContainer: {
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '400',
  },
  brand: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT_BOLD,
  },
  additionalDetails: {
    alignItems: 'flex-start',
    marginTop: 10,
  },
  detailText: {
    fontSize: 16,
    fontWeight: '400',
    color: TITLE_COLOR,
  },
});
