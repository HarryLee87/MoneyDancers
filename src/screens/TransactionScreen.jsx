import React from 'react';
import {View, Text, StyleSheet, Button, Tou} from 'react-native';
import TransactionExpense from '../components/TransactionExpense';
// import Mybutton from '../components/Mybutton';

const TransactionScreen = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.buttonContainer, {justifyContent: 'flex-end'}]}>
        <View style={[styles.expenseButton, {marginRight: 10}, {rounded: 5}]}>
          <Button title="Expenses" color={'#F3B391'} />
        </View>
        <View style={[styles.expenseButton, {marginLeft: 10}]}>
          <Button title="Incomes" color={'#ADC989'} />
        </View>
      </View>
      <TransactionExpense />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9DB',
    width: '100%',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#FBEB9B',
    height: 70,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    flexDirection: 'row',
  },
  expenseButton: {
    width: 'auto',
  },
});

export default TransactionScreen;
