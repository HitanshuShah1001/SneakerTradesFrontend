import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {apiService} from '../../services/apiService';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {SNEAKER_UPLOADED_DETAIL} from '../../constants/Screen';
import {debounce} from '../../utils/debounce';
import {MY_UPLOADS} from '../../constants/Buttontitles';
import {GET_SNEAKERS_OWNED} from '../../constants/Apicall';
import {MyUploadsItemRenderer} from '../../components/MyUploadsItemRenderer';
import {Search} from '../../components/Search';
import {DEBOUNCE_MS} from '../../constants/InputOptions';

export const MyUploads = () => {
  const navigation = useNavigation();
  const {setLoading} = useContext(Context);
  const [sneakers, setSneakers] = useState([]);
  const [sneakerUploadedUsed, setSneakerUploadedUsed] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [count, setCount] = useState(0);

  const getUploadedSneakers = async () => {
    setLoading(true);
    const response = await apiService.get(GET_SNEAKERS_OWNED);
    const sneakers = response?.Data?.data || [];
    setSneakers(sneakers);
    setSneakerUploadedUsed(sneakers);
    setLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setSneakers([]);
    setSneakerUploadedUsed([]);
    getUploadedSneakers();
    setRefreshing(false);
  };

  useEffect(() => {
    getUploadedSneakers();
  }, []);

  const handleSneakerPress = sneaker => {
    navigation.navigate(SNEAKER_UPLOADED_DETAIL, {sneaker});
  };

  const Calltochangecount = debounce(() => setCount(!count), DEBOUNCE_MS);

  const onChangeInput = text => {
    setSearchQuery(text);
    Calltochangecount();
  };

  const filterSneakerRequest = () => {
    let filteredSneakerRequests = sneakers.filter(
      sneaker =>
        sneaker.Brand.includes(searchQuery) ||
        sneaker.Name.includes(searchQuery),
    );
    setSneakerUploadedUsed(filteredSneakerRequests);
  };
  useEffect(() => {
    filterSneakerRequest();
  }, [count]);

  return (
    <SafeArea go_back text={MY_UPLOADS}>
      <Search
        searchQuery={searchQuery}
        onChangeText={text => onChangeInput(text)}
      />
      <MyUploadsItemRenderer
        sneakers={sneakerUploadedUsed}
        handleRefresh={handleRefresh}
        handleSneakerPress={handleSneakerPress}
        refreshing={refreshing}
      />
    </SafeArea>
  );
};
