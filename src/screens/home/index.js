import React, {useContext, useEffect} from 'react';
import {dummySneakerData} from '../../dummydata/Sneakers';
import Sneakercard from '../../components/Sneakercard';
import {Scroller} from '../../components/Scroller';
import {useNavigation} from '@react-navigation/native';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {apiService} from '../../services/apiService';
import {UserContext} from '../../navigation/BottomTab';

export const Home = () => {
  const navigation = useNavigation();
  const {user} = useContext(UserContext);

  // const getSneakers = async () => {
  //   const response = await apiService.
  // }
  useEffect(() => {}, []);
  return (
    <Scroller>
      {dummySneakerData.map((sneaker, index) => (
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
