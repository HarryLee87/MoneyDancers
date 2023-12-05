import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import PieChart from 'react-native-pie-chart';
import {getTotalExpensesForEachCategory} from '../services/GetAccountDataQueries';

export default function ChartExpense() {
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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const widthAndHeight = 250;

  const stringToColor = str => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return `#${'00000'.substring(0, 6 - c.length)}${c}`;
  };

  const chartData = expenseByCategory.map((category, str) => ({
    name: category.name,
    value: category.totalExpenses,
    color: stringToColor(category.name),
  }));

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.container,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 130,
          marginBottom: 130,
        }}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={chartData.map(item => item.value)}
          sliceColor={chartData.map(item => item.color)}
          doughnut={true}
          coverRadius={0.4}
          coverFill={'#FFF9DB'}
        />
      </View>

      <ScrollView>
        <View style={styles.scrollContainer}>
          {expenseByCategory.map((category, index) => (
            <View
              key={category.id}
              style={[
                styles.scroll_row,
                {backgroundColor: stringToColor(category.name)},
              ]}>
              <View
                key={category.name}
                style={{width: 250, padding: 10, justifyContent: 'center'}}>
                <Text style={styles.text_in_row}>
                  {category.expensePercentage}% {category.name}
                </Text>
              </View>
              <View>
                <Text style={styles.text_in_row}>
                  {category.totalExpenses.toLocaleString('en-US', {
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9DB',
  },
  scrollContainer: {
    //using
    flexDirection: 'column',
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 15,
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
  },
  scroll_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    borderRadius: 10,
  },
  text_in_row: {
    color: '#000',
    fontSize: 16,
  },
});
