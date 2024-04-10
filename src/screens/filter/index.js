import {Platform, Pressable, ScrollView, Text, View} from 'react-native';
import {SafeArea} from '../../components/SafeArea';
import {useCallback, useContext, useState} from 'react';
import {BRANDS, GENDER_ROLES, SIZES} from '../../constants/Labels';
import {Checkbox} from 'react-native-paper';
import {styles} from './styles';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {SneakerContext} from '../sneakercontext/SneakerContext';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {Context} from '../../navigation/BottomTab';
import {apiService} from '../../services/apiService';
import {useNavigation} from '@react-navigation/native';
import {HOME} from '../../constants/Screen';
import {THEME_PINK} from '../../constants/colorsandfonts';
import {Image} from 'react-native';
import {RESET_ICON} from '../../assets';

export const Filter = () => {
  const {
    setSneakers,
    checkboxopts,
    setCheckboxOpts,
    selectedBrands,
    selectedGenders,
    selectedFilter,
    selectedSizes,
    allFilters,
    setSelectedBrands,
    setSelectedFilter,
    setSelectedGenders,
    setAllFilters,
    setSelectedSizes,
    searchQuery,
  } = useContext(SneakerContext);
  const navigation = useNavigation();
  const {setLoading} = useContext(Context);
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

  const ApplyFilter = async () => {
    setLoading(true);
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.post(
      `sneaker/forpurchaseandborrow`,
      {
        searchQuery,
        filters: {
          Gender: selectedGenders,
          Brand: selectedBrands,
          Size: selectedSizes,
        },
        pagination: {
          limit: 10,
          page: 1,
        },
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    setSneakers(response.data);
    navigation.navigate(HOME);
    setLoading(false);
  };

  return (
    <SafeArea go_back text={'Filter'}>
      <View style={styles.mainContainer}>
        <View style={{width: '35%', marginLeft: 8}}>
          <Pressable
            key={'Genders'}
            style={[
              styles.pressable,
              {
                borderColor: selectedFilter === 'Brands' ? THEME_PINK : 'white',
                borderWidth: 1,
              },
            ]}
            onPress={() => {
              setCheckboxOpts('Brands');
              setSelectedFilter('Brands');
              changeSelectedFilter('Brands');
            }}>
            <Text>Brands</Text>
          </Pressable>
          <Pressable
            key={'Gender'}
            style={[
              styles.pressable,
              {
                borderColor: selectedFilter === 'Gender' ? THEME_PINK : 'white',
                borderWidth: 1,
              },
            ]}
            onPress={() => {
              setCheckboxOpts('Gender');
              setSelectedFilter('Gender');
              changeSelectedFilter('Gender');
            }}>
            <Text>Gender</Text>
          </Pressable>
          <Pressable
            key={'Size'}
            style={[
              styles.pressable,
              {
                borderColor: selectedFilter === 'Size' ? THEME_PINK : 'white',
                borderWidth: 1,
              },
            ]}
            onPress={() => {
              setCheckboxOpts('Size');
              setSelectedFilter('Size');
              changeSelectedFilter('Size');
            }}>
            <Text>Size</Text>
          </Pressable>
          <Pressable
            key={'Reset'}
            style={[
              styles.reset,
              {
                borderColor: selectedFilter === 'Size' ? THEME_PINK : 'white',
                borderWidth: 1,
              },
            ]}
            onPress={() => {
              setSelectedBrands([]);
              setSelectedGenders([]);
              setSelectedSizes([]);
              setSelectedFilter('Gender');
              setCheckboxOpts(GENDER_ROLES);
              setAllFilters([]);
            }}>
            <Image source={RESET_ICON} />
          </Pressable>
        </View>
        <ScrollView style={styles.checkboxcontainer}>
          {checkboxopts.map((opt, index) => (
            <Checkbox.Item
              label={opt.label}
              key={index}
              mode={Platform.OS}
              onPress={() => {
                addSelectedFiltersToRelevantArrays(selectedFilter, opt.value);
              }}
              style={{
                marginTop: 4,
                borderRadius: 8,
                backgroundColor: allFilters.includes(opt.value)
                  ? 'grey'
                  : 'white',
              }}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{width: '100%', marginTop: 10, height: '10%'}}>
        <AuthenticationButton text={'SAVE'} onPress={() => ApplyFilter()} />
      </View>
    </SafeArea>
  );
};
