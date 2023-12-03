import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TransactionExpense from '../components/TransactionExpense';

const TransactionScreen = () => {
  return (
    <View style={styles.container}>
      <TransactionExpense />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default TransactionScreen;
