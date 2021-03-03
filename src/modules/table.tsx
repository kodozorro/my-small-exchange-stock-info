import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import {Palette} from '../styles/palette/palette';
import {prepareData, useInterval} from '../utils/utils';
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

function row(item: IPreparedObjectProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.column, styles.name]}>{item.name}</Text>
      <Text style={[styles.column, styles.value]}>{item.highestBid}</Text>
      <Text style={[styles.column, styles.value]}>{item.last}</Text>
      <Text style={[styles.column, styles.value]}>{item.percentChange}</Text>
    </View>
  );
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

export function Table() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<IPreparedObjectProps[]>([]);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      let response = await fetch(
        'https://poloniex.com/public?command=returnTickers',
      );
      let json = await response.json();
      if (json['error']) {
        console.log(json['error']);
        setError(true);
        setData([0]);
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
  }, 4000);

  return (
    <View style={styles.main}>
      {isLoading ? (
        <ActivityIndicator color={Palette.DODGER_BLUE} size="large" />
      ) : (
        <ScrollView horizontal>
          <FlatList
            // pagingEnabled={true}
            ListHeaderComponent={<Header />}
            data={data}
            keyExtractor={(item, index) => item.name}
            renderItem={(item) => {
              return !error ? (
                row(item.item)
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
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Palette.GRAY,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: Palette.WHITE,
  },
  column: {
    width: 150,
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    color: Palette.DODGER_BLUE,
  },
  name: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    color: Palette.BLACK,
  },
  value: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 16,
    color: Palette.HARLEQUIN,
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
