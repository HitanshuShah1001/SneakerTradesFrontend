import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {COINS} from '../../assets';
import {Textinput} from '../../components/Textinput';
import {FONT_WEIGHT_BOLD, TITLE_COLOR} from '../../constants/colorsandfonts';

export const Coinbalanceandrecharge = ({balance = 570}) => {
  const [coins, setCoins] = useState('');

  const CurrentBalance = ({balance}) => {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}> Current Balance</Text>
          <Text style={styles.coinbalance}>{balance} Coins</Text>
        </View>
        <Image source={COINS} />
      </View>
    );
  };

  const CoinsToRecharge = () => {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Enter number of coins to recharge</Text>
          <Textinput
            customstyles={styles.inputcustomstyles}
            custVal={coins}
            setCustVal={setCoins}
            inputMode={'numeric'}
          />
        </View>
      </View>
    );
  };
  return (
    <View>
      <CurrentBalance />
      <CoinsToRecharge />
    </View>
  );
};

const styles = {
  container: {
    height: 90,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 12,
  },
  title: {
    fontWeight: 400,
    fontSize: 16,
    color: TITLE_COLOR,
  },
  coinbalance: {fontWeight: FONT_WEIGHT_BOLD, fontSize: 20},
  inputcustomstyles: {height: 29, width: '100%'},
};
