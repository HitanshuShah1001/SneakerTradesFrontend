import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {ProfileCard} from '../../components/Profilecard';
import {ACCOUNTITEMS, PROFILEITEMS} from '../../constants/ProfileActions';
import {useNavigation} from '@react-navigation/native';
import {
  COINS_BALANCE_RECHARGE,
  LOGOUT,
  MY_PROFILE,
} from '../../constants/Buttontitles';
import {
  COINS_BALANCE_AND_RECHARGE,
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
