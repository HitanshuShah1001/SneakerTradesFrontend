import {FlatList, RefreshControl, View} from 'react-native';
import Sneakercard from './Sneakercard';
import {EmptyView} from './EmptyView';

export const ItemRendererSneakers = ({
  sneakers,
  handleSneakerPress,
  refreshing,
  handleRefresh,
}) => {
  return (
    <>
      {sneakers?.length > 0 ? (
        <View style={{flex: 1}}>
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
        </View>
      ) : (
        <EmptyView />
      )}
    </>
  );
};
