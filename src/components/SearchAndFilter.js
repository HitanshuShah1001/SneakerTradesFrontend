import {Searchbar} from 'react-native-paper';
import {FILTER_ICON, SEARCH_CLEAR, SEARCH_ICON} from '../assets';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FILTER_REQUEST_SCREEN, FILTER_SCREEN} from '../constants/Screen';
export const SearchAndFilter = ({
  searchQuery,
  onChangeText,
  isFromRequestScreen = false,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <Searchbar
        placeholder="SEARCH"
        inputStyle={styles.input}
        onChangeText={onChangeText}
        value={searchQuery}
        style={styles.container}
        icon={() => <Image source={SEARCH_ICON} />}
        clearIcon={() =>
          searchQuery ? (
            <Image source={SEARCH_CLEAR} style={{height: 18, width: 18}} />
          ) : null
        }
      />
      <Pressable
        style={styles.pressable}
        onPress={() =>
          navigation.navigate(
            isFromRequestScreen ? FILTER_REQUEST_SCREEN : FILTER_SCREEN,
          )
        }>
        <Image source={FILTER_ICON} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {width: '90%', alignSelf: 'center', flexDirection: 'row'},
  input: {
    fontSize: 14,
    fontFamily: 'DMSans',
    justifyContent: 'center',
    color: '#000000',
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
});
