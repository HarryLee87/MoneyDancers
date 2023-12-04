import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'moneydancer.db', location: 'default'},
  () => {
    console.log('db opened');
  },
  error => console.log(error),
);

export default function DeleteTables() {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS Budget',
      [],
      (_, result) => {
        console.log('Table "expenses" deleted successfully');
      },
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS expenses',
      [],
      (_, result) => {
        console.log('Table "expenses" deleted successfully');
      },
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS incomes',
      [],
      (_, result) => {
        console.log('Table "expenses" deleted successfully');
      },
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS account_categories',
      [],
      (_, result) => {
        console.log('Table "expenses" deleted successfully');
      },
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS expenses_categories',
      [],
      (_, result) => {
        console.log('Table "expenses" deleted successfully');
      },
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS income_categories',
      [],
      (_, result) => {
        console.log('Table "expenses" deleted successfully');
      },
      (_, error) => console.log(error),
    );
  });
}
