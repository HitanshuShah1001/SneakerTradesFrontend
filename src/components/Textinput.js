import {TextInput} from 'react-native';

export const Textinput = ({placeholder, customstyles}) => (
  <TextInput
    style={[styles.textinput, {...customstyles}]}
    placeholder={placeholder}
  />
);

const styles = {
  textinput: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 10,
    height: 45,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
};
