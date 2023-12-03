import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import * as Progress from 'react-native-progress';
import {
  getTotalAssets,
  getTotalLiabilities,
  getAccountCategories,
  getTotalExpensesByCategory,
  getTotalIncomeByCategory,
} from '../services/GetAccountDataQueries';
import SetBudget from '../components/SetBudget';
import { getBudget } from '../services/GetAccountDataQueries';

const AccountScreen = () => {
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalLiabilities, setTotalLiabilities] = useState(0);
  const [accountCategories, setAccountCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [setBudgetVisible, setSetBudgetVisible] = useState(false);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetsResult = await getTotalAssets();
        const assets = assetsResult[0].totalAssets;
        const liabilitiesResult = await getTotalLiabilities();
        const liabilities = liabilitiesResult[0].totalLiabilities;
        const categories = await getAccountCategories();
        const totalByAccCat = await Promise.all(
          categories.map(async category => {
            const totalIncomeResult = await getTotalIncomeByCategory(
              category.id,
            );
            const totalIncome = totalIncomeResult[0]?.totalIncome || 0;
            const totalExpensesResult = await getTotalExpensesByCategory(
              category.id,
            );
            const totalExpenses = totalExpensesResult[0]?.totalExpenses || 0;
            return {...category, totalIncome, totalExpenses};
          }),
        );
        const loadBudget = await getBudget();

        setAccountCategories(totalByAccCat);
        setTotalAssets(assets.toFixed(2));
        setTotalLiabilities(liabilities.toFixed(2));
        setBudget(loadBudget);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

    if (isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    const toggleSetBudgetVisible = () => {
      setSetBudgetVisible(!setBudgetVisible);
    };

    const handleSaveBudget = (newBudget)  => {
        console.log('budget:', newBudget);
        setBudget(newBudget);
        toggleSetBudgetVisible();
    };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Assets</Text>
          <Text style={styles.assetsValue}>${totalAssets}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Liabilities</Text>
          <Text style={styles.liabilitiesValue}>${totalLiabilities}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Total</Text>
          <Text style={styles.totalValue}>
            ${(totalAssets - totalLiabilities).toFixed(2)}
          </Text>
        </View>
      </View>
      {/* Budget Progress Bar */}
      <View style={styles.budgetContainer}>
        <Text style={styles.budgetTitle}>My Budget: ${budget}</Text>
        <Progress.Bar
          progress={totalLiabilities / budget}
          width={null}
          color="#BF4342"
          height={30}
          style={styles.progressBar}
        />
        <Text style={styles.budgetPercentage}>{((totalLiabilities / budget) * 100).toFixed(1)}%</Text>
      </View>
      <View style={styles.budgetButtonContainer}>
        <Button style={styles.budgetButton} color="#F3B391" title="Set Budget" onPress={toggleSetBudgetVisible} />
      </View>
      <SetBudget visible={setBudgetVisible} onSave={handleSaveBudget} onClose={toggleSetBudgetVisible} initialBudget={budget} />

      {/* Account Details */}
      <View style={styles.accountContainer}>
        <Text style={styles.accountTitle}>My Account</Text>
        {accountCategories.map(category => (
          <View key={category.id} style={styles.accountItem}>
            <Text style={styles.accountType}>{category.name}</Text>
            <Text
              style={
                category.totalIncome - category.totalExpenses < 0
                  ? styles.accountValueRed
                  : styles.accountValue
              }>
              ${Math.abs(category.totalIncome - category.totalExpenses)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9DB',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#FBEB9B',
    height: 70,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  assetsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  liabilitiesValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  budgetContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  budgetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  progressBar: {
    height: 30,
    width: '100%',
    backgroundColor: '#6A994E',
    borderRadius: 5,
  },
  budgetPercentage: {
    fontSize: 18,
    color: '#000',
    position: 'absolute',
    right: '5%',
    top: '15%',
  },
  accountContainer: {
    paddingHorizontal: 20,
  },
  accountTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FBEB9B',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  accountType: {
    fontSize: 18,
    color: '#000',
  },
  accountValue: {
    fontSize: 18,
    color: '#457D43',
  },
  accountValueRed: {
    fontSize: 18,
    color: '#FF5555',
  },
  budgetButtonContainer: {
    alignItems: 'flex-end',
    paddingRight: 20,
    marginTop: 10, 
  },
  budgetButton: {
    width: 'auto',
  },
});

export default AccountScreen;
