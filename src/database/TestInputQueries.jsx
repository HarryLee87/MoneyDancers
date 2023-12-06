import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'moneydancer.db', location: 'default'},
  () => {
    console.log('db opened');
  },
  error => console.log(error),
);

function insertInitialIncomes() {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO incomes (date, amount, description, account_categories_id, income_categories_id) VALUES ("2023-12-01", 1000.00, "ScholarShip", 1, 3)',
      [],
      (_, result) => console.log('Data inserted into incomes successfully'),
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO incomes (date, amount, description, account_categories_id, income_categories_id) VALUES ("2023-12-15", 7539.00, "Wage", 1, 3)',
      [],
      (_, result) => console.log('Data inserted into incomes successfully'),
      (_, error) => console.log(error),
    );
  });


  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO incomes (date, amount, description, account_categories_id, income_categories_id) VALUES ("2023-12-20", 500.00, "Tip", 2, 3)',
      [],
      (_, result) => console.log('Tip Data inserted into incomes successfully'),
      (_, error) => console.log(error),
    );
  });
}

function insertInitialExpenses() {
  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO expenses (date, amount, description, account_categories_id, expense_categories_id) VALUES ('2023-12-02', 162.7, 'Safeway', 1, 3)",
      [],
      (_, result) => console.log('Data inserted into expenses successfully'),
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO expenses (date, amount, description, account_categories_id, expense_categories_id) VALUES ('2023-12-05', 65.00, 'Internet', 1, 6)",
      [],
      (_, result) => console.log('Data inserted into expenses successfully'),
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO expenses (date, amount, description, account_categories_id, expense_categories_id) VALUES ('2023-12-15', 2300.00, 'Rent', 1, 4)",
      [],
      (_, result) => console.log('Data inserted into expenses successfully'),
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO expenses (date, amount, description, account_categories_id, expense_categories_id) VALUES ('2023-12-15', 268.78, 'Costco', 1, 3)",
      [],
      (_, result) => console.log('Data inserted into expenses successfully'),
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO expenses (date, amount, description, account_categories_id, expense_categories_id) VALUES ('2023-12-15', 65.00, 'Internet', 1, 6)",
      [],
      (_, result) => console.log('Data inserted into expenses successfully'),
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO expenses (date, amount, description, account_categories_id, expense_categories_id) VALUES ('2023-12-16', 10.00, 'Lotto', 1, 7)",
      [],
      (_, result) => console.log('Data inserted into expenses successfully'),
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO expenses (date, amount, description, account_categories_id, expense_categories_id) VALUES ('2023-12-16', 123.91, 'Sis birthday', 1, 1)",
      [],
      (_, result) => console.log('Data inserted into expenses successfully'),
      (_, error) => console.log(error),
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO expenses (date, amount, description, account_categories_id, expense_categories_id) VALUES ('2023-12-17', 210.00, 'AirPods', 3, 6)",
      [],
      (_, result) => console.log('Data inserted into expenses successfully'),
      (_, error) => console.log(error),
    );
  });
}

export default function TestInputQueries() {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM incomes', [], (_, {rows}) => {
      if (rows.length === 0) {
        insertInitialIncomes();
      } else {
        console.log('incomes table already has data');
      }
    });
  });

  db.transaction(tx => {
    tx.executeSql('SELECT * FROM expenses', [], (_, {rows}) => {
      if (rows.length === 0) {
        insertInitialExpenses();
      } else {
        console.log('expenses table already has data');
      }
    });
  });

  db.transaction(tx => {
    tx.executeSql('SELECT * FROM incomes', [], (_, {rows}) => {
      console.log('incomes table rows(.testinputqueries): ', rows);
    });
  });

  db.transaction(tx => {
    tx.executeSql('SELECT * FROM expenses', [], (_, {rows}) => {
      console.log('expenses table rows(.testinputqueries): ', rows);
    });
  });
}
