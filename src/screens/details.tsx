import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Table } from '../modules/table';


export function DetailsScreen() {

  return (
    <Table />
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff'
  },
});
