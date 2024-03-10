import {Text, View} from 'react-native';

export const ContactInfo = ({title, information}) => {
  return (
    <View style={{marginTop: 20}}>
      <Text style={{fontWeight: 400, fontSize: 12, color: '#B2B2B2'}}>
        {title}
      </Text>
      <Text style={{fontWeight: 400, fontSize: 18, color: '#00000'}}>
        {information}
      </Text>
    </View>
  );
};
