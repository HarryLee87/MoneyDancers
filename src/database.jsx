
// database.jsx

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'expenseTracker.db',
  location: 'default',
});

// Create a table for transactions if it doesn't exist
db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, amount REAL)'
  );
});

// Function to insert a new transaction
export const insertTransaction = (type, amount) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO transactions (type, amount) VALUES (?, ?)',
        [type, amount],
        (_, results) => {
          resolve(results);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Function to retrieve all transactions
export const getAllTransactions = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM transactions',
      [],
      (_, results) => {
        const transactions = results.rows.raw();
        callback(transactions);
      },
      (_, error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  });
};
