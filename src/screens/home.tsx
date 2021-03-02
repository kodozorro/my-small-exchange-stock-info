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
import { Palette } from '../styles/palette/palette';

export function Home({ navigation }: any) {
  return (
    <>
      <StatusBar barStyle="light-content" />


      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details')}
          style={styles.button}
        >
          <Text style={styles.text}>Go to Details</Text>
        </TouchableOpacity>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 40,
    backgroundColor: Palette.DODGER_BLUE,
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    color: Palette.WHITE,
  }
});
