import {FlatList, RefreshControl} from 'react-native';
import Sneakercard from './Sneakercard';
import {EmptyView} from './EmptyView';
import {useNavigation} from '@react-navigation/native';
import {SNEAKER_REQUEST_DETAIL} from '../constants/Screen';
import {returnStyleForEmptyData} from '../utils/StyleForEmptyData';

export const ItemRendererSneakerRequests = ({
  sneakers,
  refreshing,
  handleRefresh,
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
            price={100}
            source={sneaker?.Photo}
            type={sneaker?.Type}
            onPress={() =>
              navigation.navigate(SNEAKER_REQUEST_DETAIL, {sneaker})
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={() => <EmptyView text="No Requests Found" />}
      />
    </>
  );
};
