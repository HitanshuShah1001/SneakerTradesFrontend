import React, {useCallback, useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from './styles';
import {ActionChip} from '../../components/ActionChip';
import {OwnerDetails} from '../../components/OwnerDetails';
import {Scroller} from '../../components/Scroller';
import {LazyImageLoader} from '../../components/LazyImageLoader';

export const SneakerDetail = props => {
  const sneaker = props.route.params.sneaker;
  const [selectedSneakerImage, setSelectedSneakerImage] = useState(
    sneaker.Photos[0],
  );

  const handleImagePress = photo => {
    setSelectedSneakerImage(photo);
  };
  const DetailsContainer = useCallback(() => {
    return (
      <View style={styles.detailsContainer}>
        <Sneakerdetailstext
          Name={sneaker.Name}
          Brand={sneaker.Brand}
          Gender={sneaker.Gender}
          Size={sneaker.Size}
        />
        <ActionChip text={sneaker?.Type} />
        <OwnerDetails
          Name={sneaker.OwnerDetails.Name}
          Phone={sneaker.OwnerDetails.Phone}
          Email={sneaker.OwnerDetails.Email}
        />
      </View>
    );
  }, []);
  return (
    <Scroller go_back>
      <LazyImageLoader uri={selectedSneakerImage} styles={styles.mainImage} />
      <View style={styles.imagecontainer}>
        {sneaker.Photos.map((photo, index) => (
          <Pressable
            key={index}
            onPress={() => handleImagePress(photo)}
            style={{marginRight: 8}}>
            <LazyImageLoader uri={photo} styles={styles.thumbnailImage} />
          </Pressable>
        ))}
      </View>
      <DetailsContainer />
    </Scroller>
  );
};
