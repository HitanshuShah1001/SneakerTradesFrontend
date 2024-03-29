import {FlatList, RefreshControl} from 'react-native';
import Sneakercard from './Sneakercard';
import {EmptyView} from './EmptyView';
import {useContext} from 'react';
import {Context} from '../navigation/BottomTab';

export const ItemRendererSneakers = ({
  sneakers,
  handleSneakerPress,
  setPage,
  refreshing,
  handleRefresh,
}) => {
  const {loading} = useContext(Context);
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
              source={sneaker?.Photos[0]}
              type={sneaker?.Type}
              onPress={() => handleSneakerPress(sneaker)}
            />
          )}
          onEndReachedThreshold={0.01}
          onEndReached={() => {
            if (!loading) {
              setPage(prevPage => prevPage + 1); // Increment page only if not already loading
            }
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      ) : (
        <EmptyView />
      )}
    </>
  );
};
