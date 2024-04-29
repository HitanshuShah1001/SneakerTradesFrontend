import {View} from 'react-native';
import {styles} from './styles';
import {Imageselector} from './Imageselector';
import {useCallback} from 'react';

export const Imageselectorcontainer = useCallback(
  ({Photos, setPhotos, removeImage}) => {
    return (
      <View style={styles.imageselectorcontainer}>
        {Photos.map((val, index) => {
          return (
            <Imageselector
              key={index}
              index={val.index}
              image={val.image}
              Photos={Photos}
              setPhotos={setPhotos}
              removeImage={removeImage}
            />
          );
        })}
      </View>
    );
  },
  [Photos],
);
