import {Pressable, Text, View} from 'react-native';
import {styles} from '../screens/upload/styles';
import {FONT_WEIGHT_BOLD} from '../constants/colorsandfonts';
import {UPLOAD} from '../constants/Screen';
import {REQUEST} from '../constants/Choices';

export const Typechip = ({text, uploadedFor, setUploadedFor}) => (
  <Pressable style={styles.chip} onPress={() => setUploadedFor(text)}>
    <Text style={{fontWeight: uploadedFor === text ? FONT_WEIGHT_BOLD : 400}}>
      {text}
    </Text>
  </Pressable>
);

export const Uploadchips = ({uploadedFor, setUploadedFor}) => (
  <View style={styles.container}>
    <Typechip
      text={UPLOAD}
      uploadedFor={uploadedFor}
      setUploadedFor={setUploadedFor}
    />
    <Typechip
      text={REQUEST}
      uploadedFor={uploadedFor}
      setUploadedFor={setUploadedFor}
    />
  </View>
);

export const Uploadedforchip = ({text}) => (
  <View style={{flexDirection: 'row'}}>
    <Pressable style={styles.uploadedFor} />
    <Text style={{marginLeft: 4}}>{text}</Text>
  </View>
);
