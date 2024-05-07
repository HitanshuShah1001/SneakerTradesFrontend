import React, {useCallback, useContext, useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from '../sneakerdetail/styles';
import {ActionChip} from '../../components/ActionChip';
import {OwnerDetails} from '../../components/OwnerDetails';
import {Context} from '../../navigation/BottomTab';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {apiService} from '../../services/apiService';
import {DELETE_SNEAKER_CALL} from '../../constants/Apicall';
import {useNavigation} from '@react-navigation/native';
import {MY_UPLOAD_SCREEN, PROFILE} from '../../constants/Screen';
import {Scroller} from '../../components/Scroller';
import {DELETED_SUCCESFULLY} from '../../constants/Backendresponses';
import {AlertMessage} from '../../utils/Alertmessage';

export const MyUploadSneakerDetail = props => {
  const sneaker = props.route.params.sneaker;
  const navigation = useNavigation();
  const {setLoading} = useContext(Context);
  const [selectedSneakerImage, setSelectedSneakerImage] = useState(
    sneaker.Photos[0],
  );

  const handleImagePress = photo => {
    setSelectedSneakerImage(photo);
  };

  const deleteSneaker = async () => {
    setLoading(true);
    const response = await apiService.delete(DELETE_SNEAKER_CALL(sneaker?._id));
    console.log(response);
    if (response === DELETED_SUCCESFULLY) {
      AlertMessage(DELETED_SUCCESFULLY);
      navigation.navigate(PROFILE);
    }
    setLoading(false);
  };

  const ImageContainer = useCallback(
    () => (
      <View style={styles.imagecontainer}>
        {sneaker.Photos.map((photo, index) => (
          <Pressable
            key={index}
            onPress={() => handleImagePress(photo)}
            style={{marginRight: 8}}>
            <Image source={{uri: photo}} style={styles.thumbnailImage} />
          </Pressable>
        ))}
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
    <Scroller go_back>
      <Image
        source={{uri: selectedSneakerImage}}
        style={styles.mainImage}
        resizeMode="contain"
      />
      <ImageContainer />
      <DetailsContainer />
      <AuthenticationButton
        text={'DELETE'}
        onPress={() => deleteSneaker()}
        customstyles={{width: '90%', flex: 1, marginBottom: 10}}
      />
    </Scroller>
  );
};
