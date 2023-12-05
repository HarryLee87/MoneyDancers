import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import PieChart from 'react-native-pie-chart';

const ChartCompo = ({isLoading, data, getData, percentageKey, valueKey}) => {
  console.log('data for chart', data);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await getData();
        setChartData(chartData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data, getData]);

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

  const generateChartData = data =>
    data.map(category => ({
      name: category.name,
      value: category[valueKey],
      color: stringToColor(category.name),
    }));

  return (
    <View style={styles.container}>
      {/* <View
        style={{
          ...styles.container,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 130,
          marginBottom: 130,
        }}> */}
      <View style={styles.chartContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={generateChartData(chartData).map(item => item.value)}
          sliceColor={generateChartData(chartData).map(item => item.color)}
          doughnut={true}
          coverRadius={0.4}
          coverFill={'#FFF9DB'}
        />
      </View>

      <ScrollView>
        <View style={styles.scrollContainer}>
          {chartData.map(category => (
            <View
              key={category.id}
              style={[
                styles.expenseItem,
                {backgroundColor: stringToColor(category.name)},
              ]}>
              <View key={category.name} style={styles.expenseItemColumn}>
                <Text style={styles.text_in_row}>
                  {category[percentageKey]}%
                </Text>
              </View>
              <View style={styles.expenseItemColumn}>
                <Text style={styles.text_in_row}>{category.name}</Text>
              </View>
              <View
                style={[styles.expenseItemColumn, {alignItems: 'flex-end'}]}>
                <Text style={styles.text_in_row}>
                  {category[valueKey].toLocaleString('en-US', {
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9DB',
  },
  chartContainer: {
    position: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  scrollContainer: {
    // flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 15,
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
  },
  scroll_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 2,
    borderRadius: 10,
  },
  text_in_row: {
    color: '#000',
    fontSize: 16,
  },
  itemColumn: {
    flex: 1,
    marginRight: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FBEB9B',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },
  expenseItemColumn: {
    flex: 1,
    marginRight: 10,
  },
});

export default ChartCompo;
