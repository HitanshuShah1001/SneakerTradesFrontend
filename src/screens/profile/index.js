import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {ProfileCard} from '../../components/Profilecard';
import {ACCOUNTITEMS, PROFILEITEMS} from '../../constants/ProfileActions';
import {useNavigation} from '@react-navigation/native';
import {
  COINS_BALANCE_RECHARGE,
  LOGOUT,
  MY_PROFILE,
  MY_REQUESTS,
  MY_UPLOADS,
} from '../../constants/Buttontitles';
import {
  COINS_BALANCE_AND_RECHARGE,
  MY_REQUEST_SCREEN,
  MY_UPLOAD_SCREEN,
  PROFILE_DETAIL,
} from '../../constants/Screen';
import {RemoveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {
  RemoveUserFromLocalStorage,
  RetrieveUserFromLocalStorage,
} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';

export const Profile = () => {
  const navigation = useNavigation();
  const getDetails = async () => {
    const user = await RetrieveUserFromLocalStorage();
    return user;
  };

  const navigateTo = screen => navigation.navigate(screen);
  // getDetails();
  const actionsBasedOnTitle = async ({title}) => {
    switch (title) {
      case LOGOUT:
        return await Promise.allSettled([
          RemoveTokenFromLocalStorage(),
          RemoveUserFromLocalStorage(),
        ]);
      case COINS_BALANCE_RECHARGE:
        return getDetails().then(user =>
          navigation.navigate(COINS_BALANCE_AND_RECHARGE, {
            balance: user?.TotalCoinsLeft,
          }),
        );
      case MY_PROFILE:
        return navigateTo(PROFILE_DETAIL);
      case MY_UPLOADS:
        return navigateTo(MY_UPLOAD_SCREEN);
      case MY_REQUESTS:
        return navigateTo(MY_REQUEST_SCREEN);
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {PROFILEITEMS.map((title, index) => {
          return (
            <ProfileCard
              title={title}
              key={index}
              onPress={() => actionsBasedOnTitle({title})}
            />
          );
        })}
      </View>
      <View style={styles.accountContainer}>
        {ACCOUNTITEMS.map((title, index) => {
          return (
            <ProfileCard
              title={title}
              key={index}
              onPress={() => actionsBasedOnTitle({title})}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  accountContainer: {
    marginBottom: 10,
  },
});
