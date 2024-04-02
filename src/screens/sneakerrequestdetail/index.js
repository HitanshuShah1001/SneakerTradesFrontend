import React, {useState} from 'react';
import {Image, View, SafeAreaView} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from './styles';
import {ActionChip} from '../../components/ActionChip';
import {UnlockOwnerDetails} from '../../components/UnlockOwnerDetails';
import {Header} from '../../components/Header';
import {OwnerDetails} from '../../components/OwnerDetails';

export const SneakerRequestDetail = props => {
  const sneaker = props.route.params.sneaker;
  const [ownerDetails, setOwnerDetails] = useState(undefined);

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
        <OwnerDetails
          Name={sneaker.RequestorDetails.Name}
          Phone={sneaker.RequestorDetails.Phone}
          Email={sneaker.RequestorDetails.Email}
        />
      </View>
    </SafeAreaView>
  );
};
