import db from '../database/OpenDatabase';

export function insertExpenseTransaction({expenseQuery}) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO expenses (date, amount, description, account_categories_id, expense_categories_id) VALUES (?, ?, ?,?, ?)',
      expenseQuery,
      (_, result) => {
        console.log('Data inserted into expenses successfully from AddScreen');
        console.log('result:', result);
      },
      (_, error) => {
        console.log(error);
      },
    );
  });
}

export function insertIncomeTransaction({incomeQuery}) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO incomes (date, amount, description, account_categories_id, income_categories_id) VALUES (?, ?, ?, ?, ?)',
      incomeQuery,
      (_, result) => {
        console.log('Data inserted into incomes successfully from AddScreen');
      },
      (_, error) => {
        console.log(error);
      },
    );
  });
}
