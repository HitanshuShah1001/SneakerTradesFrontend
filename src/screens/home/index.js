import React, {useContext, useEffect, useState} from 'react';
import {dummySneakerData} from '../../dummydata/Sneakers';
import Sneakercard from '../../components/Sneakercard';
import {Scroller} from '../../components/Scroller';
import {useNavigation} from '@react-navigation/native';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {apiService} from '../../services/apiService';
import {UserContext} from '../../navigation/BottomTab';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';

export const Home = () => {
  const navigation = useNavigation();
  const {user} = useContext(UserContext);
  const [token, setToken] = useState('');

  const getSneakers = async () => {
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get('sneaker/forpurchaseandborrow', {
      Authorization: `Bearer ${token}`,
    });
    setSneakers(response.data);
  };

  useEffect(() => {
    getSneakers();
  }, [token]);

  const [sneakers, setSneakers] = useState([]);
  return (
    <Scroller>
      {sneakers.map((sneaker, index) => (
        <Sneakercard
          key={index}
          name={sneaker.Name}
          brand={sneaker.Brand}
          price={100}
          source={sneaker.Photos[0]}
          type={sneaker.Type}
          onPress={() => navigation.navigate(SNEAKER_DETAIL, {sneaker})}
        />
      ))}
    </Scroller>
  );
};
