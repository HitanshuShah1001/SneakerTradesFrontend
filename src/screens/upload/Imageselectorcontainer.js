import {View} from 'react-native';
import {styles} from './styles';
import {Imageselector} from './Imageselector';
import {useCallback} from 'react';

export const Imageselectorcontainer = useCallback(
  ({Photos, setPhotos, removeImage, askForSourceInUpload}) => {
    return (
      <View style={styles.imageselectorcontainer}>
        {Photos.map(val => {
          return (
            <Imageselector
              key={val.index}
              index={val.index}
              image={val.image}
              Photos={Photos}
              setPhotos={setPhotos}
              removeImage={removeImage}
              askForSourceInUpload={askForSourceInUpload}
            />
          );
        })}
      </View>
    );
  },
  [Photos],
);
