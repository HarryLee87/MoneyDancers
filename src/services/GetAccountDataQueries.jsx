import db from '../database/OpenDatabase';

export const getAccountCategories = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM account_categories',
        [],
        (_, {rows}) => {
          resolve(rows.raw());
        },
        (_, error) => {
          console.log(error);
          reject(error);
        },
      );
    });
  });
};

export const getTotalAssets = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT SUM(amount) as totalAssets FROM incomes',
        [],
        (_, {rows}) => {
          resolve(rows.raw());
        },
        (_, error) => {
          console.log(error);
          reject(error);
        },
      );
    });
  });
};

export const getTotalLiabilities = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT SUM(amount) as totalLiabilities FROM expenses',
        [],
        (_, {rows}) => {
          resolve(rows.raw());
        },
        (_, error) => {
          console.log(error);
          reject(error);
        },
      );
    });
  });
};

export const getTotalIncomeByCategory = async categoryId => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT SUM(amount) as totalIncome FROM incomes WHERE income_categories_id = ?',
        [categoryId],
        (_, {rows}) => {
          resolve(rows.raw());
        },
        (_, error) => {
          console.log(error);
          reject(error);
        },
      );
    });
  });
};

export const getTotalExpensesByCategory = async categoryId => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT SUM(amount) as totalExpenses FROM expenses WHERE expense_categories_id = ?',
        [categoryId],
        (_, {rows}) => {
          resolve(rows.raw());
        },
        (_, error) => {
          console.log(error);
          reject(error);
        },
      );
    });
  });
};

export const getBudget = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT amount FROM Budget ORDER BY id DESC LIMIT 1;',
        [],
        (_, {rows}) => {
          if (rows.length > 0) {
            resolve(rows.item(0).amount);
          } else {
            resolve(0); // Default value if no budget is set
          }
        },
        (_, error) => {
          console.log(error);
          reject(error);
        },
      );
    });
  });
};

export const setBudget = async amount => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Budget (amount) VALUES (?);',
        [amount],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          console.log(error);
          reject(error);
        },
      );
    });
  });
};

export const getExpenses = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM expenses ORDER BY date DESC',
        [],
        (_, {rows}) => {
          resolve(rows.raw());
        },
        (_, error) => {
          console.log(error);
          reject(error);
        },
      );
    });
  });
};

export const getExpenseCategory = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM expense_categories',
        [],
        (_, {rows}) => {
          console.log('category rows:', rows);
          resolve(rows.raw());
        },
        (_, error) => {
          console.log(error);
          reject(error);
        },
      );
    });
  });
};
