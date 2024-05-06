import React, {useContext, useEffect} from 'react';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {SearchAndFilter} from '../../components/SearchAndFilter';
import {debounce} from '../../utils/debounce';
import {SneakerRequestContext} from '../sneakercontext/SneakerRequestContext';
import {ItemRendererSneakerRequests} from '../../components/ItemRendererRequests';
import {getSneakersOrSneakerRequests} from '../../services/getSneakersAndRequests';
import {GET_SNEAKER_REQUESTS} from '../../constants/Apicall';

export const Requests = () => {
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
    searchQuery,
    setSearchQuery,
  } = useContext(SneakerRequestContext);

  const handleRefresh = () => {
    setRefreshing(true);
    setSneakerRequests([]);
    getSneakerRequests();
    setRefreshing(false);
  };

  const getSneakerRequests = () =>
    getSneakersOrSneakerRequests({
      setLoading,
      setValue: setSneakerRequests,
      searchQuery,
      selectedBrands,
      selectedGenders,
      selectedSizes,
      apicall: GET_SNEAKER_REQUESTS,
    });

  useEffect(() => {
    getSneakerRequests();
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
        isFromRequestScreen
      />
      <ItemRendererSneakerRequests
        sneakers={sneakerrequests}
        refreshing={refreshing}
        handleRefresh={handleRefresh}
      />
    </SafeArea>
  );
};
