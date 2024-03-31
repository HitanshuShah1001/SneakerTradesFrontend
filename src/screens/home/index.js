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
import {dummySneakerData} from '../../dummydata/Sneakers';

export const Home = () => {
  const navigation = useNavigation();
  const {setLoading} = useContext(Context);
  const [page, setPage] = useState(1);
  const [sneakers, setSneakers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [count, setCount] = useState(0);

  const getSneakers = async () => {
    setLoading(true);
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get(
      `sneaker/forpurchaseandborrow?page=${page}&limit=10`,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    const newData = response?.data || [];
    setSneakers(prevData => [...prevData, ...newData]);
    setLoading(false);
  };

  const getSneakersViaSearch = async () => {
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get(
      `sneaker/search?q=${searchQuery}&page=${page}&limit=10`,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    const newData = response?.data || [];
    setSneakers(newData);
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
  }, [page]);

  useEffect(() => {
    getSneakersViaSearch();
  }, [count]);

  const handleSneakerPress = sneaker => {
    navigation.navigate(SNEAKER_DETAIL, {sneaker});
  };

  const Calltochangecount = debounce(() => setCount(!count), 5000);

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
        sneakers={dummySneakerData}
        handleRefresh={handleRefresh}
        handleSneakerPress={handleSneakerPress}
        setPage={setPage}
        refreshing={refreshing}
      />
    </SafeArea>
  );
};
