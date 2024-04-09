import {FlatList, RefreshControl, View} from 'react-native';
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
        <View style={{flex: 1}}>
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
            onScrollEndDrag={() => {
              if (!loading) {
                setPage(page => page + 1);
              }
            }}
            onMomentumScrollEnd={() => {
              if (!loading) {
                setPage(page => page + 1);
              }
            }}
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
