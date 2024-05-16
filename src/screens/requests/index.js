import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {SearchAndFilter} from '../../components/SearchAndFilter';
import {debounce} from '../../utils/debounce';
import {GET_SNEAKERREQUESTS_CALL} from '../../constants/Apicall';
import {DEBOUNCE_MS} from '../../constants/InputOptions';
import {apiService} from '../../services/apiService';
import {STATUS_SUCCESS} from '../../constants/ApiParams';
import {ItemRendererSneakerRequests} from '../../components/ItemRendererRequests';
import {SneakerRequestContext} from '../sneakercontext/SneakerRequestContext';

export const Requests = () => {
  const navigation = useNavigation();
  const {setLoading, loading} = useContext(Context) || {};
  const [page, setPage] = useState(1);
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
    searchQuery,
    setSearchQuery,
  } = useContext(SneakerRequestContext);

  useEffect(() => {
    getSneakersInitial();
  }, [count]);

  const getSneakersInitial = async () => {
    setLoading(true);
    setPage(1);
    const response = await apiService.post(
      GET_SNEAKERREQUESTS_CALL({page: 1}),
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
      setSneakerRequests(response.Data.data);
    }
    setLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setSneakerRequests([]);
    setPage(1);
    getSneakersInitial();
    setRefreshing(false);
  };

  const fetchMoreSneakers = async () => {
    if (loading) return;
    const nextPage = page + 1;
    const response = await apiService.post(
      GET_SNEAKERREQUESTS_CALL({page: nextPage}),
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
      setSneakerRequests([...sneakerrequests, ...response.Data.data]);
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
        setPage={setPage}
        isFromRequestScreen
      />
      <ItemRendererSneakerRequests
        sneakers={sneakerrequests}
        handleRefresh={handleRefresh}
        handleSneakerPress={handleSneakerPress}
        refreshing={refreshing}
        setPage={setPage}
        fetchMoreSneakers={fetchMoreSneakers}
      />
    </SafeArea>
  );
};
