import {Text, View} from 'react-native';
import {FONT_WEIGHT_BOLD, TITLE_COLOR} from '../constants/colorsandfonts';

export const Sneakerdetailstext = ({Name, Brand, Gender, Size}) => {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.name}>{Name}</Text>
      <Text style={styles.brand}>{Brand}</Text>
      <View style={styles.additionalDetails}>
        <Text style={styles.detailText}>Gender: {Gender}</Text>
        <Text style={styles.detailText}>Size: UK-{Size}</Text>
      </View>
    </View>
  );
};
const styles = {
  mainImage: {
    height: '40%',
    width: '100%',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 12,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  thumbnailImage: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  detailsContainer: {
    alignItems: 'flex-start',
    marginTop: 15,
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
    marginTop: 16,
  },
  detailText: {
    fontSize: 16,
    fontWeight: '400',
    color: TITLE_COLOR,
  },
};
