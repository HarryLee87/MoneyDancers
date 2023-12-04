import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  getExpenses,
  getExpenseCategory,
} from '../services/GetAccountDataQueries';

export default function TransactionExpense() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [expenseCategory, setExpenseCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseResult = await getExpenses();
        // console.log(expenseResult);
        const categoryResult = await getExpenseCategory();
        const categoryMap = categoryResult.reduce((acc, category) => {
          acc[category.id] = category.name;
          return acc;
        }, {});
        const mappedExpenses = expenseResult.map(expense => ({
          ...expense,
          category_name: categoryMap[expense.expense_categories_id], // Add category name to each expense
        }));
        // let newExpenses = [];

        // newExpenses = Array.from(expenseResult).map(row => ({
        //   id: row.id,
        //   date: row.date,
        //   amount: row.amount,
        //   description: row.description,
        //   account_categories_id: row.account_categories_id,
        //   expense_categories_id: row.expense_categories_id,
        // expense_category_name: expenseCategory.find(
        //   category => category.id === row.expense_categories_id,
        // )?.name,

        setExpenses(mappedExpenses);
        // setExpenseCategory(expenseCategoryResult);
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

  const uniqueDates = [...new Set(expenses.map(item => item.date))];

  return (
    <ScrollView style={styles.container}>
      <View>
        {expenses.length === 0 ? (
          <Text>No expenses</Text>
        ) : (
          uniqueDates.map(date => (
            <View key={date}>
              <Text style={styles.dateValue}>{`Date: ${date}`}</Text>
              {expenses
                .filter(item => item.date === date)
                .map(item => (
                  <View key={item.id} style={styles.expenseItem}>
                    <Text>{item.category_name || 'Unknown Category'}</Text>
                    <Text>{item.description}</Text>
                    <Text>${item.amount}</Text>
                  </View>
                ))}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9DB',
    width: '100%',
  },
  dateValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FBEB9B',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
});
