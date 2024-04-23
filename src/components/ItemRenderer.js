import {FlatList, RefreshControl, View} from 'react-native';
import Sneakercard from './Sneakercard';
import {EmptyView} from './EmptyView';
import {ViewWrapper} from './ViewWrapper';

export const ItemRendererSneakers = ({
  sneakers,
  handleSneakerPress,
  refreshing,
  handleRefresh,
}) => {
  return (
    <>
      {sneakers?.length > 0 ? (
        <ViewWrapper>
          <FlatList
            data={sneakers}
            renderItem={({item: sneaker}) => (
              <Sneakercard
                key={sneaker?.Name}
                name={sneaker?.Name}
                brand={sneaker?.Brand}
                price={sneaker?.Price}
                source={sneaker?.Photos[0]}
                type={sneaker?.Type}
                onPress={() => handleSneakerPress(sneaker)}
              />
            )}
            initialNumToRender={10}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        </ViewWrapper>
      ) : (
        <EmptyView />
      )}
    </>
  );
};
