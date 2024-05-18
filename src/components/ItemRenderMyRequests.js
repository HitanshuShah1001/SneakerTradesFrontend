import {FlatList, RefreshControl} from 'react-native';
import Sneakercard from './Sneakercard';
import {EmptyView} from './EmptyView';
import {useNavigation} from '@react-navigation/native';
import {SNEAKER_REQUEST_DETAIL} from '../constants/Screen';
import {returnStyleForEmptyData} from '../utils/StyleForEmptyData';
import {NO_REQUESTS_FOUND} from '../constants/Labels';

export const ItemRendererMyRequests = ({
  sneakers,
  refreshing,
  handleRefresh,
  navigateto = SNEAKER_REQUEST_DETAIL,
  fetchMoreSneakers,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <FlatList
        data={sneakers}
        contentContainerStyle={returnStyleForEmptyData(sneakers)}
        renderItem={({item: sneaker}) => (
          <Sneakercard
            key={sneaker?.Name}
            name={sneaker?.Name}
            brand={sneaker?.Brand}
            source={sneaker?.Photo}
            type={sneaker?.Type}
            onPress={() => navigation.navigate(navigateto, {sneaker})}
          />
        )}
        initialNumToRender={10}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={() => <EmptyView text={NO_REQUESTS_FOUND} />}
      />
    </>
  );
};
