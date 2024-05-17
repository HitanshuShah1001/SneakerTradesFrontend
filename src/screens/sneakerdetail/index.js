import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from './styles';
import {ActionChip} from '../../components/ActionChip';
import {OwnerDetails} from '../../components/OwnerDetails';
import {Scroller} from '../../components/Scroller';
import {LazyImageLoader} from '../../components/LazyImageLoader';
import {useIsFocused} from '@react-navigation/native';
import {RetrieveUserFromLocalStorage} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {LoginToSeeDetails} from '../../components/LoginToSeeDetails';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {LOGIN_TO_SEE_UPLOADER_DETAILS} from '../../constants/Labels';

export const SneakerDetail = props => {
  const {sneaker} = props?.route?.params || {};
  const isFocused = useIsFocused();
  const [user, setUser] = useState(undefined);
  const [selectedSneakerImage, setSelectedSneakerImage] = useState(
    sneaker?.Photos[0],
  );

  const getUserDetails = async () => {
    const userDetails = await RetrieveUserFromLocalStorage();
    setUser(userDetails);
  };
  useEffect(() => {
    getUserDetails();
  }, [isFocused]);

  const handleImagePress = photo => {
    setSelectedSneakerImage(photo);
  };
  const DetailsContainer = useCallback(() => {
    return (
      <View style={styles.detailsContainer}>
        <Sneakerdetailstext
          Name={sneaker?.Name}
          Brand={sneaker?.Brand}
          Gender={sneaker?.Gender}
          Size={sneaker?.Size}
          Price={sneaker?.Price}
        />
        <ActionChip text={sneaker?.Type} />
        {user ? (
          <OwnerDetails
            Name={sneaker?.OwnerDetails?.Name}
            Phone={sneaker?.OwnerDetails?.Phone}
            Email={sneaker?.OwnerDetails?.Email}
          />
        ) : (
          <LoginToSeeDetails
            sneaker={sneaker}
            navigateTo={SNEAKER_DETAIL}
            text={LOGIN_TO_SEE_UPLOADER_DETAILS}
          />
        )}
      </View>
    );
  }, [user]);
  return (
    <Scroller go_back>
      <LazyImageLoader uri={selectedSneakerImage} styles={styles.mainImage} />
      <View style={styles.imagecontainer}>
        {sneaker?.Photos?.map((photo, index) => (
          <Pressable
            key={index}
            onPress={() => handleImagePress(photo)}
            style={{marginRight: 8, marginTop: 8}}>
            <LazyImageLoader uri={photo} styles={styles.thumbnailImage} />
          </Pressable>
        ))}
      </View>
      <DetailsContainer />
    </Scroller>
  );
};
