import {Searchbar} from 'react-native-paper';
import {SEARCH_ICON} from '../assets';
import {Image} from 'react-native';
export const Search = ({searchQuery, setSearchQuery}) => {
  return (
    <Searchbar
      placeholder="SEARCH"
      inputStyle={styles.input}
      onChangeText={text => setSearchQuery(text)}
      value={searchQuery}
      style={styles.container}
      icon={() => <Image source={SEARCH_ICON} />}
    />
  );
};

const styles = {
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
    width: '90%',
    marginVertical: 8,
  },
};
