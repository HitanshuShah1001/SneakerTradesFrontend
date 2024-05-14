import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Textinput} from '../../components/Textinput';
import {Scroller} from '../../components/Scroller';
import {UPLOAD} from '../../constants/Screen';
import {styles} from './styles';
import {
  BRANDS,
  GENDER_ROLES_FOR_UPLOAD,
  IMAGE_PLACEHOLDERS,
  REQUEST_IMAGE_PLACEHOLDER,
  REQUEST_TYPES,
  SIZES,
  TYPES,
} from '../../constants/Labels';
import {Uploadchips} from '../../components/Chips';
import DropdownComponent from '../../components/Dropdown';
import {apiService} from '../../services/apiService';
import {UPLOAD_CALL, UPLOAD_REQUEST_CALL} from '../../constants/Apicall';
import {
  SELECT_BRAND,
  SELECT_GENDER,
  SELECT_SIZE,
  SELECT_TYPE,
  SNEAKER_NAME,
  SNEAKER_PRICE,
} from '../../constants/Placeholders';
import {Context} from '../../navigation/BottomTab';
import {Imageselector} from './Imageselector';
import {UploadPlaceholder} from '../../components/UploadPlaceholder';
import {
  areAllFieldsValid,
  ResetFields,
  UploadSneakerButton,
} from './Uploadutils';
import {AlertMessage} from '../../utils/Alertmessage';
import {
  PLEASE_FILL_ALL_THE_FIELDS,
  SOME_ERROR_OCCURED,
  UPL_ATL_ONE_IMAGE,
  UPL_MIN_THREE_IMAGES,
} from '../../constants/Messages';
import {STATUS_FAIL} from '../../constants/ApiParams';
import {threeImagesAreNotPresent} from '../../utils/Threeimagesarenotinserted';

export const Upload = () => {
  const {setLoading} = useContext(Context) || {};
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
  }, [uploadedFor, setLoading]);

  const UploadSneaker = async () => {
    setLoading(true);
    if (!areAllFieldsValid({Name, Gender, Type, Size})) {
      setLoading(false);
      return AlertMessage(PLEASE_FILL_ALL_THE_FIELDS);
    }
    const uploadDetails = new FormData();
    uploadDetails.append('Name', Name);
    uploadDetails.append('Brand', Brand);
    uploadDetails.append('Gender', Gender);
    uploadDetails.append('Type', Type);
    uploadDetails.append('Size', Size);
    if (uploadedFor === UPLOAD) {
      if (threeImagesAreNotPresent(Photos)) {
        setLoading(false);
        return AlertMessage(UPL_MIN_THREE_IMAGES);
      }
      uploadDetails.append('OverdueCharge', 140);
      uploadDetails.append('Location', 1.22);
      uploadDetails.append('Location', 2.22);
      uploadDetails.append('Price', Price);
      Photos.forEach(photo => {
        if (photo.uri) {
          uploadDetails.append('Photos', {
            uri: photo.uri,
            type: photo.type,
            name: photo.fileName,
          });
        }
      });
    } else {
      if (!Photos[0].uri) {
        setLoading(false);
        return AlertMessage(UPL_ATL_ONE_IMAGE);
      }
      uploadDetails.append('Photo', {
        uri: Photos[0].uri,
        type: Photos[0].type,
        name: Photos[0].fileName,
      });
    }
    const Apicall = uploadedFor === UPLOAD ? UPLOAD_CALL : UPLOAD_REQUEST_CALL;
    const response = await apiService.postformdata(Apicall, uploadDetails);
    setLoading(false);
    if (response.status === STATUS_FAIL) {
      return AlertMessage(SOME_ERROR_OCCURED);
    } else {
      ResetFields({
        uploadedFor,
        setBrand,
        setGender,
        setName,
        setPrice,
        setSize,
        setType,
        setUploadedFor,
      });
      setPhotos(
        uploadedFor === UPLOAD
          ? [
              {image: '', uri: '', fileName: '', type: ''},
              {image: '', uri: '', fileName: '', type: ''},
              {image: '', uri: '', fileName: '', type: ''},
              {image: '', uri: '', fileName: '', type: ''},
              {image: '', uri: '', fileName: '', type: ''},
              {image: '', uri: '', fileName: '', type: ''},
            ]
          : [{image: '', uri: '', fileName: '', type: ''}],
      );
    }
  };

  const Imageselectorcontainer = useCallback(() => {
    return (
      <View style={styles.imageselectorcontainer}>
        {Photos.map((val, index) => {
          return (
            <Imageselector
              key={index}
              index={index}
              image={val.image}
              Photos={Photos}
              setPhotos={setPhotos}
              uploadedFor={uploadedFor}
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
      <UploadPlaceholder uploadedFor={uploadedFor} />
      <Textinput
        placeholder={SNEAKER_NAME}
        customstyles={{width: '90%'}}
        custVal={Name}
        setCustVal={setName}
        is_mandatory
      />
      {uploadedFor === UPLOAD && (
        <Textinput
          placeholder={SNEAKER_PRICE}
          customstyles={{width: '90%'}}
          custVal={Price}
          setCustVal={setPrice}
          is_mandatory
        />
      )}
      <DropdownComponent
        placeholder={SELECT_BRAND}
        value={Brand}
        setValue={setBrand}
        data={BRANDS}
        is_mandatory
        search
      />
      <DropdownComponent
        placeholder={SELECT_GENDER}
        value={Gender}
        setValue={setGender}
        data={GENDER_ROLES_FOR_UPLOAD}
        is_mandatory
      />

      <DropdownComponent
        placeholder={SELECT_SIZE}
        value={Size}
        setValue={setSize}
        data={SIZES}
        is_mandatory
      />
      <DropdownComponent
        placeholder={SELECT_TYPE}
        value={Type}
        setValue={setType}
        is_mandatory
        data={uploadedFor == UPLOAD ? TYPES : REQUEST_TYPES}
      />
      <UploadSneakerButton onPress={() => UploadSneaker()} />
    </Scroller>
  );
};
