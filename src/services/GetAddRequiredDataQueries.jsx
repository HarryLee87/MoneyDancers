import db from '../database/OpenDatabase';

// for account dropdown list data
export async function getAccountListData() {
  try {
    const accountDataList = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM account_categories',
          [],
          (_, {rows}) => {
            let AccountData = [];
            for (let i = 0; i < rows.length; i++) {
              let ac = {};
              ac.label = rows.item(i).name;
              ac.value = rows.item(i).name;

              AccountData.push(ac);
            }
            resolve(AccountData);
            return;
          },
          (_, error) => {
            console.log(error);
            reject(error);
          },
        );
      });
    });
    return accountDataList;
  } catch (error) {
    console.log(error);
  }
}

// for expense dropdown list data
export async function getExpenseListData() {
  try {
    const expenseDataList = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM expenses_categories',
          [],
          (_, {rows}) => {
            let ExpenseData = [];
            for (let i = 0; i < rows.length; i++) {
              let ec = {};
              ec.label = rows.item(i).name;
              ec.value = rows.item(i).name;

              ExpenseData.push(ec);
            }
            resolve(ExpenseData);
            return;
          },
          (_, error) => {
            console.log(error);
            reject(error);
          },
        );
      });
    });
    return expenseDataList;
  } catch (error) {
    console.log(error);
  }
}

// for income dropdown list data
export async function getIncomeListData() {
  try {
    const IncomeDataList = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM income_categories',
          [],
          (_, {rows}) => {
            let IncomeData = [];
            for (let i = 0; i < rows.length; i++) {
              let ic = {};
              ic.label = rows.item(i).name;
              ic.value = rows.item(i).name;

              IncomeData.push(ic);
            }
            resolve(IncomeData);
            return;
          },
          (_, error) => {
            console.log(error);
            reject(error);
          },
        );
      });
    });
    return IncomeDataList;
  } catch (error) {
    console.log(error);
  }
}

// get account categories id
export async function getAccountCategoryId({name}) {
  try {
    const accountId = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM account_categories',
          [],
          (_, {rows}) => {
            for (let i = 0; i < rows.length; i++) {
              if (rows.item(i).name === name) {
                resolve(rows.item(i).id);
                return;
              }
            }
          },
          (_, error) => {
            console.log(error);
            reject(error);
          },
        );
      });
    });
    return accountId;
  } catch (error) {
    console.log(error);
  }
}

// to get expense_categories_id
export async function getExpenseCategoryId({name}) {
  try {
    const expenseId = await new Promise((resolve, reject) => {
      const getExpenseCatoIdQuery = `SELECT * FROM expenses_categories WHERE name = '${name}'`;
      db.transaction(tx => {
        tx.executeSql(
          getExpenseCatoIdQuery,
          [],
          (_, {rows}) => {
            resolve(rows.item(0).id);
            return;
          },
          (_, error) => {
            console.log(error);
            reject(error);
          },
        );
      });
    });
    return expenseId;
  } catch (error) {
    console.log(error);
  }
}

// to get income_categories_id
export async function getIncomeCategoryId({name}) {
  try {
    const incomeId = await new Promise((resolve, reject) => {
      const getIncomeCatoIdQuery = `SELECT * FROM income_categories WHERE name = '${name}'`;
      db.transaction(tx => {
        tx.executeSql(
          getIncomeCatoIdQuery,
          [],
          (_, {rows}) => {
            resolve(rows.item(0).id);
            return;
          },
          (_, error) => {
            console.log(error);
            reject(error);
          },
        );
      });
    });
    return incomeId;
  } catch (error) {
    console.log(error);
  }
}
