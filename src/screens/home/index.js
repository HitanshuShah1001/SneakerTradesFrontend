import React from 'react';
import {dummySneakerData} from '../../dummydata/Sneakers';
import Sneakercard from '../../components/Sneakercard';
import {Scroller} from '../../components/Scroller';

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
