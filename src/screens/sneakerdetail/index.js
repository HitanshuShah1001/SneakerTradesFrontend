import React, {useCallback, useContext, useState} from 'react';
import {Image, Pressable, View, SafeAreaView} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from './styles';
import {ActionChip} from '../../components/ActionChip';
import {Header} from '../../components/Header';
import {OwnerDetails} from '../../components/OwnerDetails';
import {Context} from '../../navigation/BottomTab';
import {LoadingIndicator} from '../../components/SafeArea';
import {SafeAreaWrapper} from '../../components/SafeAreaWrapper';

export const SneakerDetail = props => {
  const sneaker = props.route.params.sneaker;
  const [selectedSneakerImage, setSelectedSneakerImage] = useState(
    sneaker.Photos[0],
  );
  const {loading} = useContext(Context);

  const handleImagePress = photo => {
    setSelectedSneakerImage(photo);
  };

  const ImageContainer = useCallback(
    () => (
      <View style={styles.imagecontainer}>
        <Image
          source={{uri: selectedSneakerImage}}
          style={styles.mainImage}
          resizeMode="contain"
        />
        <View style={styles.thumbnailContainer}>
          {sneaker.Photos.map((photo, index) => (
            <Pressable
              key={index}
              onPress={() => handleImagePress(photo)}
              style={{marginRight: 8}}>
              <Image source={{uri: photo}} style={styles.thumbnailImage} />
            </Pressable>
          ))}
        </View>
      </View>
    ),
    [selectedSneakerImage],
  );

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
    <SafeAreaWrapper>
      {loading && <LoadingIndicator />}
      <Header go_back={true} />
      <View style={styles.container}>
        <ImageContainer />
        <DetailsContainer />
      </View>
    </SafeAreaWrapper>
  );
};
