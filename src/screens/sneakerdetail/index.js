import React, {useContext, useState} from 'react';
import {Image, Pressable, View, SafeAreaView} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from './styles';
import {ActionChip} from '../../components/ActionChip';
import {Header} from '../../components/Header';
import {OwnerDetails} from '../../components/OwnerDetails';
import {Context} from '../../navigation/BottomTab';
import {LoadingIndicator} from '../../components/SafeArea';

export const SneakerDetail = props => {
  const sneaker = props.route.params.sneaker;
  const [selectedSneakerImage, setSelectedSneakerImage] = useState(
    sneaker.Photos[0],
  );
  const {loading} = useContext(Context);

  const handleImagePress = photo => {
    setSelectedSneakerImage(photo);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading && <LoadingIndicator />}
      <Header go_back={true} />
      <View style={styles.container}>
        <Image source={{uri: selectedSneakerImage}} style={styles.mainImage} />
        <View style={styles.thumbnailContainer}>
          {sneaker.Photos.map((photo, index) => (
            <Pressable
              key={index}
              onPress={() => handleImagePress(photo)}
              style={{marginLeft: 8}}>
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
        <ActionChip text={sneaker?.Type} />
        <OwnerDetails
          Name={sneaker.OwnerDetails.Name}
          Phone={sneaker.OwnerDetails.Phone}
          Email={sneaker.OwnerDetails.Email}
        />
      </View>
    </SafeAreaView>
  );
};
