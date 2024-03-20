import React, {useContext, useState} from 'react';
import {Image, Pressable, View, SafeAreaView, Alert} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from './styles';
import {ActionChip} from '../../components/ActionChip';
import {UnlockOwnerDetails} from '../../components/UnlockOwnerDetails';
import {Header} from '../../components/Header';
import {
  RemoveUserFromLocalStorage,
  RetrieveUserFromLocalStorage,
} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {apiService} from '../../services/apiService';
import {
  RemoveTokenFromLocalStorage,
  RetrieveTokenFromLocalStorage,
} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {UserContext} from '../../navigation/BottomTab';
import {OwnerDetails} from '../../components/OwnerDetails';

export const SneakerDetail = props => {
  const sneaker = props.route.params.sneaker;
  const [selectedSneakerImage, setSelectedSneakerImage] = useState(
    sneaker.Photos[0],
  );
  const [ownerDetails, setOwnerDetails] = useState(undefined);

  const handleImagePress = photo => {
    setSelectedSneakerImage(photo);
  };
  const unlockOwnerDetails = async () => {
    const [user, token] = await Promise.allSettled([
      RetrieveUserFromLocalStorage(),
      RetrieveTokenFromLocalStorage(),
    ]);

    if (user.value.TotalCoinsLeft < 10) {
      Alert.alert('You have insufficient balance');
    } else {
      const res = await apiService.patchWithoutBody(
        token.value,
        `sneaker/unlock/${sneaker?.Owner}`,
      );
      setOwnerDetails(res.user);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header go_back={true} />
      <View style={styles.container}>
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
        <ActionChip text={sneaker?.Type} />
        {!ownerDetails ? (
          <UnlockOwnerDetails onPress={() => unlockOwnerDetails()} />
        ) : (
          <OwnerDetails
            Name={ownerDetails.Name}
            Phone={ownerDetails.Phone}
            Email={ownerDetails.Email}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
