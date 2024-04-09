import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {SearchAndFilter} from '../../components/SearchAndFilter';
import {ItemRendererSneakers} from '../../components/ItemRenderer';
import {debounce} from '../../utils/debounce';
import {SneakerContext} from '../sneakercontext/SneakerContext';

export const Home = () => {
  const navigation = useNavigation();
  const {setLoading} = useContext(Context);
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
    page,
    setPage,
    searchQuery,
    setSearchQuery,
  } = useContext(SneakerContext);

  const getSneakers = async () => {
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
    setLoading(false);
  };

  const getSneakersOnEndReached = async () => {
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
          page: page,
        },
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    setSneakers(sneakers => [...sneakers, ...(response?.data || [])]);
    setLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setSneakers([]);
    getSneakers();
    setRefreshing(false);
  };

  useEffect(() => {
    getSneakers();
  }, [count]);

  const handleSneakerPress = sneaker => {
    navigation.navigate(SNEAKER_DETAIL, {sneaker});
  };

  const Calltochangecount = debounce(() => setCount(!count), 500);

  const onChangeInput = text => {
    setSearchQuery(text);
    Calltochangecount();
  };

  useEffect(() => {
    if (page != 1) {
      getSneakersOnEndReached();
    }
  }, [page]);

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
        setPage={setPage}
        refreshing={refreshing}
      />
    </SafeArea>
  );
};
