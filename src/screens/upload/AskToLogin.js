import {View} from 'react-native';
import {SafeArea} from '../../components/SafeArea';
import {Text} from 'react-native-paper';
import {AuthenticationButton} from '../../components/Authenticationbutton';
import {styles} from './styles';
import {LOGIN} from '../../constants/Buttontitles';

export const AskToLogin = ({text, onPress, header}) => {
  return (
    <SafeArea text={header}>
      <View style={styles.asktologinview}>
        <Text style={styles.asktologintext}>{text}</Text>
        <AuthenticationButton
          text={LOGIN}
          customstyles={styles.asktologinbutton}
          onPress={onPress}
        />
      </View>
    </SafeArea>
  );
};
