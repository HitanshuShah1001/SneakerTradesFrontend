import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {PHOTO_UPLOAD} from '../../assets';
import {Textinput} from '../../components/Textinput';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {
  FONT_WEIGHT_BOLD,
  PLACEHOLDER_COLOR,
  THEME_PINK,
} from '../../constants/colorsandfonts';

export const Upload = () => {
  const [uploadedFor, setUploadedFor] = useState('Upload');

  const Typechip = ({text}) => (
    <Pressable style={styles.chip} onPress={() => setUploadedFor(text)}>
      <Text style={{fontWeight: uploadedFor === text ? FONT_WEIGHT_BOLD : 400}}>
        {text}
      </Text>
    </Pressable>
  );

  const Uploadchips = () => (
    <View style={styles.container}>
      <Typechip text={'Upload'} />
      <Typechip text={'Request'} />
    </View>
  );

  const Uploadedforchip = ({text}) => (
    <View style={{flexDirection: 'row'}}>
      <Pressable style={styles.uploadedFor} />
      <Text style={{marginLeft: 4}}>{text}</Text>
    </View>
  );

  const Imageselector = () => (
    <Pressable style={styles.photoupload}>
      <Image source={PHOTO_UPLOAD} />
    </Pressable>
  );

  const getTotalItems = () =>
    uploadedFor == 'Upload' ? [1, 2, 3, 4, 5, 6] : [1];

  const Imageselectorcontainer = () => (
    <View style={styles.imageselectorcontainer}>
      {getTotalItems().map(index => (
        <Imageselector key={index} />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Uploadchips />
        <Imageselectorcontainer />
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 12,
            color: PLACEHOLDER_COLOR,
          }}>
          Upload Min 3 Images
        </Text>
        <Textinput placeholder={'Sneaker Name'} customstyles={{width: '90%'}} />
        <Textinput placeholder={'Price'} customstyles={{width: '90%'}} />
        <Textinput placeholder={'Brand'} customstyles={{width: '90%'}} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 15,
            width: '100%',
          }}>
          <Uploadedforchip text={'Rent'} />
          <Uploadedforchip text={'Sell'} />
          <Uploadedforchip text={'Both'} />
        </View>
        <AuthenticationButton text={'UPLOAD'} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    minHeight: 60, // Set a minimum height to ensure it's scrollable
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  chip: {
    width: 160,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  photoupload: {
    height: 120,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 8,
  },
  imageselectorcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  uploadedFor: {
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME_PINK,
    height: 20,
  },
};
