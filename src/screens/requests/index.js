import React from 'react';
import {dummySneakerData} from '../../dummydata/Sneakers';
import {Scroller} from '../../components/Scroller';
import Sneakercard from '../../components/Sneakercard';

export const Requests = () => {
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
        />
      ))}
    </Scroller>
  );
};
