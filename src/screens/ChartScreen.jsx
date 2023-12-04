
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PieChart from 'react-native-pie-chart';
import ChartScreenIncome from './ChartScreenIncome';

const Stack = createNativeStackNavigator();

const ChartScreen = ({ navigation }) => {
  const widthAndHeight = 250;
  const data = [
    { name: 'Housing', value: 32, color: '#9EC1CF', amount: '$372.16' },
    { name: 'Grocery', value: 19, color: '#9EE09E', amount: '$220.97' },
    { name: 'Restaurant', value: 17, color: '#A0C4FF', amount: '$197.71' },
    { name: 'Transportation', value: 12, color: '#BDB2FF', amount: '$139.55' },
    { name: 'Insurance', value: 10, color: '#FDFD97', amount: '$116.00' },
    { name: 'Medical', value: 5, color: '#FEB144', amount: '$58.15' },
    { name: 'Others', value: 3, color: '#FF6663', amount: '$34.89' },
    { name: 'Utilities', value: 2, color: '#FFC6FF', amount: '$23.26' },
  ];

  const series = data.map(item => item.value);
  const sliceColor = data.map(item => item.color);

  const [activeButton, setActiveButton] = useState("Expense");

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === "Income") {
      navigation.navigate("ChartScreenIncome");
    }    
  };

  return (
    <Stack.Navigator initialRouteName="ChartScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChartScreen" component={() => (
        <View style={styles.container}>
          <View style={styles.chartHeader}>
            <View style={{ ...styles.monthHeader, marginBottom: 10 }}>
              <Text style={styles.monthTitle}>January 2023</Text>
            </View>
            <View style={styles.incomeExpenseContainer}>
              <View style={styles.totalHeader}>
                <Text style={styles.totalTitle}>Expense</Text>
                <Text style={{ ...styles.totalExpenseValue, padding: 10 }}>$-1,163.14</Text>
              </View>
              <View style={styles.totalHeader}>
                <Text style={styles.totalTitle}>Income</Text>
                <Text style={{ ...styles.totalIncomeValue, padding: 10 }}>$+3,424.93</Text>
              </View>
            </View>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.transaction}>
            <Text style={{ ...styles.title, alignSelf: 'flex-start', marginLeft: 10, marginBottom: 20, color: '#000' }}>Transactions</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, activeButton === "Expense" && styles.activeButtonExpense]}
                onPress={() => handleButtonClick("Expense")}
              >
                <Text style={styles.buttonText}>Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, activeButton === "Income" && styles.activeButtonIncome]}
                onPress={() => handleButtonClick("Income")}
              >
                <Text style={styles.buttonText}>Income</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ ...styles.container, flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              doughnut={true}
              coverRadius={0.4}
              coverFill={'#FFF9DB'}
            />
          </View>
          <ScrollView style={styles.scrollContainer}>
          <View style={{ flexDirection: 'column', marginTop: 30, marginBottom: 20, marginLeft: 50, flexWrap: 'wrap', alignSelf: 'flex-start' }}>
            {data.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: item.color, padding: 10, marginBottom: 2, borderRadius: 15 }}>
                <View style={{ width: 250, justifyContent: 'center' }}>
                  <Text style={{ color: '#000', fontSize: 16 }}>
                    {`${item.value}% ${item.name}`}
                  </Text>
                </View>
                <Text style={{ color: '#000', fontSize: 16 }}>
                  {item.amount}
                </Text>
              </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )} />
      <Stack.Screen name="ChartScreenIncome" component={ChartScreenIncome} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#FFF9DB',
      },
      chartHeader: {
        position: 'fixed',
        top: 0,
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 20,
      },
      monthHeader: {
        alignItems: 'center',
        //justifyContent: 'center',
      },
      monthTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
      },
      incomeExpenseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //width: '60%',
      },
      totalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      totalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
      },
      totalExpenseValue: {
        fontSize: 18,
        color: '#FF5555',
      },
      totalIncomeValue: {
        fontSize: 18,
        color: '#457D43',
      },
    
      horizontalLine: {
        borderBottomColor: '#F3B391', 
        borderBottomWidth: 1,        
        marginVertical: 15,          
         
      },
      transaction: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //marginTop: 20,
      },
      title: {
        fontSize: 25,
        fontWeight: 'bold',
        //alignSelf: 'center',
        marginVertical: 10,
      },
    
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      },
      button: {
        backgroundColor: '#FBEB9B', 
        // paddingVertical: 8,
        // paddingHorizontal: 20,
        marginHorizontal: 3,
        padding: 10,
        borderRadius: 5,
      },
      
      activeButtonExpense: {
        backgroundColor: '#F3B391', 
      },
      activeButtonIncome: {
        backgroundColor: '#ADC989', 
      },
      buttonText: {
        color: '#000', 
        fontSize: 16,
      },
      
        scrollContainer: {
            flex: 1,
            //backgroundColor: '#FFF9DB',
            //justifyContent: "flex-start",
            //alignItems: 'center',
        }
});

export default ChartScreen;

