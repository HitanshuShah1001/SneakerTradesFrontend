import React, {useContext, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {SearchAndFilter} from '../../components/SearchAndFilter';
import {ItemRendererSneakers} from '../../components/ItemRenderer';
import {debounce} from '../../utils/debounce';
import {SneakerContext} from '../sneakercontext/SneakerContext';
import {getSneakersOrSneakerRequests} from '../../services/getSneakersAndRequests';
import {GET_SNEAKER_FOR_PURCHASE_AND_BORROW} from '../../constants/Apicall';

export const Home = () => {
  const navigation = useNavigation();
  const {setLoading} = useContext(Context);
  const isFocused = useIsFocused();
  const {
    sneakers,
    setSneakers,
    selectedBrands,
    selectedGenders,
    selectedSizes,
    refreshing,
    setRefreshing,
    count,
    setCount,
    searchQuery,
    setSearchQuery,
  } = useContext(SneakerContext);

  const getSneakers = () =>
    getSneakersOrSneakerRequests({
      setLoading,
      setValue: setSneakers,
      searchQuery,
      selectedBrands,
      selectedGenders,
      selectedSizes,
      apicall: GET_SNEAKER_FOR_PURCHASE_AND_BORROW,
    });

  const handleRefresh = () => {
    setRefreshing(true);
    setSneakers([]);
    getSneakers();
    setRefreshing(false);
  };

  useEffect(() => {
    getSneakers();
  }, [count, isFocused]);

  const handleSneakerPress = sneaker => {
    navigation.navigate(SNEAKER_DETAIL, {sneaker});
  };

  const Calltochangecount = debounce(() => setCount(!count), 500);

  const onChangeInput = text => {
    setSearchQuery(text);
    Calltochangecount();
  };

  return (
    <SafeArea>
      <SearchAndFilter
        searchQuery={searchQuery}
        onChangeText={text => onChangeInput(text)}
      />
      <ItemRendererSneakers
        sneakers={sneakers}
        handleRefresh={handleRefresh}
        handleSneakerPress={handleSneakerPress}
        refreshing={refreshing}
      />
    </SafeArea>
  );
};
