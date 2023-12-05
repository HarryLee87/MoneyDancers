import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
// import {DropDown} from 'react-native-element-dropdown';
import {
  getTotalExpensesForEachCategory,
  getTotalIncomeForEachCategory,
} from '../services/GetAccountDataQueries';
// import ChartExpense from '../components/ChartExpense';
// import ChartIncome from '../components/ChartIncome';
import {ChartExpense, ChartIncome} from '../components/ChartExIn';

const ChartScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('expenses');
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesData = await getTotalExpensesForEachCategory();
        const incomesData = await getTotalIncomeForEachCategory();

        // Calculate total expenses
        const totalExpenseAmount = expensesData.reduce(
          (total, category) => total + category.totalExpenses,
          0,
        );
        setTotalExpense(totalExpenseAmount);

        // Calculate total income
        const totalIncomeAmount = incomesData.reduce(
          (total, category) => total + category.totalIncome,
          0,
        );
        setTotalIncome(totalIncomeAmount);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.chartHeader}>
        <View style={{...styles.monthHeader, marginBottom: 10}}>
          <Text style={styles.monthTitle}>December 2023</Text>
        </View>
        <View style={styles.incomeExpenseContainer}>
          <View style={styles.totalHeader}>
            <Text style={styles.totalTitle}>Expense</Text>
            <Text style={{...styles.totalExpenseValue, padding: 10}}>
              {totalExpense.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
          <View style={styles.totalHeader}>
            <Text style={styles.totalTitle}>Income</Text>
            <Text style={{...styles.totalIncomeValue, padding: 10}}>
              {totalIncome.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.transaction}>
        <Text
          style={{
            ...styles.title,
            alignSelf: 'flex-start',
            marginLeft: 10,
            marginBottom: 20,
            color: '#000',
          }}>
          Transactions
        </Text>
        <View style={styles.buttonContainer}>
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
      </View>
      {status === 'expenses' ? <ChartExpense /> : <ChartIncome />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9DB',
  },
  chartHeader: {
    position: 'fixed',
    top: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 0,
  },
  monthHeader: {
    alignItems: 'center',
    //justifyContent: 'center',
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 0,
  },
  incomeExpenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //width: '60%',
  },
  totalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  totalExpenseValue: {
    fontSize: 18,
    color: '#FF5555',
  },
  totalIncomeValue: {
    fontSize: 18,
    color: '#457D43',
  },
  horizontalLine: {
    borderBottomColor: '#F3B391',
    borderBottomWidth: 1,
    marginVertical: 15,
    marginTop: 3,
    marginBottom: 3,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //marginTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    //alignSelf: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FBEB9B',
    // paddingVertical: 8,
    // paddingHorizontal: 20,
    marginHorizontal: 3,
    padding: 10,
    borderRadius: 5,
  },
});

export default ChartScreen;
