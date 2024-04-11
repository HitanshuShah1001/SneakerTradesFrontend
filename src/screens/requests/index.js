import React, {useContext, useEffect} from 'react';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
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
    page,
    setPage,
    searchQuery,
    setSearchQuery,
  } = useContext(SneakerRequestContext);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setSneakerRequests([]);
    getSneakerRequests({paginated: false});
    setRefreshing(false);
  };

  const getSneakerRequests = ({paginated = false}) =>
    getSneakersOrSneakerRequests({
      setLoading,
      page,
      setValue: setSneakerRequests,
      value: sneakerrequests,
      searchQuery,
      selectedBrands,
      selectedGenders,
      selectedSizes,
      apicall: GET_SNEAKER_REQUESTS,
      paginated,
    });

  useEffect(() => {
    getSneakerRequests({paginated: false});
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
        setPage={setPage}
        refreshing={refreshing}
        handleRefresh={handleRefresh}
      />
    </SafeArea>
  );
};
