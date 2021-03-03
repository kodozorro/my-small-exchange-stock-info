import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AnimatedTypingText } from '../modules/AnimatedTypingText';
import { Palette } from '../styles/palette/palette';

const GREETINGS_TEXT = `Wake up Neo... 
In this small application you can see the latest quote values from the Poloniex exchange.`

export function Home({ navigation }: any) {
  return (
    <>
      <StatusBar barStyle="light-content" />


      <View style={styles.body}>

        <AnimatedTypingText
          text={GREETINGS_TEXT}
          TextColor={Palette.SPRING_GREEN}
          AnimatedTextSize={25}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Котировки')}
          style={styles.button}
        >
          <Text style={styles.text}>Red pill</Text>
        </TouchableOpacity>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: Palette.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 50,
    paddingVertical: 30,
    paddingHorizontal: 70,
    backgroundColor: Palette.ALIZARIN_CRIMSON,
    borderRadius: 70,
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    color: Palette.WHITE,
  },
});
