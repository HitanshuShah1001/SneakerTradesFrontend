import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {SearchAndFilter} from '../../components/SearchAndFilter';
import {ItemRendererSneakers} from '../../components/ItemRenderer';
import {debounce} from '../../utils/debounce';
import {SneakerContext} from '../sneakercontext/SneakerContext';
import {GET_SNEAKER_FOR_PURCHASE_AND_BORROW_CALL} from '../../constants/Apicall';
import {DEBOUNCE_MS} from '../../constants/InputOptions';
import {apiService} from '../../services/apiService';
import {STATUS_SUCCESS} from '../../constants/ApiParams';

export const Home = () => {
  const navigation = useNavigation();
  const {setLoading, loading} = useContext(Context) || {};
  const [page, setPage] = useState(1);
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

  useEffect(() => {
    getSneakersInitial();
  }, [count]);

  const getSneakersInitial = async () => {
    setLoading(true);
    setPage(1);
    const response = await apiService.post(
      GET_SNEAKER_FOR_PURCHASE_AND_BORROW_CALL({page: 1}),
      {
        searchQuery,
        filters: {
          Gender: selectedGenders,
          Brand: selectedBrands,
          Size: selectedSizes,
        },
      },
    );
    if (response.status === STATUS_SUCCESS) {
      setSneakers(response.Data.data);
    }
    setLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setSneakers([]);
    setPage(1);
    getSneakersInitial();
    setRefreshing(false);
  };

  const fetchMoreSneakers = async () => {
    if (loading) return;
    setLoading(true);
    const nextPage = page + 1;
    const response = await apiService.post(
      GET_SNEAKER_FOR_PURCHASE_AND_BORROW_CALL({page: nextPage}),
      {
        searchQuery,
        filters: {
          Gender: selectedGenders,
          Brand: selectedBrands,
          Size: selectedSizes,
        },
        page: nextPage,
      },
    );
    if (response.status === STATUS_SUCCESS) {
      setSneakers([...sneakers, ...response.Data.data]);
      setPage(nextPage);
    }
    setLoading(false);
  };

  const handleSneakerPress = sneaker => {
    navigation.navigate(SNEAKER_DETAIL, {sneaker});
  };

  const Calltochangecount = debounce(() => setCount(!count), DEBOUNCE_MS);

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
        setPage={setPage}
        fetchMoreSneakers={fetchMoreSneakers}
      />
    </SafeArea>
  );
};
