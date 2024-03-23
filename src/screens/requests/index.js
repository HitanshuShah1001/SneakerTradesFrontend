import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {FlatList, RefreshControl} from 'react-native';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import Sneakercard from '../../components/Sneakercard';
import {dummySneakerData} from '../../dummydata/Sneakers';

export const Requests = () => {
  const navigation = useNavigation();
  const [sneakers, setSneakers] = useState(dummySneakerData);
  const [page, setPage] = useState(1);
  const {loading, setLoading} = useContext(Context);
  const [refreshing, setRefreshing] = useState(false);

  const getSneakersForRental = async () => {
    setLoading(true);
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get(
      `sneakerrequests/requests?page=${page}&limit=10`,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    setLoading(false);
    setSneakers(prevData => [...prevData, ...dummySneakerData]);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1); // Reset page to 1 to fetch fresh data
    getSneakersForRental(); // Fetch fresh data
    setRefreshing(false);
  };

  useEffect(() => {
    getSneakersForRental();
  }, [page]);

  return (
    <SafeArea text={'Requests'}>
      <FlatList
        data={sneakers}
        renderItem={({item: sneaker}) => (
          <Sneakercard
            key={sneaker?.Name}
            name={sneaker?.Name}
            brand={sneaker?.Brand}
            price={100}
            source={sneaker?.Photo}
            type={sneaker?.Type}
            onPress={() =>
              navigation.navigate('SneakerRequestDetail', {sneaker})
            }
          />
        )}
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          if (!loading) {
            setPage(prevPage => prevPage + 1);
          }
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeArea>
  );
};
