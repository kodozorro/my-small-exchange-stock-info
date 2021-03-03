import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import { Palette } from '../styles/palette/palette';
import { prepareData, useInterval } from '../utils/utils';
import { Row } from './Row';

export interface IExchangeProps {
  [key: string]: {
    last: string;
    highestBid: string;
    percentChange: string;
  };
}

export interface IPreparedObjectProps {
  last: string;
  highestBid: string;
  percentChange: string;
  name: string;
}

function Header() {
  return (
    <View style={styles.header}>
      <Text style={[styles.column, styles.title]}>Ticker</Text>
      <Text style={[styles.column, styles.title]}>Highest Bid</Text>
      <Text style={[styles.column, styles.title]}>Last</Text>
      <Text style={[styles.column, styles.title]}>Percent Change</Text>
    </View>
  );
}

const API_REQUEST_INTERVAL = 5000;

export function Table() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<IPreparedObjectProps[]>([]);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setError(false);
      let response = await fetch(
        'https://poloniex.com/public?command=returnTicker',
      );
      let json = await response.json();
      if (json['error']) {
        console.log(json['error']);
        setError(true);

        // For rendering flatList without re-render
        setData([{
          last: '',
          highestBid: '',
          percentChange: '',
          name: '',
        }]);
        setLoading(false);
      } else {
        const preparedData = prepareData(json);
        setData(preparedData);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  }, []);

  useInterval(async () => {
    fetchData();
  }, API_REQUEST_INTERVAL);

  return (
    <View style={styles.main}>
      {isLoading ? (
        <ActivityIndicator color={Palette.SPRING_GREEN} size="large" />
      ) : (
          <ScrollView horizontal>
            <FlatList
              // pagingEnabled={true}
              ListHeaderComponent={<Header />}
              data={data}
              keyExtractor={(item, index) => item.name}
              renderItem={(item) => {
                return !error ? (
                  <Row item={item.item} />
                ) : (
                    <Text style={styles.error}>Ошибка, попробуйте позже</Text>
                  );
              }}
              stickyHeaderIndices={[0]}
            />
          </ScrollView>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.BLACK,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: Palette.BLACK,
  },
  column: {
    width: 150,
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    color: Palette.ALIZARIN_CRIMSON,
  },
  error: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 16,
    color: Palette.ALIZARIN_CRIMSON,
    paddingLeft: 20,
    paddingTop: 40,
  },
});
