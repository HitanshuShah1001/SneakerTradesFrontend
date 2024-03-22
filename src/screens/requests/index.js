import React, {useContext, useEffect, useState} from 'react';
import Sneakercard from '../../components/Sneakercard';
import {useNavigation} from '@react-navigation/native';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {FlatList} from 'react-native';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';

export const Requests = () => {
  const navigation = useNavigation();
  const [sneakers, setSneakers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const {loading, setLoading} = useContext(Context);

  const getSneakersForRental = async () => {
    setLoading(true);
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get(
      `sneakerrequests/requests?page=${page}&limit=${limit}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    setLoading(false);
    setSneakers(response.data);
  };

  useEffect(() => {
    getSneakersForRental();
  }, [page]);

  return (
    <SafeArea>
      <FlatList
        data={sneakers}
        renderItem={({item: sneaker}) => {
          return (
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
          );
        }}
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          if (!loading) {
            setPage(prevPage => prevPage + 1); // Increment page only if not already loading
          }
        }}
      />
    </SafeArea>
  );
};
