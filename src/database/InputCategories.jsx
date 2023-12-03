import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'moneydancer.db', location: 'default'},
  () => {
    console.log('db opened');
  },
  error => console.log(error),
);

function insertInitialIncomeCategories() {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO income_categories (name) VALUES (?), (?), (?)',
      ['Salary', 'Investments', 'Others'],
      (_, result) =>
        console.log('Data inserted to income categories table successfully'),
      (_, error) => console.log(error),
    );
  });
}

function insertInitialExpenseCategories() {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO expenses_categories (name) VALUES (?), (?), (?), (?), (?), (?), (?)',
      [
        'Drinks',
        'Food',
        'Groceries',
        'Housing',
        'Insurance',
        'Utilities',
        'Others',
      ],
      (_, result) =>
        console.log('Data inserted expense categories table successfully'),
      (_, error) => console.log(error),
    );
  });
}

function insertInitialAccountCategories() {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO account_categories (name) VALUES (?), (?), (?), (?)',
      ['Debit', 'Saving', 'Credit Card', 'Others'],
      (_, result) =>
        console.log('Data inserted account categories table successfully'),
      (_, error) => console.log(error),
    );
  });
}

export default function InputCategories() {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM income_categories',
      [],
      (_, {rows}) => {
        if (rows.length === 0) {
          insertInitialIncomeCategories();
        } else {
          console.log('income categories table already has data');
        }
      },
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM expenses_categories',
      [],
      (_, {rows}) => {
        if (rows.length === 0) {
          insertInitialExpenseCategories();
        } else {
          console.log('expense categories table already has data');
        }
      },
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM account_categories',
      [],
      (_, {rows}) => {
        if (rows.length === 0) {
          insertInitialAccountCategories();
        } else {
          console.log('account categories table already has data');
        }
      },
      (_, error) => console.log(error),
    );
  });
}
