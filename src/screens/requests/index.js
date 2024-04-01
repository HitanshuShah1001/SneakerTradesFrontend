import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {SearchAndFilter} from '../../components/SearchAndFilter';
import {ItemRendererSneakers} from '../../components/ItemRenderer';
import {debounce} from '../../utils/debounce';
import {SneakerRequestContext} from '../sneakercontext/SneakerRequestContext';
import {ItemRendererSneakerRequests} from '../../components/ItemRendererRequests';

export const Requests = () => {
  const navigation = useNavigation();
  const {setLoading} = useContext(Context);
  const {
    sneakerrequests,
    setSneakerRequests,
    selectedBrands,
    selectedGenders,
    selectedSizes,
    refreshing,
    setRefreshing,
    count,
    setCount,
    setPage,
    searchQuery,
    setSearchQuery,
  } = useContext(SneakerRequestContext);

  const getSneakers = async () => {
    setLoading(true);
    let token = await RetrieveTokenFromLocalStorage();

    const response = await apiService.post(
      `sneakerrequests/requests`,
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
    console.log(response, 'response');
    setSneakerRequests(response.data);
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

      <ItemRendererSneakerRequests
        sneakers={sneakerrequests}
        setPage={setPage}
        refreshing={refreshing}
        handleRefresh={handleRefresh}
      />
    </SafeArea>
  );
};
