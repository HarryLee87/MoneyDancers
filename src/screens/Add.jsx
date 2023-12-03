import React, {useState} from 'react';
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

// for dropdown list data
const AccountData = [
  {label: 'Cash', value: 'Cash'},
  {label: 'Debit', value: 'Debit'},
  {label: 'Saving', value: 'Saving'},
  {label: 'Credit Card', value: 'Credit Card'},
  {label: 'Others', value: 'Others'},
];
const ExpenseCatoData = [
  {label: 'Drinks', value: 'Drinks'},
  {label: 'Food', value: 'Food'},
  {label: 'Groceries', value: 'Groceries'},
  {label: 'Housing', value: 'Housing'},
  {label: 'Insurance', value: 'Insurance'},
  {label: 'Utilities', value: 'Utilities'},
  {label: 'Others', value: 'Others'},
];

const IncomeCatoData = [
  {label: 'Salary', value: 'Salary'},
  {label: 'Investing', value: 'Investing'},
  {label: 'Others', value: 'Others'},
];

export default function AddScreen() {
  //default value
  const [year, setYear] = React.useState(new Date().getFullYear().toString());
  const [month, setMonth] = React.useState(
    (new Date().getMonth() + 1).toString(),
  );
  const [day, setDay] = React.useState(new Date().getDate().toString());
  const [dateShow, setDateShow] = React.useState(false);
  const [account, setAccount] = React.useState(null);
  const [typeBtnSelected, setTypeBtnSelected] = React.useState('Expense');
  const [category, setCategory] = React.useState(null);
  const [amount, setAmount] = React.useState(0);
  const [note, setNote] = React.useState(null);
  // for testing display result
  const [displayCondition, setDisplayCondition] = React.useState(false);
  const [transaction, setTransaction] = React.useState(null);
  //----
  const [isFocus, setIsFocus] = useState(false);

  // handle change
  const handleDateChange = (e, selectedDate) => {
    setDateShow(false);
    setYear(selectedDate.getFullYear().toString());
    setMonth((selectedDate.getMonth() + 1).toString());
    setDay(selectedDate.getDate().toString());
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
    setAmount(parseInt(e) || 0);
    // setAmount(e.target.value);
  };

  const handleNoteChange = text => {
    setNote(text);
  };

  const handleSubmitted = () => {
    if (account === '' || category === '' || amount === 0) {
      alert('Please fill in all required fields');
      return;
    }

    //for testing display result
    setDisplayCondition(true);
    //----

    const transaction = {
      year: year,
      month: month,
      day: day,
      account: account.value,
      type: typeBtnSelected,
      category: category.value,
      amount: amount,
      note: note,
    };
    setTransaction(transaction);

    // reset to default
    setYear(new Date().getFullYear().toString());
    setMonth((new Date().getMonth() + 1).toString());
    setDay(new Date().getDate().toString());
    setAccount(null);
    setTypeBtnSelected('Expense');
    setCategory(null);
    setAmount(0);
    setNote(null);

    return transaction;
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
            data={AccountData}
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
                data={ExpenseCatoData}
                value={category}
                onChange={handleCategoryChange}
              />
            ) : (
              <Dropdown
                style={styles.dropdownList}
                labelField="label"
                valueField="value"
                data={IncomeCatoData}
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
            placeholder="0"
            value={amount.toString()}
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

        {/* Display testing*/}
        {transaction && displayCondition ? (
          <View>
            <Text>Added Result</Text>
            <Text>
              Date:{' '}
              {transaction.year +
                '/' +
                transaction.month +
                '/' +
                transaction.day}
            </Text>
            <Text>Account: {transaction.account}</Text>
            <Text>Type: {transaction.type}</Text>
            <Text>Category: {transaction.category}</Text>
            <Text>Amount: {transaction.amount}</Text>
            <Text>Note: {transaction.note}</Text>
            <Button
              title="clear"
              onPress={() => {
                setTransaction(null);
                setDisplayCondition(false);
              }}
            />
          </View>
        ) : null}
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
    marginTop: 20,
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
    backgroundColor: '#f2f1a5',
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
