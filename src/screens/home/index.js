import React, {useContext, useEffect, useState} from 'react';
import Sneakercard from '../../components/Sneakercard';
import {useNavigation} from '@react-navigation/native';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {FlatList} from 'react-native';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {dummySneakerData} from '../../dummydata/Sneakers';

export const Home = () => {
  const navigation = useNavigation();
  const {loading, setLoading} = useContext(Context);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sneakers, setSneakers] = useState(dummySneakerData);

  const getSneakers = async () => {
    setLoading(true); // Set loading state to true before fetching data

    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get(
      `sneaker/forpurchaseandborrow?page=${page}&limit=${limit}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    const newData = response.data;
    setSneakers(prevData => [...prevData, ...dummySneakerData]); // Append new data to existing list
    setLoading(false); // Set loading state back to false after fetching data
  };

  useEffect(() => {
    getSneakers();
  }, [page]); // Trigger useEffect when page state changes

  const handleSneakerPress = sneaker => {
    navigation.navigate(SNEAKER_DETAIL, {sneaker});
  };

  return (
    <SafeArea>
      <FlatList
        data={sneakers}
        renderItem={({item: sneaker}) => (
          <Sneakercard
            key={sneaker?.Name}
            name={sneaker?.Name}
            brand={sneaker?.Brand}
            price={100}
            source={sneaker?.Photos[0]}
            type={sneaker?.Type}
            onPress={() => handleSneakerPress(sneaker)}
          />
        )}
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
