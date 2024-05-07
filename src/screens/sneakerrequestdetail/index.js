import React from 'react';
import {Image, View, SafeAreaView} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from './styles';
import {ActionChip} from '../../components/ActionChip';
import {Header} from '../../components/Header';
import {OwnerDetails} from '../../components/OwnerDetails';
import {ViewWrapper} from '../../components/ViewWrapper';
import {SafeAreaWrapper} from '../../components/SafeAreaWrapper';

export const SneakerRequestDetail = props => {
  const sneaker = props.route.params.sneaker;

  return (
    <SafeAreaWrapper>
      <Header go_back={true} />
      <View style={styles.container}>
        <ViewWrapper customstyles={{justifyContent: 'center', flex: 0.8}}>
          <Image
            source={{uri: sneaker?.Photo ?? ''}}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </ViewWrapper>
        <ViewWrapper customstyles={{flex: 1.2}}>
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
        </ViewWrapper>
      </View>
    </SafeAreaWrapper>
  );
};
