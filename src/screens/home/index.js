import React, {useContext, useEffect, useState} from 'react';
import {dummySneakerData} from '../../dummydata/Sneakers';
import Sneakercard from '../../components/Sneakercard';
import {Scroller} from '../../components/Scroller';
import {useNavigation} from '@react-navigation/native';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {apiService} from '../../services/apiService';
import {UserContext} from '../../navigation/BottomTab';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {FlatList} from 'react-native';
import {SafeArea} from '../../components/SafeArea';

export const Home = () => {
  const navigation = useNavigation();
  const {user} = useContext(UserContext);
  const [token, setToken] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getSneakers = async () => {
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get(
      `sneaker/forpurchaseandborrow?page=${page}&limit=${limit}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    setSneakers(response.data);
  };

  useEffect(() => {
    getSneakers();
  }, [token]);

  const [sneakers, setSneakers] = useState([]);

  const renderItem = ({sneaker}) => {
    console.log(sneaker, 'sneaker in flat list');
    return (
      <Sneakercard
        key={sneaker?.Name}
        name={sneaker?.Name}
        brand={sneaker?.Brand}
        price={100}
        source={sneaker?.Photos[0]}
        type={sneaker?.Type}
        onPress={() => navigation.navigate(SNEAKER_DETAIL, {sneaker})}
      />
    );
  };
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
              source={sneaker?.Photos[0]}
              type={sneaker?.Type}
              onPress={() => navigation.navigate(SNEAKER_DETAIL, {sneaker})}
            />
          );
        }}
      />
    </SafeArea>
  );
};
