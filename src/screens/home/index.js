import React from 'react';
import {dummySneakerData} from '../../dummydata/Sneakers';
import Sneakercard from '../../components/Sneakercard';
import {Scroller} from '../../components/Scroller';
import {useNavigation} from '@react-navigation/native';

export const Home = () => {
  const navigation = useNavigation();
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
          onPress={() => navigation.navigate('SneakerDetail', {sneaker})}
        />
      ))}
    </Scroller>
  );
};
