import {FlatList, RefreshControl, View} from 'react-native';
import Sneakercard from './Sneakercard';
import {EmptyView} from './EmptyView';
import {ViewWrapper} from './ViewWrapper';
import {returnStyleForEmptyData} from '../utils/StyleForEmptyData';
import {NO_UPLOADS_FOUND} from '../constants/Labels';

export const MyUploadsItemRenderer = ({
  sneakers,
  handleSneakerPress,
  refreshing,
  handleRefresh,
}) => {
  return (
    <>
      <ViewWrapper>
        <FlatList
          data={sneakers}
          contentContainerStyle={returnStyleForEmptyData(sneakers)}
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
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={() => <EmptyView text={NO_UPLOADS_FOUND} />}
        />
      </ViewWrapper>
    </>
  );
};
