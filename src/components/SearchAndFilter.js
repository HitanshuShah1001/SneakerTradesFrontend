import {Searchbar} from 'react-native-paper';
import {FILTER_ICON, SEARCH_ICON} from '../assets';
import {Image, Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FILTER_SCREEN} from '../constants/Screen';
export const SearchAndFilter = ({searchQuery, setSearchQuery}) => {
  const navigation = useNavigation();
  return (
    <View style={{width: '90%', alignSelf: 'center', flexDirection: 'row'}}>
      <Searchbar
        placeholder="SEARCH"
        inputStyle={styles.input}
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
        style={styles.container}
        icon={() => <Image source={SEARCH_ICON} />}
      />
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate(FILTER_SCREEN)}>
        <Image source={FILTER_ICON} />
      </Pressable>
    </View>
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
    width: '80%',
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
};
