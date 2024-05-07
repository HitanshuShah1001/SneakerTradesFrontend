import {Searchbar} from 'react-native-paper';
import {SEARCH_CLEAR, SEARCH_ICON} from '../assets';
import {Image, StyleSheet, View} from 'react-native';
import {SEARCH} from '../constants/Placeholders';
export const Search = ({searchQuery, onChangeText}) => {
  return (
    <View style={styles.wrapper}>
      <Searchbar
        placeholder={SEARCH}
        inputStyle={styles.input}
        onChangeText={onChangeText}
        value={searchQuery}
        style={styles.container}
        icon={() => <Image source={SEARCH_ICON} />}
        clearIcon={() =>
          searchQuery ? (
            <Image source={SEARCH_CLEAR} style={styles.image} />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {height: 18, width: 18},
  wrapper: {width: '90%', alignSelf: 'center', flexDirection: 'row'},
  input: {
    fontSize: 14,
    fontFamily: 'DMSans',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    borderRadius: 12,
    alignSelf: 'center',
    width: '100%',
    marginVertical: 8,
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 56,
    width: '16%',
    borderRadius: 12,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginLeft: 10,
  },
});
