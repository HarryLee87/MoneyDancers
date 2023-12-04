import db from '../database/OpenDatabase';

export const getAccountCategories = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM account_categories',
                [],
                (_, { rows }) => {
                    resolve(rows.raw());
                },
                (_, error) => {
                    console.log(error);
                    reject(error);
                }
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
                (_, { rows }) => {
                    resolve(rows.raw());
                },
                (_, error) => {
                    console.log(error);
                    reject(error);
                }
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
                (_, { rows }) => {
                    resolve(rows.raw());
                },
                (_, error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    });
};

export const getTotalIncomeByCategory = async (categoryId) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT SUM(amount) as totalIncome FROM incomes WHERE income_categories_id = ?',
                [categoryId],
                (_, { rows }) => {
                    resolve(rows.raw());
                },
                (_, error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    });
};

export const getTotalExpensesByCategory = async (categoryId) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT SUM(amount) as totalExpenses FROM expenses WHERE expense_categories_id = ?',
                [categoryId],
                (_, { rows }) => {
                    resolve(rows.raw());
                },
                (_, error) => {
                    console.log(error);
                    reject(error);
                }
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
          (_, { rows }) => {
            if (rows.length > 0) {
              resolve(rows.item(0).amount);
            } else {
              resolve(0); // Default value if no budget is set
            }
          },
          (_, error) => {
            console.log(error);
            reject(error);
          }
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
          }
        );
      });
    });
  };

  
  export const getExpenseCategories = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM categories WHERE type = "expense_categories"',
          [],
          (_, results) => {
            resolve(results.rows.raw());
          },
          (_, error) => {
            console.error(error);
            reject(error);
          }
        );
      });
    });
  };

<<<<<<< Updated upstream
  export const getIncomeCategories = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM categories WHERE type = "income_categories"',
          [],
          (_, results) => {
            resolve(results.rows.raw());
=======
export const getExpenseCategories = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM expenses_categories',
          [],
          (_, results) => {
            resolve(rows.raw());
>>>>>>> Stashed changes
          },
          (_, error) => {
            console.error(error);
            reject(error);
          }
        );
      });
    });
  };
<<<<<<< Updated upstream
  
=======

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
          }
        );
      });
    });
  };
  
  export const getTotalExpensesForEachCategory = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT e.expense_categories_id, ec.name, SUM(e.amount) as totalExpenses FROM expenses e INNER JOIN expenses_categories ec ON e.expense_categories_id = ec.id GROUP BY e.expense_categories_id',
          [],
          (_, { rows }) => {
            resolve(rows.raw());
          },
          (_, error) => {
            console.log(error);
            reject(error);
          }
        );
      });
    });
  };

  export const getTotalIncomeForEachCategory = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT i.income_categories_id, ic.name, SUM(i.amount) as totalIncome FROM incomes i INNER JOIN income_categories ic ON i.income_categories_id = ic.id GROUP BY i.income_categories_id',
          [],
          (_, { rows }) => {
            resolve(rows.raw());
          },
          (_, error) => {
            console.log(error);
            reject(error);
          }
        );
      });
    });
  };
>>>>>>> Stashed changes
