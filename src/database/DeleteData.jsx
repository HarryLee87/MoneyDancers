import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'moneydancer.db', location: 'default'},
  () => {
    console.log('db opened');
  },
  error => console.log(error),
);

export default function DeleteData() {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM incomes',
      [],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('Data deleted from incomes successfully');
        } else {
          console.log('No data deleted from incomes');
        }
      },
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM expenses',
      [],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('Data deleted from expenses successfully');
        } else {
          console.log('No data deleted from expenses');
        }
      },
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM income_categories',
      [],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('Data deleted from income_categories successfully');
        } else {
          console.log('No data deleted from income_categories');
        }
      },
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM expenses_categories',
      [],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('Data deleted from expenses_categories successfully');
        } else {
          console.log('No data deleted from expenses_categories');
        }
      },
      (_, error) => console.log(error),
    );
  });
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM account_categories',
      [],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log('Data deleted from account_categories successfully');
        } else {
          console.log('No data deleted from account_categories');
        }
      },
      (_, error) => console.log(error),
    );
  });
}
