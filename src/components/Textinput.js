import {TextInput} from 'react-native';
import {THEME_PINK} from '../constants/colorsandfonts';

export const Textinput = ({
  placeholder,
  customstyles,
  custVal,
  setCustVal,
  inputMode,
}) => {
  return (
    <TextInput
      style={[styles.textinput, {...customstyles}]}
      placeholder={placeholder}
      value={custVal}
      onChangeText={val => {
        setCustVal(val);
      }}
      inputMode={inputMode}
    />
  );
};

const styles = {
  textinput: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 10,
    height: 45,
    paddingHorizontal: 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: THEME_PINK,
  },
};
