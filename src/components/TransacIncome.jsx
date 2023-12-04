import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {getIncomeCategory, getIncomes} from '../services/GetAccountDataQueries';

export default function TransactionIncome() {
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResult = await getIncomes();
        // console.log(expenseResult);
        const categoryResult = await getIncomeCategory();
        console.log(categoryResult);
        const categoryMap = categoryResult.reduce((acc, category) => {
          acc[category.id] = category.name;
          return acc;
        }, {});
        const mappedIncomes = incomeResult.map(income => ({
          ...income,
          category_name: categoryMap[income.income_categories_id], // Add category name to each expense
        }));

        setIncomes(mappedIncomes);
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

  const uniqueDates = [...new Set(incomes.map(item => item.date))];

  return (
    <ScrollView style={styles.container}>
      <View>
        {incomes.length === 0 ? (
          <Text>No Incomes</Text>
        ) : (
          uniqueDates.map(date => (
            <View key={date}>
              <Text style={styles.dateValue}>{date}</Text>
              {incomes
                .filter(item => item.date === date)
                .map(item => (
                  <View key={item.id} style={styles.expenseItem}>
                    <View style={styles.expenseItemColumn}>
                      <Text>{item.category_name || 'Unknown Category'}</Text>
                    </View>
                    <View style={styles.expenseItemColumn}>
                      <Text>{item.description}</Text>
                    </View>
                    <View
                      style={[
                        styles.expenseItemColumn,
                        {alignItems: 'flex-end'},
                      ]}>
                      {/* <Text>${item.amount}</Text> */}
                      <Text>
                        {item.amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9DB',
    width: '100%',
  },
  dateValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FBEB9B',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
  expenseItemColumn: {
    flex: 1,
    marginRight: 10,
  },
});
