import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {apiService} from '../../services/apiService';
import {RetrieveTokenFromLocalStorage} from '../../utils/GetDeleteStoreTokenInLocalStorage';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {SNEAKER_DETAIL} from '../../constants/Screen';
import {SearchAndFilter} from '../../components/SearchAndFilter';
import {ItemRendererSneakers} from '../../components/ItemRenderer';
import {debounce} from '../../utils/debounce';
import {MY_UPLOADS} from '../../constants/Buttontitles';
import {ItemRendererSneakerRequests} from '../../components/ItemRendererRequests';
import {GET_SNEAKER_REQUESTS_CREATED} from '../../constants/Apicall';

export const MyRequests = () => {
  const navigation = useNavigation();
  const {setLoading} = useContext(Context);
  const [page, setPage] = useState(1);
  const [sneakers, setSneakers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [count, setCount] = useState(0);

  const getSneakers = async () => {
    setLoading(true);
    let token = await RetrieveTokenFromLocalStorage();
    const response = await apiService.get(GET_SNEAKER_REQUESTS_CREATED, {
      Authorization: `Bearer ${token}`,
    });
    const sneakerRequestData = response?.data || [];
    setSneakers(sneakerRequestData);
    setLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setSneakers([]);
    getSneakers();
    setRefreshing(false);
  };

  useEffect(() => {
    getSneakers();
  }, [page]);

  const handleSneakerPress = sneaker => {
    navigation.navigate(SNEAKER_DETAIL, {sneaker});
  };

  const Calltochangecount = debounce(() => setCount(!count), 5000);

  // const onChangeInput = text => {
  //   setSearchQuery(text);
  //   Calltochangecount();
  // };

  return (
    <SafeArea go_back text={MY_UPLOADS}>
      <ItemRendererSneakerRequests
        sneakers={sneakers}
        handleRefresh={handleRefresh}
        handleSneakerPress={handleSneakerPress}
        setPage={setPage}
        refreshing={refreshing}
      />
    </SafeArea>
  );
};
