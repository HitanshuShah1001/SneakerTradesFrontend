import React, {useContext, useEffect, useState} from 'react';
import {apiService} from '../../services/apiService';
import {SafeArea} from '../../components/SafeArea';
import {Context} from '../../navigation/BottomTab';
import {debounce} from '../../utils/debounce';
import {MY_REQUESTS} from '../../constants/Buttontitles';
import {ItemRendererSneakerRequests} from '../../components/ItemRendererRequests';
import {GET_SNEAKER_REQUESTS_CREATED} from '../../constants/Apicall';
import {Search} from '../../components/Search';
import {useIsFocused} from '@react-navigation/native';

export const MyRequests = () => {
  const {setLoading} = useContext(Context);
  const [sneakers, setSneakers] = useState([]);
  const [sneakersRequestsUsed, setSneakersRequestUsed] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [count, setCount] = useState(0);
  const isFocused = useIsFocused();

  const getSneakers = async () => {
    setLoading(true);

    const response = await apiService.get(GET_SNEAKER_REQUESTS_CREATED);
    const sneakerRequestData = response?.Data?.data || [];
    setSneakers(sneakerRequestData);
    setSneakersRequestUsed(sneakerRequestData);
    setLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setSneakers([]);
    getSneakers();
    setRefreshing(false);
  };

  useEffect(() => {
    getSneakers();
  }, [isFocused]);

  const filterSneakerRequest = () => {
    let filteredSneakerRequests = sneakers.filter(
      sneaker =>
        sneaker.Brand.includes(searchQuery) ||
        sneaker.Name.includes(searchQuery),
    );
    setSneakersRequestUsed(filteredSneakerRequests);
  };
  useEffect(() => {
    filterSneakerRequest();
  }, [count]);

  const Calltochangecount = debounce(() => setCount(!count), 500);

  const onChangeInput = text => {
    setSearchQuery(text);
    Calltochangecount();
  };

  return (
    <SafeArea go_back text={MY_REQUESTS}>
      <Search
        searchQuery={searchQuery}
        onChangeText={text => onChangeInput(text)}
      />
      <ItemRendererSneakerRequests
        sneakers={sneakersRequestsUsed}
        handleRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </SafeArea>
  );
};
