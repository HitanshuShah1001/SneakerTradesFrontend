import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Sneakerdetailstext} from '../../components/SneakerNameAndBrand';
import {styles} from './styles';
import {ActionChip} from '../../components/ActionChip';
import {Header} from '../../components/Header';
import {OwnerDetails} from '../../components/OwnerDetails';
import {ViewWrapper} from '../../components/ViewWrapper';
import {SafeAreaWrapper} from '../../components/SafeAreaWrapper';
import {LazyImageLoader} from '../../components/LazyImageLoader';
import {RetrieveUserFromLocalStorage} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {useIsFocused} from '@react-navigation/native';
import {LoginToSeeDetails} from '../../components/LoginToSeeDetails';
import {SNEAKER_REQUEST_DETAIL} from '../../constants/Screen';
import {LOGIN_TO_SEE_REQUESTOR_DETAILS} from '../../constants/Labels';

export const SneakerRequestDetail = props => {
  const {sneaker} = props.route.params || {};
  const [user, setUser] = useState(undefined);
  const isFocused = useIsFocused();
  const getUserDetails = async () => {
    const userDetails = await RetrieveUserFromLocalStorage();
    setUser(userDetails);
  };

  useEffect(() => {
    getUserDetails();
  }, [isFocused]);

  const DetailsContainer = useCallback(() => {
    return (
      <ViewWrapper customstyles={{flex: 1.2}}>
        <Sneakerdetailstext
          Name={sneaker?.Name}
          Brand={sneaker?.Brand}
          Gender={sneaker?.Gender}
          Size={sneaker?.Size}
        />
        <ActionChip text={sneaker?.Type} />
        {user ? (
          <OwnerDetails
            Name={sneaker?.RequestorDetails?.Name}
            Phone={sneaker?.RequestorDetails?.Phone}
            Email={sneaker?.RequestorDetails?.Email}
          />
        ) : (
          <LoginToSeeDetails
            sneaker={sneaker}
            navigateTo={SNEAKER_REQUEST_DETAIL}
            text={LOGIN_TO_SEE_REQUESTOR_DETAILS}
          />
        )}
      </ViewWrapper>
    );
  }, [user]);
  return (
    <SafeAreaWrapper>
      <Header go_back={true} />
      <View style={styles.container}>
        <ViewWrapper customstyles={{justifyContent: 'center', flex: 0.8}}>
          <LazyImageLoader
            uri={sneaker?.Photo ?? ''}
            styles={styles.mainImage}
          />
        </ViewWrapper>
        <DetailsContainer />
      </View>
    </SafeAreaWrapper>
  );
};
