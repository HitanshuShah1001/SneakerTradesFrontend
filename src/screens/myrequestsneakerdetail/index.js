import React, {useContext} from 'react';
import {Image, View} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from '../sneakerrequestdetail/styles';
import {ActionChip} from '../../components/ActionChip';
import {Header} from '../../components/Header';
import {OwnerDetails} from '../../components/OwnerDetails';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {useNavigation} from '@react-navigation/native';
import {DELETE_SNEAKER_REQUEST_CALL} from '../../constants/Apicall';
import {apiService} from '../../services/apiService';
import {Context} from '../../navigation/BottomTab';
import {ViewWrapper} from '../../components/ViewWrapper';
import {SafeAreaWrapper} from '../../components/SafeAreaWrapper';
import {PROFILE} from '../../constants/Screen';
import {AlertMessage} from '../../utils/Alertmessage';
import {DELETED_SUCCESFULLY} from '../../constants/Backendresponses';

export const MySneakerRequestDetail = props => {
  const sneaker = props.route.params.sneaker;
  const {setLoading} = useContext(Context);
  const navigation = useNavigation();
  const deleteSneaker = async () => {
    setLoading(true);
    const response = await apiService.delete(
      DELETE_SNEAKER_REQUEST_CALL(sneaker?._id),
    );
    if (response === DELETED_SUCCESFULLY) {
      AlertMessage(DELETED_SUCCESFULLY);
      navigation.navigate(PROFILE);
    }
    setLoading(false);
  };

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
          <AuthenticationButton
            text={'DELETE'}
            onPress={() => deleteSneaker()}
          />
        </ViewWrapper>
      </View>
    </SafeAreaWrapper>
  );
};
