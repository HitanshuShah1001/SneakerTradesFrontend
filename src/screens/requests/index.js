import React, {useEffect, useState} from 'react';
import {dummySneakerData} from '../../dummydata/Sneakers';
import {Scroller} from '../../components/Scroller';
import Sneakercard from '../../components/Sneakercard';
import {useNavigation} from '@react-navigation/native';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {FlatList} from 'react-native';
import {SafeArea} from '../../components/SafeArea';
export const Requests = () => {
  const navigation = useNavigation();
  const [sneakers, setSneakers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getSneakersForRental = async () => {
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get(
      `sneakerrequests/requests?page=${page}&limit=${limit}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    setSneakers(response.data);
  };

  useEffect(() => {
    getSneakersForRental();
  }, []);

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
      />
    </SafeArea>
  );
};
