import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import {
  getTotalExpensesForEachCategory,
  getTotalIncomeForEachCategory,
} from '../services/GetAccountDataQueries';

const ChartScreen = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [expenseByCategory, setExpenseByCategory] = useState([]);
  const [incomeByCategory, setIncomeByCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesData = await getTotalExpensesForEachCategory();
        const incomesData = await getTotalIncomeForEachCategory();

        setExpenseByCategory(expensesData);
        setIncomeByCategory(incomesData);

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
    <ScrollView style={styles.container}>
      <View style={styles.accountContainer}>    
        <View style={styles.accountContainer}>
          <Text style={styles.accountTitle}>Expense Categories</Text>
          {expenseByCategory.map(category => (
            <View
              key={category.expense_categories_id}
              style={styles.accountItem}>
              <Text style={styles.accountType}>{category.name}</Text>
              <Text style={styles.accountValue}>
                ${category.totalExpenses.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.accountTitle}>Income Categories</Text>
          {incomeByCategory.map(category => (
            <View
              key={category.income_categories_id}
              style={styles.accountItem}>
              <Text style={styles.accountType}>{category.name}</Text>
              <Text style={styles.accountValue}>
                ${category.totalIncome.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9DB',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#FBEB9B',
    height: 70,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  assetsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  liabilitiesValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  budgetContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  budgetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  progressBar: {
    height: 30,
    width: '100%',
    backgroundColor: '#6A994E',
    borderRadius: 5,
  },
  budgetPercentage: {
    fontSize: 18,
    color: '#000',
    position: 'absolute',
    right: '5%',
    top: '15%',
  },
  accountContainer: {
    paddingHorizontal: 20,
  },
  accountTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FBEB9B',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  accountType: {
    fontSize: 18,
    color: '#000',
  },
  accountValue: {
    fontSize: 18,
    color: '#457D43',
  },
  accountValueRed: {
    fontSize: 18,
    color: '#FF5555',
  },
  budgetButtonContainer: {
    alignItems: 'flex-end',
    paddingRight: 20,
    marginTop: 10,
  },
  budgetButton: {
    width: 'auto',
  },
});

export default ChartScreen;
