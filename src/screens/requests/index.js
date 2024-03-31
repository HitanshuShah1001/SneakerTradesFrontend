import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {SearchAndFilter} from '../../components/SearchAndFilter';
import {ItemRendererSneakerRequests} from '../../components/ItemRendererRequests';
import {debounce} from '../../utils/debounce';

export const Requests = () => {
  const navigation = useNavigation();
  const [sneakers, setSneakers] = useState([]);
  const [page, setPage] = useState(1);
  const {setLoading} = useContext(Context);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [count, setCount] = useState(0);

  const getSneakerRequests = async () => {
    setLoading(true);
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get(
      `sneakerrequests/requests?page=${page}&limit=10`,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    const sneakers = response.data || [];
    setLoading(false);
    setSneakers(prevData => [...prevData, ...sneakers]);
  };

  const getSneakerRequestsViaSearch = async () => {
    setLoading(true);
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get(
      `sneakerrequests/search?q=${searchQuery}&page=${page}&limit=10`,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    const sneakers = response.data || [];
    setLoading(false);
    setSneakers(sneakers);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    getSneakerRequests();
    setRefreshing(false);
  };

  useEffect(() => {
    getSneakerRequests();
  }, [page]);

  useEffect(() => {
    getSneakerRequestsViaSearch();
  }, [count]);

  const Calltochangecount = debounce(() => setCount(!count), 500);

  const onChangeInput = text => {
    setSearchQuery(text);
    Calltochangecount();
  };

  return (
    <SafeArea text={'Requests'}>
      <SearchAndFilter
        searchQuery={searchQuery}
        onChangeText={text => onChangeInput(text)}
      />
      <ItemRendererSneakerRequests
        sneakers={sneakers}
        setPage={setPage}
        refreshing={refreshing}
        handleRefresh={handleRefresh}
      />
    </SafeArea>
  );
};
