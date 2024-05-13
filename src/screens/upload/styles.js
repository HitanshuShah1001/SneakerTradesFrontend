import {StyleSheet} from 'react-native';
import {PLACEHOLDER_COLOR, THEME_PINK} from '../../constants/colorsandfonts';

export const styles = StyleSheet.create({
  container: {
    minHeight: 60, // Set a minimum height to ensure it's scrollable
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 12,
  },
  imageplaceholder: {
    alignSelf: 'center',
    marginTop: 12,
    color: PLACEHOLDER_COLOR,
  },
  chip: {
    width: 160,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  photoupload: {
    height: 90,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginTop: 8,
    alignSelf: 'center',
  },
  imageselectorcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  uploadedFor: {
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME_PINK,
    height: 20,
  },
  radiocontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    width: '100%',
  },
  placeholderimage: {
    height: 64,
    width: 64,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  selectedimage: {height: '100%', width: '100%', borderRadius: 12},
  imageselectorwrapper: {width: '30%', alignItems: 'center'},
  uploadbutton: {width: '100%', marginVertical: 10},
});
