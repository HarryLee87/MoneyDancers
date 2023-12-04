
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Picker} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PieChart from 'react-native-pie-chart';
import {DropDown} from 'react-native-element-dropdown';
import {
  getTotalExpensesForEachCategory,
  getTotalIncomeForEachCategory,
} from '../services/GetAccountDataQueries';

const Stack = createNativeStackNavigator();

const ChartScreen = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [expenseByCategory, setExpenseByCategory] = useState([]);
  const [incomeByCategory, setIncomeByCategory] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('January'); // Default month


  const [activeButton, setActiveButton] = useState("Expense");

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === "Income") {
      navigation.navigate("ChartScreenIncome");
    }    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesData = await getTotalExpensesForEachCategory();
        const incomesData = await getTotalIncomeForEachCategory();

        setExpenseByCategory(expensesData);
        setIncomeByCategory(incomesData);

        // Calculate total expenses
      const totalExpenseAmount = expensesData.reduce((total, category) => total + category.totalExpenses, 0);
      setTotalExpense(totalExpenseAmount);

      // Calculate total income
      const totalIncomeAmount = incomesData.reduce((total, category) => total + category.totalIncome, 0);
      setTotalIncome(totalIncomeAmount);

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

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return `#${'00000'.substring(0, 6 - c.length)}${c}`;
  
  };

  const data = expenseByCategory.map((item, index) => ({
    name: item.name,
    value: item.totalExpenses,
    color: stringToColor(item.name),
  }));

  const series = data.map((item) => item.value);
  const sliceColor = data.map((item) => item.color);

  const monthOptions = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
  ];

  return (    
    <View style={styles.container}>
      <View style={styles.chartHeader}>
          <View style={{ ...styles.monthHeader, marginBottom: 10 }}>
            <Text style={styles.monthTitle}>January 2023</Text>  
            {/* <DropDown
            data={monthOptions}
            value={selectedMonth}
            onChange={(value) => setSelectedMonth(value)}
          /> */}
          </View>
          <View style={styles.incomeExpenseContainer}>
            <View style={styles.totalHeader}>
              <Text style={styles.totalTitle}>Expense</Text>
              <Text style={{ ...styles.totalExpenseValue, padding: 10 }}>${totalExpense.toFixed(2)}</Text>
            </View>
            <View style={styles.totalHeader}>
              <Text style={styles.totalTitle}>Income</Text>
              <Text style={{ ...styles.totalIncomeValue, padding: 10 }}>${totalIncome.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.horizontalLine} />
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
          
            <View style={{ ...styles.container, flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 130, marginBottom: 130 }}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              doughnut={true}
              coverRadius={0.4}
              coverFill={'#FFF9DB'}
            />
          </View>

          <ScrollView >
          <View style={{ flexDirection: 'column', marginTop: 30, marginBottom: 20, marginLeft: 15, flexWrap: 'wrap', alignSelf: 'flex-start' }}>
          
            {expenseByCategory
              .slice()
              .sort((a, b) => ((b.totalExpenses / totalExpense) * 100) - ((a.totalExpenses / totalExpense) * 100))              
              .map(category => (                            
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: stringToColor(category.name), marginBottom: 2, borderRadius: 10 }}>
                <View
                  key={category.expense_categories_id}
                  style={{width: 250, padding: 10, justifyContent: 'center'}}>
                    <Text style={{ color: '#000', fontSize: 16 }}>{(((category.totalExpenses) / totalExpense ) * 100).toFixed(0)}% {category.name}</Text>                  
                  </View>
                  <View>
                    <Text style={{ color: '#000', fontSize: 16 }}>
                      ${category.totalExpenses.toFixed(2)}
                    </Text>
                  </View>
                </View>                    

            ))}   
            </View>         
          </ScrollView> 
          
        </View>
      </View>   
  );
};

const ChartScreenIncome = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [expenseByCategory, setExpenseByCategory] = useState([]);
  const [incomeByCategory, setIncomeByCategory] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const [activeButton, setActiveButton] = useState("Income");

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === "Expense") {
      navigation.navigate("ChartScreen");
    }    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesData = await getTotalExpensesForEachCategory();
        const incomesData = await getTotalIncomeForEachCategory();

        setExpenseByCategory(expensesData);
        setIncomeByCategory(incomesData);

        // Calculate total expenses
      const totalExpenseAmount = expensesData.reduce((total, category) => total + category.totalExpenses, 0);
      setTotalExpense(totalExpenseAmount);

      // Calculate total income
      const totalIncomeAmount = incomesData.reduce((total, category) => total + category.totalIncome, 0);
      setTotalIncome(totalIncomeAmount);

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

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return `#${'00000'.substring(0, 6 - c.length)}${c}`;
  };

  const data = incomeByCategory.map((item, index) => ({
    name: item.name,
    value: item.totalIncome,
    color: stringToColor(item.name),
  }));

  const series = data.map(item => item.value);
  const sliceColor = data.map(item => item.color);
     
  return (
    <View style={styles.container}>
    <View style={styles.chartHeader}>
        <View style={{ ...styles.monthHeader, marginBottom: 10 }}>
          <Text style={styles.monthTitle}>January 2023</Text>  
        </View>
        <View style={styles.incomeExpenseContainer}>
          <View style={styles.totalHeader}>
            <Text style={styles.totalTitle}>Expense</Text>
            <Text style={{ ...styles.totalExpenseValue, padding: 10 }}>${totalExpense.toFixed(2)}</Text>
          </View>
          <View style={styles.totalHeader}>
            <Text style={styles.totalTitle}>Income</Text>
            <Text style={{ ...styles.totalIncomeValue, padding: 10 }}>${totalIncome.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
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
        
          <View style={{ ...styles.container, flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 130, marginBottom: 130 }}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.4}
            coverFill={'#FFF9DB'}
          />
        </View>

        <ScrollView >
        <View style={{ flexDirection: 'column', marginTop: 30, marginBottom: 20, marginLeft: 15, flexWrap: 'wrap', alignSelf: 'flex-start' }}>
          {incomeByCategory
            .slice()
            .sort((a, b) => ((b.totalIncome / totalIncome) * 100) - ((a.totalIncome/ totalIncome) * 100))              
            .map(category => (                            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: stringToColor(category.name), marginBottom: 2, borderRadius: 10 }}>
              <View
                key={category.expense_categories_id}
                style={{width: 250, padding: 10, justifyContent: 'center'}}>
                  <Text style={{ color: '#000', fontSize: 16 }}>{(((category.totalIncome) / totalIncome ) * 100).toFixed(0)}% {category.name}</Text>                  
                </View>
                <View>
                  <Text style={{ color: '#000', fontSize: 16 }}>
                    ${category.totalIncome.toFixed(2)}
                  </Text>
                </View>
              </View>         

          ))}
          
          </View>
        </ScrollView>    
      

      </View>
    </View>
    );
};

// Create a Stack.Navigator for navigation
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChartScreen" component={ChartScreen} options={{headerShown: false}} />
      <Stack.Screen name="ChartScreenIncome" component={ChartScreenIncome} options={{headerShown: false}}/>
    </Stack.Navigator>
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
    fontSize: 26,
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
  
    });

// export default ChartScreen;
export default StackNavigator;