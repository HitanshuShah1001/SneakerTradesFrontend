import React from 'react';
import {Image, View, SafeAreaView} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from './styles';
import {ActionChip} from '../../components/ActionChip';
import {Header} from '../../components/Header';
import {OwnerDetails} from '../../components/OwnerDetails';

export const MySneakerRequestDetail = props => {
  const sneaker = props.route.params.sneaker;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header go_back={true} />
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Image
            source={{uri: sneaker?.Photo ?? ''}}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>
        <View style={{flex: 1}}>
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
      </View>
    </SafeAreaView>
  );
};
