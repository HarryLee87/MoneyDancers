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

export const setBudget = async (amount) => {
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
        'SELECT * FROM expenses_categories',
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

export const getIncomes = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM incomes ORDER BY date DESC',
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

export const getExpenseCategories = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM expenses_categories',
        [],
        (_, results) => {
          resolve(rows.raw());
        },
        (_, error) => {
          console.error(error);
          reject(error);
        },
      );
    });
  });
};

export const getIncomeCategories = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM income_categories',
        [],
        (_, results) => {
          resolve(rows.raw());
        },
        (_, error) => {
          console.error(error);
          reject(error);
        },
      );
    });
  });
};

export const getTotalExpensesForEachCategory = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT e.expense_categories_id, ec.name, SUM(e.amount) as totalExpenses, ROUND(SUM(e.amount) * 100.0 / (SELECT SUM(amount) FROM expenses)) as expensePercentage FROM expenses e INNER JOIN expenses_categories ec ON e.expense_categories_id = ec.id GROUP BY e.expense_categories_id ORDER BY totalExpenses DESC',
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

export const getTotalIncomeForEachCategory = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT i.income_categories_id, ic.name, SUM(i.amount) as totalIncome, ROUND(SUM(i.amount) * 100.0 / (SELECT SUM(amount) FROM incomes)) as incomePercentage FROM incomes i INNER JOIN income_categories ic ON i.income_categories_id = ic.id GROUP BY i.income_categories_id ORDER BY totalIncome DESC',
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

export const getIncomeCategory = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM income_categories',
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

export const getTotalExpensesByAccountCategory = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT e.account_categories_id, ac.name, SUM(e.amount) as totalExpenses FROM expenses e INNER JOIN account_categories ac ON e.account_categories_id = ac.id GROUP BY e.account_categories_id ORDER BY totalExpenses DESC',
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

export const getTotalIncomeByAccountCategory = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT i.account_categories_id, ac.name, SUM(i.amount) as totalIncome FROM incomes i INNER JOIN account_categories ac ON i.account_categories_id = ac.id GROUP BY i.account_categories_id ORDER BY totalIncome DESC',
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
