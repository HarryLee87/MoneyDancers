

import SQLite from 'react-native-sqlite-storage';



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
