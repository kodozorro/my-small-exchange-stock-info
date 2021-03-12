import React, {Component} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {Palette} from '../styles/palette/palette';
import {IPreparedObjectProps} from './Table';

interface IRowProps {
  item?: IPreparedObjectProps;
}

export class Row extends Component<IRowProps> {
  state = {
    fadeAnimBid: new Animated.Value(1),
    fadeAnimLast: new Animated.Value(1),
    fadeAnimPercent: new Animated.Value(1),
  };

  playAnimation(animation: any) {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }

  shouldComponentUpdate(nextProps: any) {
    if (this.props.item?.highestBid !== nextProps?.item?.highestBid) {
      this.playAnimation(this.state.fadeAnimBid);
      return true;
    } else if (this.props.item?.last !== nextProps?.item?.last) {
      this.playAnimation(this.state.fadeAnimLast);
      return true;
    } else if (
      this.props.item?.percentChange !== nextProps?.item?.percentChange
    ) {
      this.playAnimation(this.state.fadeAnimPercent);
      return true;
    }
    return false;
  }

  render() {
    const {item} = this.props;
    let {fadeAnimBid, fadeAnimLast, fadeAnimPercent} = this.state;
    return (
      <View style={styles.main}>
        <Text style={[styles.column, styles.name]}>{item?.name}</Text>
        <Animated.Text
          style={[styles.column, styles.value, {opacity: fadeAnimBid}]}>
          {item?.highestBid}
        </Animated.Text>
        <Animated.Text
          style={[styles.column, styles.value, {opacity: fadeAnimLast}]}>
          {item?.last}
        </Animated.Text>
        <Animated.Text
          style={[styles.column, styles.value, {opacity: fadeAnimPercent}]}>
          {item?.percentChange}
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Palette.GRAY,
  },
  column: {
    width: 150,
  },
  name: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    color: Palette.PARIS_WHITE,
  },
  value: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 16,
    color: Palette.HARLEQUIN,
  },
});
