import React, {useEffect, useState} from 'react';
import {dummySneakerData} from '../../dummydata/Sneakers';
import {Scroller} from '../../components/Scroller';
import Sneakercard from '../../components/Sneakercard';
import {useNavigation} from '@react-navigation/native';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
export const Requests = () => {
  const navigation = useNavigation();
  const [sneakers, setSneakers] = useState([]);

  const getSneakersForRental = async () => {
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get('sneakerrequests/requests', {
      Authorization: `Bearer ${token}`,
    });
    console.log(response.data, 'response.data');
    setSneakers(response.data);
  };

  useEffect(() => {
    getSneakersForRental();
  }, []);

  console.log(sneakers);

  return (
    <Scroller>
      {sneakers.map((sneaker, index) => (
        <Sneakercard
          key={index}
          name={sneaker.Name}
          brand={sneaker.Brand}
          price={100}
          source={sneaker?.Photo}
          type={sneaker.Type}
          onPress={() => navigation.navigate('SneakerRequestDetail', {sneaker})}
        />
      ))}
    </Scroller>
  );
};
