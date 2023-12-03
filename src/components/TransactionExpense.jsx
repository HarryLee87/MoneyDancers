import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'moneydancer.db', location: 'default'},
  () => {
    console.log('db opened');
  },
  error => console.log(error),
);

export default function TransactionExpense() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM expenses',
        [],
        (_, {rows}) => {
          console.log('from transactionexpense compo:', rows); // 확인용 로그

          let newExpenses = [];

          for (let i = 0; i < rows.length; i++) {
            let id = rows.item(i).id;
            let date = rows.item(i).date;
            let amount = rows.item(i).amount;
            let description = rows.item(i).description;
            let account_categories_id = rows.item(i).account_categories_id;
            let expense_categories_id = rows.item(i).expense_categories_id;

            newExpenses.push({
              id,
              date,
              amount,
              description,
              account_categories_id,
              expense_categories_id,
            });
          }
          setExpenses(newExpenses);
        },
        (_, error) => console.log(error),
      );
    });
  }, []);

  return (
    <View>
      {expenses.length === 0 ? (
        <Text>No expenses</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View>
              <Text>{`Amount: ${item.amount}`}</Text>
              <Text>{`Desc: ${item.description}`}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
});
