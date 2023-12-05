import React, {useEffect, useState} from 'react';
import ChartCompo from './Chartcompo';
import {
  getTotalExpensesForEachCategory,
  getTotalIncomeForEachCategory,
} from '../services/GetAccountDataQueries';

export function ChartExpense() {
  const [isLoading, setIsLoading] = useState(true);
  const [expenseByCategory, setExpenseByCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesData = await getTotalExpensesForEachCategory();
        setExpenseByCategory(expensesData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ChartCompo
      isLoading={isLoading}
      data={expenseByCategory}
      getData={getTotalExpensesForEachCategory}
      title="Expense Chart"
      percentageKey="expensePercentage"
      valueKey="totalExpenses"
    />
  );
}

export function ChartIncome() {
  const [isLoading, setIsLoading] = useState(true);
  const [incomeByCategory, setIncomeByCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeData = await getTotalIncomeForEachCategory();
        setIncomeByCategory(incomeData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <ChartCompo
      isLoading={isLoading}
      data={incomeByCategory}
      getData={getTotalIncomeForEachCategory}
      title="Income Chart"
      percentageKey="incomePercentage"
      valueKey="totalIncome"
    />
  );
}
