import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import Sneakercard from '../../components/Sneakercard';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {SearchAndFilter} from '../../components/SearchAndFilter';
import {EmptyView} from '../../components/EmptyView';
import {ItemRendererSneakers} from '../../components/ItemRenderer';

export const Home = () => {
  const navigation = useNavigation();
  const {setLoading} = useContext(Context);
  const [page, setPage] = useState(1);
  const [sneakers, setSneakers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getSneakers = async () => {
    setLoading(true); // Set loading state to true before fetching data
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get(
      `sneaker/forpurchaseandborrow?page=${page}&limit=10`,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    const newData = response.data;
    setSneakers(prevData => [...prevData, ...newData]); // Append new data to existing list
    setLoading(false); // Set loading state back to false after fetching data
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
  }, [page]); // Trigger useEffect when page state changes

  const handleSneakerPress = sneaker => {
    navigation.navigate(SNEAKER_DETAIL, {sneaker});
  };

  return (
    <SafeArea>
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
