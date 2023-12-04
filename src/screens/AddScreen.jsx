import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import {
  getAccountCategoryId,
  getAccountListData,
  getExpenseCategoryId,
  getExpenseListData,
  getIncomeCategoryId,
  getIncomeListData,
} from '../services/GetAddRequiredDataQueries';
import {
  insertExpenseTransaction,
  insertIncomeTransaction,
} from '../services/InsertAddTransactionQueries';

export default function AddScreen() {
  //default value
  const [year, setYear] = React.useState(new Date().getFullYear().toString());
  const [month, setMonth] = React.useState(
    (new Date().getMonth() + 1).toString().padStart(2, '0'),
  );
  const [day, setDay] = React.useState(
    new Date().getDate().toString().padStart(2, '0'),
  );
  const [date, setDate] = React.useState('');
  const [dateShow, setDateShow] = React.useState(false);
  const [account, setAccount] = React.useState('');
  const [typeBtnSelected, setTypeBtnSelected] = React.useState('Expense');
  const [category, setCategory] = React.useState(null);
  const [amount, setAmount] = React.useState();
  const [note, setNote] = React.useState(null);
  const [newTransaction, setNewTransaction] = React.useState(null);
  const navigation = useNavigation();

  // for dropdown list data
  const [AccountListData, setAccountListData] = useState([]);
  const [ExpenseListData, setExpenseListData] = useState([]);
  const [IncomeListData, setIncomeListData] = useState([]);
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const accData = await getAccountListData();
        const expData = await getExpenseListData();
        const incData = await getIncomeListData();
        setAccountListData(accData);
        setExpenseListData(expData);
        setIncomeListData(incData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccountData();
  }, []);

  // handle change
  const handleDateChange = (e, selectedDate) => {
    setDateShow(false);
    setYear(selectedDate.getFullYear().toString());
    setMonth((selectedDate.getMonth() + 1).toString().padStart(2, '0'));
    setDay(selectedDate.getDate().toString().padStart(2, '0'));
  };

  const handleAccountChange = e => {
    setAccount(e);
  };

  const handleTypeChange = text => {
    setTypeBtnSelected(text);
  };

  const handleCategoryChange = e => {
    setCategory(e);
  };
  const handleAmountChange = e => {
    if (/^\d*\.?\d{0,2}$/.test(e)) {
      setAmount(e);
    }
  };

  const handleNoteChange = text => {
    setNote(text);
  };

  const handleSubmitted = async () => {
    try {
      if (account === '' || category === '' || amount === 0) {
        alert('Please fill in all required fields');
        return;
      } else {
        const accountId = await getAccountCategoryId({name: account.label});

        const dateString = year + '-' + month + '-' + day;
        setDate(dateString);

        const newTransaction = {
          // year: year,
          // month: month,
          // day: day,
          date: dateString,
          account: account.label,
          type: typeBtnSelected,
          category: category.value,
          amount: amount,
          note: note,
        };
        setNewTransaction(newTransaction);

        if (newTransaction && newTransaction.type === 'Expense') {
          const expenseId = await getExpenseCategoryId({name: category.label});
          const expenseQuery = [
            newTransaction.date,
            newTransaction.amount,
            newTransaction.note,
            accountId,
            expenseId,
          ];
          insertExpenseTransaction({expenseQuery});
        } else if (newTransaction && newTransaction.type === 'Income') {
          const incomeId = await getIncomeCategoryId({name: category.label});
          const incomeQuery = [
            newTransaction.date,
            newTransaction.amount,
            newTransaction.note,
            accountId,
            incomeId,
          ];
          insertIncomeTransaction({incomeQuery});
        }

        navigation.navigate('Transaction');

        // reset to default
        setYear(new Date().getFullYear().toString());
        setMonth((new Date().getMonth() + 1).toString().padStart(2, '0'));
        setDay(new Date().getDate().toString().padStart(2, '0'));
        setAccount(null);
        setTypeBtnSelected('Expense');
        setCategory(null);
        setAmount();
        setNote(null);

        return newTransaction;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.text}>Date: </Text>
          <View style={styles.dateView}>
            <Text style={styles.dateText}>
              {year}-{month}-{day}
            </Text>
            <TouchableOpacity>
              <Text
                style={styles.datePickerBtn}
                onPress={() => {
                  setDateShow(true);
                }}>
                Change
              </Text>
            </TouchableOpacity>
            {dateShow && (
              <DateTimePicker
                value={new Date(year, month - 1, day)}
                mode="date"
                display="calendar"
                onChange={handleDateChange}
              />
            )}
          </View>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>Account: </Text>
          <Dropdown
            style={styles.dropdownList}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            data={AccountListData}
            value={account}
            onChange={handleAccountChange}
          />
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>Type: </Text>
          <View style={styles.typeBtnView}>
            <TouchableOpacity>
              <Text
                style={[
                  styles.typeBtn,
                  typeBtnSelected === 'Expense'
                    ? {backgroundColor: '#363635', color: 'white'}
                    : {backgroundColor: 'lightgray', color: 'black'},
                ]}
                onPress={() => handleTypeChange('Expense')}>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={[
                  styles.typeBtn,
                  typeBtnSelected === 'Income'
                    ? {backgroundColor: '#363635', color: 'white'}
                    : {backgroundColor: 'lightgray', color: 'black'},
                ]}
                onPress={() => handleTypeChange('Income')}>
                Income
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>Category: </Text>
          <View style={{width: 200}}>
            {typeBtnSelected === 'Expense' ? (
              <Dropdown
                style={styles.dropdownList}
                labelField="label"
                valueField="value"
                data={ExpenseListData}
                value={category}
                onChange={handleCategoryChange}
              />
            ) : (
              <Dropdown
                style={styles.dropdownList}
                labelField="label"
                valueField="value"
                data={IncomeListData}
                value={category}
                onChange={handleCategoryChange}
              />
            )}
          </View>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>Amount: </Text>
          <TextInput
            style={styles.input}
            placeholder="Please enter amount"
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>Note: </Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Note"
            value={note}
            multiline={true}
            onChangeText={handleNoteChange}
          />
        </View>
        <View style={{width: 100, margin: 20}}>
          <Button
            title="Add"
            onPress={() => {
              handleSubmitted();
            }}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#FFF9DB',
  },

  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text: {
    width: 75,
    textAlign: 'right',
    marginRight: 10,
    fontSize: 15,
  },

  input: {
    height: 30,
    width: 200,
    margin: 5,
    padding: 3,
    borderWidth: 1,
    borderRadius: 5,
  },

  dateText: {
    height: 30,
    width: 140,
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  datePickerBtn: {
    backgroundColor: 'yellow',
    color: 'black',
    padding: 4,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
  },

  dateInput: {
    height: 30,
    width: 60,
    margin: 5,
    padding: 3,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },

  typeBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },

  typeBtn: {
    color: 'black',
    padding: 4,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
  },

  dropdownList: {
    height: 30,
    width: 200,
    marginVertical: 6,
    padding: 3,
    borderWidth: 1,
    borderRadius: 5,
  },

  noteInput: {
    height: 60,
    width: 200,
    margin: 5,
    padding: 3,
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
});
