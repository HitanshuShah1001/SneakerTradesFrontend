import React, {useCallback, useContext, useEffect, useState} from 'react';
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
  REQUEST_TYPES,
  SIZES,
  TYPES,
} from '../../constants/Labels';
import {Uploadchips} from '../../components/Chips';
import DropdownComponent from '../../components/Dropdown';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {UPLOAD_CALL, UPLOAD_REQUEST_CALL} from '../../constants/Apicall';
import {
  MIN_ONE_IMAGE,
  MIN_THREE_IMAGES,
  SELECT_BRAND,
  SELECT_GENDER,
  SELECT_SIZE,
  SELECT_TYPE,
  SNEAKER_NAME,
  SNEAKER_PRICE,
} from '../../constants/Placeholders';
import {Context} from '../../navigation/BottomTab';

export const Upload = () => {
  const {setLoading} = useContext(Context);
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
    setLoading(true);
    const uploadDetails = new FormData();

    uploadDetails.append('Name', Name);
    uploadDetails.append('Brand', Brand);
    uploadDetails.append('Gender', Gender);
    uploadDetails.append('Type', Type);
    uploadDetails.append('Size', Size);
    if (uploadedFor === UPLOAD) {
      uploadDetails.append('OverdueCharge', 140);
      uploadDetails.append('Location', 1.22);
      uploadDetails.append('Location', 2.22);
      uploadDetails.append('Price', Price);
      Photos.forEach(photo => {
        if (photo.uri !== '') {
          uploadDetails.append('Photos', {
            uri: photo.uri,
            type: photo.type,
            name: photo.fileName,
          });
        }
      });
    } else {
      uploadDetails.append('Photo', {
        uri: Photos[0].uri,
        type: Photos[0].type,
        name: Photos[0].fileName,
      });
    }

    let token = await RetrieveTokenFromLocalStorage();
    const Apicall = uploadedFor === UPLOAD ? UPLOAD_CALL : UPLOAD_REQUEST_CALL;
    const res = await apiService.postformdata(Apicall, uploadDetails, {
      Authorization: `Bearer ${token}`,
    });

    setLoading(false);
  };

  const Imageselector = ({index, image}) => {
    return (
      <View style={{width: '30%', alignItems: 'center'}}>
        {image !== `` ? (
          <>
            <Pressable
              style={{alignSelf: 'flex-end'}}
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

  const Imageselectorcontainer = useCallback(() => {
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
  }, [Photos]);

  return (
    <Scroller>
      <Uploadchips uploadedFor={uploadedFor} setUploadedFor={setUploadedFor} />
      <Imageselectorcontainer />
      <Text style={styles.imageplaceholder}>
        {uploadedFor === UPLOAD ? MIN_THREE_IMAGES : MIN_ONE_IMAGE}
      </Text>
      <Textinput
        placeholder={SNEAKER_NAME}
        customstyles={{width: '90%'}}
        custVal={Name}
        setCustVal={setName}
      />
      <Textinput
        placeholder={SNEAKER_PRICE}
        customstyles={{width: '90%'}}
        custVal={Price}
        setCustVal={setPrice}
      />
      <DropdownComponent
        placeholder={SELECT_BRAND}
        value={Brand}
        setValue={setBrand}
        data={BRANDS}
      />
      <DropdownComponent
        placeholder={SELECT_GENDER}
        value={Gender}
        setValue={setGender}
        data={GENDER_ROLES}
      />
      <DropdownComponent
        placeholder={SELECT_SIZE}
        value={Size}
        setValue={setSize}
        data={SIZES}
      />
      <DropdownComponent
        placeholder={SELECT_TYPE}
        value={Type}
        setValue={setType}
        data={uploadedFor == UPLOAD ? TYPES : REQUEST_TYPES}
      />
      <View style={{width: '100%', marginTop: 10}}>
        <AuthenticationButton text={UPLOAD} onPress={() => UploadSneaker()} />
      </View>
    </Scroller>
  );
};
