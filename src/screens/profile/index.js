import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Alert} from 'react-native';
import {ProfileCard} from '../../components/Profilecard';
import {ACCOUNTITEMS, PROFILEITEMS} from '../../constants/ProfileActions';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  CONTACT_US,
  DELETE_ACCOUNT,
  LOGOUT,
  MY_PROFILE,
  MY_REQUESTS,
  MY_UPLOADS,
} from '../../constants/Buttontitles';
import {
  CONTACT_US_SCREEN,
  LOGIN_SCREEN,
  MY_REQUEST_SCREEN,
  MY_UPLOAD_SCREEN,
  PROFILE,
  PROFILE_DETAIL,
} from '../../constants/Screen';
import {RemoveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {
  RemoveUserFromLocalStorage,
  RetrieveUserFromLocalStorage,
} from '../../utils/GetDeleteStoreUserDetailsInLocalStorage';
import {styles} from './styles';
import {apiService} from '../../services/apiService';
import {DELETE_USER} from '../../constants/Apicall';
import {DELETED_SUCCESFULLY} from '../../constants/Backendresponses';
import {AlertMessage} from '../../utils/Alertmessage';
import {
  ACC_DEL,
  DELETE_QUESTION_ASK,
  LOGIN_TO_SEE_PROFILE,
} from '../../constants/Labels';
import {Cancel_option} from '../../components/AskForSource';
import {YES_LABEL} from '../../constants/Razorpay';
import {AskToLogin} from '../upload/AskToLogin';

export const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(undefined);
  const isFocused = useIsFocused();
  const getUserDetails = async () => {
    const userDetails = await RetrieveUserFromLocalStorage();
    setUser(userDetails);
  };

  useEffect(() => {
    getUserDetails();
  }, [isFocused]);

  const navigateTo = screen => navigation.navigate(screen);

  const confirmDelete = () =>
    Alert.alert(DELETE_QUESTION_ASK, '', [
      {
        text: YES_LABEL,
        onPress: () => deleteAccount(),
      },
      Cancel_option,
    ]);

  const deleteAccount = async () => {
    const res = await apiService.delete(DELETE_USER);
    if (res === DELETED_SUCCESFULLY) {
      AlertMessage(ACC_DEL);
      return await Promise.allSettled([
        RemoveTokenFromLocalStorage(),
        RemoveUserFromLocalStorage(),
      ]);
    }
  };

  const actionsBasedOnTitle = async ({title}) => {
    switch (title) {
      case LOGOUT:
        return Promise.allSettled([
          RemoveTokenFromLocalStorage(),
          RemoveUserFromLocalStorage(),
        ]).then(() => setUser(undefined));
      case MY_PROFILE:
        return navigateTo(PROFILE_DETAIL);
      case MY_UPLOADS:
        return navigateTo(MY_UPLOAD_SCREEN);
      case MY_REQUESTS:
        return navigateTo(MY_REQUEST_SCREEN);
      case CONTACT_US:
        return navigateTo(CONTACT_US_SCREEN);
      case DELETE_ACCOUNT:
        return confirmDelete();
      default:
        break;
    }
  };

  const ProfilePage = () => {
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

  return (
    <>
      {user ? (
        <ProfilePage />
      ) : (
        <AskToLogin
          text={LOGIN_TO_SEE_PROFILE}
          onPress={() =>
            navigation.navigate(LOGIN_SCREEN, {navigateTo: PROFILE})
          }
        />
      )}
    </>
  );
};
