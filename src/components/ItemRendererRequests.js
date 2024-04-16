import {FlatList, RefreshControl} from 'react-native';
import Sneakercard from './Sneakercard';
import {EmptyView} from './EmptyView';
import {useNavigation} from '@react-navigation/native';

export const ItemRendererSneakerRequests = ({
  sneakers,
  refreshing,
  handleRefresh,
}) => {
  const navigation = useNavigation();
  return (
    <>
      {sneakers.length > 0 ? (
        <FlatList
          data={sneakers}
          renderItem={({item: sneaker}) => (
            <Sneakercard
              key={sneaker?.Name}
              name={sneaker?.Name}
              brand={sneaker?.Brand}
              price={100}
              source={sneaker?.Photo}
              type={sneaker?.Type}
              onPress={() =>
                navigation.navigate('SneakerRequestDetail', {sneaker})
              }
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      ) : (
        <EmptyView text="No Requests Found" />
      )}
    </>
  );
};
