import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {COINS} from '../../assets';
import {Textinput} from '../../components/Textinput';
import {FONT_WEIGHT_BOLD, TITLE_COLOR} from '../../constants/colorsandfonts';
import {SafeArea} from '../../components/SafeArea';
import {COINS_BALANCE_RECHARGE} from '../../constants/Buttontitles';

export const Coinbalanceandrecharge = props => {
  const {balance} = props.route.params;
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
    <SafeArea text={COINS_BALANCE_RECHARGE} go_back>
      <CurrentBalance balance={balance} />
      <CoinsToRecharge />
    </SafeArea>
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
