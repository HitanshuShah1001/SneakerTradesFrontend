import React, {useContext} from 'react';
import {Image, View, SafeAreaView} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from './styles';
import {ActionChip} from '../../components/ActionChip';
import {Header} from '../../components/Header';
import {OwnerDetails} from '../../components/OwnerDetails';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {useNavigation} from '@react-navigation/native';
import {DELETE_SNEAKER_REQUEST_CALL} from '../../constants/Apicall';
import {apiService} from '../../services/apiService';
import {Context} from '../../navigation/BottomTab';

export const MySneakerRequestDetail = props => {
  const sneaker = props.route.params.sneaker;
  const {setLoading} = useContext(Context);
  const navigation = useNavigation();
  const deleteSneaker = async () => {
    setLoading(true);
    const response = await apiService.delete(
      DELETE_SNEAKER_REQUEST_CALL(sneaker?._id),
    );
    setLoading(false);
    navigation.goBack();
  };

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
          <AuthenticationButton
            text={'DELETE'}
            onPress={() => deleteSneaker()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
