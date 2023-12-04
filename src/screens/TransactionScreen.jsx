import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Tou} from 'react-native';
import TransactionExpense from '../components/TransacExpense';
import TransactionIncome from '../components/TransacIncome';

const TransactionScreen = () => {
  const [status, setStatus] = useState('expense');
  return (
    <View style={styles.container}>
      <View style={[styles.buttonContainer, {justifyContent: 'flex-end'}]}>
        <View style={[styles.expenseButton, {marginRight: 10}, {rounded: 5}]}>
          <Button
            title="Expenses"
            color={'#F3B391'}
            onPress={() => setStatus('expenses')}
          />
        </View>
        <View style={[styles.expenseButton, {marginLeft: 10}]}>
          <Button
            title="Incomes"
            color={'#ADC989'}
            onPress={() => setStatus('incomes')}
          />
        </View>
      </View>
      {status === 'expenses' ? <TransactionExpense /> : <TransactionIncome />}
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
    marginTop: 20,
    flexDirection: 'row',
  },
  expenseButton: {
    width: 'auto',
  },
});

export default TransactionScreen;
