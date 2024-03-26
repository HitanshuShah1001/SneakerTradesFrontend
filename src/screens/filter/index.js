import {Platform, Pressable, Text, View} from 'react-native';
import {SafeArea} from '../../components/SafeArea';
import {useCallback, useState} from 'react';
import {BRANDS, GENDER_ROLES, SIZES} from '../../constants/Labels';
import {Checkbox} from 'react-native-paper';

export const Filter = () => {
  const [checkboxopts, setCheckboxOpts] = useState(GENDER_ROLES);
  const [selectedfilter, setSelectedFilter] = useState('Gender');

  const changeSelectedFilter = useCallback(
    text => {
      switch (text) {
        case 'Gender':
          setCheckboxOpts(GENDER_ROLES);
          break;
        case 'Brands':
          setCheckboxOpts(BRANDS);
          break;
        default:
          setCheckboxOpts(SIZES);
          break;
      }
    },
    [checkboxopts],
  );

  const TitleChip = ({text}) => {
    return (
      <Pressable
        style={[
          styles.pressable,
          {borderWidth: selectedfilter === text ? 1 : 0},
        ]}
        onPress={() => {
          setCheckboxOpts(text);
          setSelectedFilter(text);
          changeSelectedFilter(text);
        }}>
        <Text>{text}</Text>
      </Pressable>
    );
  };

  return (
    <SafeArea go_back text={'Filter'}>
      <View style={styles.mainContainer}>
        <View style={{width: '40%'}}>
          {['Brands', 'Gender', 'Size'].map((brand, index) => (
            <TitleChip text={brand} key={index} />
          ))}
        </View>
        <View style={styles.checkboxcontainer}>
          {checkboxopts.map((opt, index) => (
            <Checkbox.Item
              label={opt.label}
              status="checked"
              key={index}
              mode={Platform.OS}
            />
          ))}
        </View>
      </View>
    </SafeArea>
  );
};

const styles = {
  mainContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    height: '100%',
    borderRadius: 12,
  },
  pressable: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginTop: 10,
  },
  checkboxcontainer: {
    width: '55%',
    backgroundColor: 'white',
    height: '90%',
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 12,
  },
};
