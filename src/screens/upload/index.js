import React, {useState} from 'react';
import {Pressable, Text, View, Image} from 'react-native';
import {CANCEL_ICON, PHOTO_UPLOAD} from '../../assets';
import {Textinput} from '../../components/Textinput';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Scroller} from '../../components/Scroller';
import {BOTH, RENT, SELL} from '../../constants/Buttontitles';
import {UPLOAD} from '../../constants/Screen';
import {openImagePicker, removeImage} from '../../components/CameraPicker';
import {styles} from './styles';
import {
  IMAGE_PLACEHOLDERS,
  REQUEST_IMAGE_PLACEHOLDER,
} from '../../constants/Labels';
import {Uploadchips, Uploadedforchip} from '../../components/Chips';

export const Upload = () => {
  const [uploadedFor, setUploadedFor] = useState(UPLOAD);
  const [images, setImages] = useState(
    uploadedFor == UPLOAD ? IMAGE_PLACEHOLDERS : REQUEST_IMAGE_PLACEHOLDER,
  );

  const Imageselector = ({index, image}) => {
    return (
      <View style={{width: '30%', alignItems: 'center'}}>
        {image !== `` ? (
          <>
            <Pressable
              style={{alignSelf: 'flex-end', marginTop: 12}}
              onPress={() => removeImage({images, setImages, index})}>
              <Image source={CANCEL_ICON} style={{height: 10, width: 10}} />
            </Pressable>
            <Pressable
              style={styles.photoupload}
              onPress={() => openImagePicker({images, setImages, index})}>
              <Image source={{uri: image}} style={styles.selectedimage} />
            </Pressable>
          </>
        ) : (
          <Pressable
            style={styles.photoupload}
            onPress={() => openImagePicker({images, setImages, index})}>
            <Image source={PHOTO_UPLOAD} style={styles.placeholderimage} />
          </Pressable>
        )}
      </View>
    );
  };

  const Imageselectorcontainer = () => {
    return (
      <View style={styles.imageselectorcontainer}>
        {images.map(val => {
          return (
            <Imageselector
              key={val.index}
              index={val.index}
              image={val.image}
            />
          );
        })}
      </View>
    );
  };

  return (
    <Scroller>
      <Uploadchips uploadedFor={uploadedFor} setUploadedFor={setUploadedFor} />
      <Imageselectorcontainer />
      <Text style={styles.imageplaceholder}>
        {uploadedFor === UPLOAD ? `Upload Min 3 Images` : ``}
      </Text>
      <Textinput placeholder={'Sneaker Name'} customstyles={{width: '90%'}} />
      <Textinput placeholder={'Price'} customstyles={{width: '90%'}} />
      <Textinput placeholder={'Brand'} customstyles={{width: '90%'}} />
      <View style={styles.radiocontainer}>
        <Uploadedforchip text={RENT} />
        <Uploadedforchip text={SELL} />
        <Uploadedforchip text={BOTH} />
      </View>
      <View style={{width: '100%'}}>
        <AuthenticationButton text={UPLOAD} />
      </View>
    </Scroller>
  );
};
