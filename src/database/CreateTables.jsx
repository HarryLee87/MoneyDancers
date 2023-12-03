import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'moneydancer.db', location: 'default'},
  () => {
    console.log('db opened');
  },
  error => console.log(error),
);

export default function CreateTables() {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS income_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)',
      [],
      (_, result) => console.log('created income_categories table'),
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS expenses_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)',
      [],
      (_, result) => console.log('created expenses_categories table'),
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS account_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)',
      [],
      (_, result) => console.log('created account_categories table'),
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS incomes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            amount REAL NOT NULL,
            description TEXT,
            account_categories_id INTEGER NOT NULL,
            income_categories_id INTEGER NOT NULL,
            FOREIGN KEY (account_categories_id) REFERENCES account_categories (id),
            FOREIGN KEY (income_categories_id) REFERENCES income_categories (id))`,
      [],
      (_, result) => console.log('created incomes table'),
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        amount REAL NOT NULL,
        description TEXT,
        account_categories_id INTEGER NOT NULL,
        expense_categories_id INTEGER NOT NULL,
        FOREIGN KEY (account_categories_id) REFERENCES account_categories (id),
        FOREIGN KEY (expense_categories_id) REFERENCES expense_categories (id))`,
      [],
      (_, result) => console.log('created expenses table'),
      (_, error) => console.log(error),
    );
  });
}
