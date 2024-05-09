import {TextInput, StyleSheet} from 'react-native';
import {THEME_PINK} from '../constants/colorsandfonts';

export const Textinput = ({
  placeholder,
  customstyles,
  custVal,
  setCustVal,
  inputMode,
  is_mandatory = false,
  props,
}) => {
  return (
    <TextInput
      style={[
        styles.textinput,
        {...customstyles, ...(is_mandatory ? {borderWidth: 1.2} : {})},
      ]}
      placeholder={placeholder}
      value={custVal}
      onChangeText={val => {
        setCustVal(val);
      }}
      inputMode={inputMode}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textinput: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 10,
    height: 45,
    fontSize: 16,
    paddingHorizontal: 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: THEME_PINK,
  },
});
