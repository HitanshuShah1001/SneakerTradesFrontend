import {
  Platform,
  Pressable,
  ScrollView,
  ScrollViewBase,
  Text,
  View,
} from 'react-native';
import {SafeArea} from '../../components/SafeArea';
import {useCallback, useState} from 'react';
import {BRANDS, GENDER_ROLES, SIZES} from '../../constants/Labels';
import {Checkbox} from 'react-native-paper';
import {styles} from './styles';
import {UPLOAD} from '../../constants/Screen';
import {AuthenticationButton} from '../../components/Authenticationbutton';

export const Filter = () => {
  const [checkboxopts, setCheckboxOpts] = useState(GENDER_ROLES);
  const [selectedfilter, setSelectedFilter] = useState('Gender');
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [allfilters, setAllFilters] = useState([]);

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

  const addSelectedFiltersToRelevantArrays = (selectedfilter, text) => {
    switch (selectedfilter) {
      case 'Gender':
        if (selectedGenders.includes(text)) {
          setSelectedGenders(selectedGenders =>
            selectedGenders.filter(gender => gender !== text),
          );
          setAllFilters(allfilters =>
            allfilters.filter(gender => gender !== text),
          );
        } else {
          setSelectedGenders(selectedGenders => [...selectedGenders, text]);
          setAllFilters(allfilters => [...allfilters, text]);
        }
        break;
      case 'Brands':
        if (selectedBrands.includes(text)) {
          setSelectedBrands(selectedBrands =>
            selectedBrands.filter(brand => brand !== text),
          );
          setAllFilters(allfilters =>
            allfilters.filter(brand => brand !== text),
          );
        } else {
          setSelectedBrands(selectedBrands => [...selectedBrands, text]);
          setAllFilters(allfilters => [...allfilters, text]);
        }
        break;
      default:
        if (selectedSizes.includes(text)) {
          setSelectedSizes(selectedSizes =>
            selectedSizes.filter(size => size !== text),
          );
          setAllFilters(allfilters => allfilters.filter(size => size !== text));
        } else {
          setSelectedSizes(selectedSizes => [...selectedSizes, text]);
          setAllFilters(allfilters => [...allfilters, text]);
        }
        break;
    }
  };

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

  const TitleChips = () => (
    <View style={{width: '35%', marginLeft: 8}}>
      {['Brands', 'Gender', 'Size'].map((brand, index) => (
        <TitleChip text={brand} key={index} />
      ))}
    </View>
  );

  return (
    <SafeArea go_back text={'Filter'}>
      <View style={styles.mainContainer}>
        <TitleChips />
        <ScrollView style={styles.checkboxcontainer}>
          {checkboxopts.map((opt, index) => (
            <Checkbox.Item
              label={opt.label}
              key={index}
              mode={Platform.OS}
              onPress={() => {
                addSelectedFiltersToRelevantArrays(selectedfilter, opt.value);
              }}
              style={{
                marginTop: 4,
                borderRadius: 8,
                backgroundColor: allfilters.includes(opt.value)
                  ? 'grey'
                  : 'white',
              }}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{width: '100%', marginTop: 10, height: '10%'}}>
        <AuthenticationButton text={'SAVE'} onPress={() => {}} />
      </View>
    </SafeArea>
  );
};
