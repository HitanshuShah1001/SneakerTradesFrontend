import React, {useState} from 'react';
import {ScrollView, Image, Pressable, Text, View} from 'react-native';
import {dummySneakerData} from '../../dummydata/Sneakers';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from './styles';
import {ActionChip} from '../../components/ActionChip';
import {UnlockOwnerDetails} from '../../components/UnlockOwnerDetails';

export const SneakerDetail = props => {
  const sneaker = props.route.params.sneaker;
  const [selectedSneakerImage, setSelectedSneakerImage] = useState(
    sneaker.Photos[0],
  );

  const handleImagePress = photo => {
    setSelectedSneakerImage(photo);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: selectedSneakerImage}} style={styles.mainImage} />
      <View style={styles.thumbnailContainer}>
        {sneaker.Photos.map((photo, index) => (
          <Pressable key={index} onPress={() => handleImagePress(photo)}>
            <Image source={{uri: photo}} style={styles.thumbnailImage} />
          </Pressable>
        ))}
      </View>
      <Sneakerdetailstext
        Name={sneaker.Name}
        Brand={sneaker.Brand}
        Gender={sneaker.Gender}
        Size={sneaker.Size}
      />
      <ActionChip text={'Rent'} />
      <View style={{flex: 0.7, justifyContent: 'center'}}>
        <UnlockOwnerDetails />
      </View>
    </ScrollView>
  );
};
