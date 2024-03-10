import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {ProfileCard} from '../../components/Profilecard';
import {ACCOUNTITEMS, PROFILEITEMS} from '../../constants/ProfileActions';
import {useNavigation} from '@react-navigation/native';
import {MY_PROFILE} from '../../constants/Buttontitles';
import {PROFILE_DETAIL} from '../../constants/Screen';

export const Profile = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {PROFILEITEMS.map((title, index) => {
          if (title === MY_PROFILE) {
            return (
              <ProfileCard
                title={title}
                key={index}
                onPress={() => navigation.navigate(PROFILE_DETAIL)}
              />
            );
          }
          return <ProfileCard title={title} key={index} />;
        })}
      </View>
      <View style={styles.accountContainer}>
        {ACCOUNTITEMS.map((title, index) => (
          <ProfileCard title={title} key={index} />
        ))}
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
