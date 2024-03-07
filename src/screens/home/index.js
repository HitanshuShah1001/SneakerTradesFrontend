import React from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {dummySneakerData} from '../../dummydata/Sneakers';
import Sneakercard from '../../components/Sneakercard';
import {Scroller} from '../../components/Scroller';
import {SneakerDetail} from '../sneakerdetail';
import {Login} from '../login';
import {OTPverify} from '../otpverify';
import DropdownComponent from '../../components/Dropdown';

export const Home = () => {
  return (
    <Scroller>
      {dummySneakerData.map((sneaker, index) => (
        <Sneakercard
          key={index}
          name={sneaker.Name}
          brand={sneaker.Brand}
          price={100}
          source={sneaker.Photos[0]}
        />
      ))}
    </Scroller>
  );
};
