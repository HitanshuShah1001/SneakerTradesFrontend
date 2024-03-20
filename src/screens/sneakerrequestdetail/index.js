import React, {useState} from 'react';
import {Image, Pressable, View, SafeAreaView} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from './styles';
import {ActionChip} from '../../components/ActionChip';
import {UnlockOwnerDetails} from '../../components/UnlockOwnerDetails';
import {Header} from '../../components/Header';
import {RetrieveUserFromLocalStorage} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {OwnerDetails} from '../../components/OwnerDetails';
import {apiService} from '../../services/apiService';

export const SneakerRequestDetail = props => {
  const sneaker = props.route.params.sneaker;
  const [ownerDetails, setOwnerDetails] = useState(undefined);

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
        `sneakerrequests/unlockrequestdetail/${sneaker.RequestedBy}`,
      );

      setOwnerDetails(res.user);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header go_back={true} />
      <View style={styles.container}>
        <Image source={{uri: sneaker?.Photo ?? ''}} style={styles.mainImage} />
        <Sneakerdetailstext
          Name={sneaker.Name}
          Brand={sneaker.Brand}
          Gender={sneaker.Gender}
          Size={sneaker.Size}
        />
        <ActionChip text={sneaker?.Type} />
        {!ownerDetails ? (
          <UnlockOwnerDetails
            onPress={() => unlockOwnerDetails()}
            text="Unlock Requestor Details"
          />
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
