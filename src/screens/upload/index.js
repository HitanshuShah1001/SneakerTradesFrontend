import React, {useEffect, useState} from 'react';
import {Pressable, Text, View, Image} from 'react-native';
import {CANCEL_ICON, PHOTO_UPLOAD} from '../../assets';
import {Textinput} from '../../components/Textinput';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {Scroller} from '../../components/Scroller';
import {UPLOAD} from '../../constants/Screen';
import {openImagePicker, removeImage} from '../../components/CameraPicker';
import {styles} from './styles';
import {
  BRANDS,
  GENDER_ROLES,
  IMAGE_PLACEHOLDERS,
  REQUEST_IMAGE_PLACEHOLDER,
  SIZES,
  TYPES,
} from '../../constants/Labels';
import {Uploadchips, Uploadedforchip} from '../../components/Chips';
import DropdownComponent from '../../components/Dropdown';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';

export const Upload = () => {
  const [uploadedFor, setUploadedFor] = useState(UPLOAD);
  const [Photos, setPhotos] = useState(
    uploadedFor == UPLOAD ? IMAGE_PLACEHOLDERS : REQUEST_IMAGE_PLACEHOLDER,
  );
  const [Brand, setBrand] = useState('');
  const [Gender, setGender] = useState('');
  const [Size, setSize] = useState('');
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');
  const [Type, setType] = useState('');

  useEffect(() => {
    if (uploadedFor == UPLOAD) {
      setPhotos(IMAGE_PLACEHOLDERS);
    } else {
      setPhotos(REQUEST_IMAGE_PLACEHOLDER);
    }
  }, [uploadedFor]);

  const UploadSneaker = async () => {
    let PhotosToSend = [];
    Photos.forEach(({image}) => {
      if (image) {
        PhotosToSend.push(image);
      }
    });
    const uploadDetails = new FormData();
    uploadDetails.append('Name', Name);
    uploadDetails.append('Brand', Brand);
    uploadDetails.append('Price', Price);
    uploadDetails.append('Gender', Gender);
    uploadDetails.append('Type', Type);
    Photos.forEach(photo => uploadDetails.append('Photo', photo));

    let token = await RetrieveTokenFromLocalStorage();

    const res = await apiService.post('sneaker/upload', uploadDetails, {
      Authorization: `Bearer ${token}`,
    });
  };

  const Imageselector = ({index, image}) => {
    return (
      <View style={{width: '30%', alignItems: 'center'}}>
        {image !== `` ? (
          <>
            <Pressable
              style={{alignSelf: 'flex-end', marginTop: 12}}
              onPress={() => removeImage({Photos, setPhotos, index})}>
              <Image source={CANCEL_ICON} style={{height: 10, width: 10}} />
            </Pressable>
            <Pressable
              style={styles.photoupload}
              onPress={() => openImagePicker({Photos, setPhotos, index})}>
              <Image source={{uri: image}} style={styles.selectedimage} />
            </Pressable>
          </>
        ) : (
          <Pressable
            style={styles.photoupload}
            onPress={() => openImagePicker({Photos, setPhotos, index})}>
            <Image source={PHOTO_UPLOAD} style={styles.placeholderimage} />
          </Pressable>
        )}
      </View>
    );
  };

  const Imageselectorcontainer = () => {
    return (
      <View style={styles.imageselectorcontainer}>
        {Photos.map(val => {
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
      <Textinput
        placeholder={'Sneaker Name'}
        customstyles={{width: '90%'}}
        custVal={Name}
        setCustVal={setName}
      />
      <Textinput
        placeholder={'Select Price'}
        customstyles={{width: '90%'}}
        custVal={Price}
        setCustVal={setPrice}
      />
      <DropdownComponent
        placeholder="Select Brand"
        value={Brand}
        setValue={setBrand}
        data={BRANDS}
      />
      <DropdownComponent
        placeholder="Select Gender"
        value={Gender}
        setValue={setGender}
        data={GENDER_ROLES}
      />
      <DropdownComponent
        placeholder="Select Size"
        value={Size}
        setValue={setSize}
        data={SIZES}
      />
      <DropdownComponent
        placeholder="Select Type"
        value={Type}
        setValue={setType}
        data={TYPES}
      />
      <View style={{width: '100%', marginTop: 10}}>
        <AuthenticationButton text={UPLOAD} onPress={() => UploadSneaker()} />
      </View>
    </Scroller>
  );
};
