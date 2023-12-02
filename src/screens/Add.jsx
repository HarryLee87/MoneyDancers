import {isExists, set} from 'date-fns';
import React, {useEffect} from 'react';
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
// import {Picker} from '@react-native-picker/picker';
// import RNPickerSelect from 'react-native-picker-select';

export default function AddScreen() {
  //default value
  const [year, setYear] = React.useState(new Date().getFullYear().toString());
  const [month, setMonth] = React.useState(
    (new Date().getMonth() + 1).toString(),
  );
  const [day, setDay] = React.useState(new Date().getDate().toString());
  const [account, setAccount] = React.useState('');
  const [typeBtnSelected, setTypeBtnSelected] = React.useState('Expense');
  const [category, setCategory] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [note, setNote] = React.useState('');
  // for testing display result
  const [displayCondition, setDisplayCondition] = React.useState(false);
  const [transaction, setTransaction] = React.useState(null);

  // handle change
  const handleYearChange = e => {
    setYear(parseInt(e));
  };

  const handleMonthChange = e => {
    setMonth(e.target.value);
  };

  const handleDayChange = e => {
    setDay(e.target.value);
  };

  const handleAccountChange = text => {
    setAccount(text);
  };

  const handleTypeChange = text => {
    setTypeBtnSelected(text);
  };

  const handleCategoryChange = text => {
    setCategory(text);
  };

  const handleAmountChange = e => {
    setAmount(parseInt(e) || 0);
    // setAmount(e.target.value);
  };

  const handleNoteChange = text => {
    setNote(text);
  };

  // console.log(year, month, day);

  const handleSubmitted = () => {
    if (account === '' || category === '' || amount === 0) {
      alert('Please fill in all required fields');
      return;
    }
    setDisplayCondition(true);

    const transaction = {
      // date: set(new Date(), {
      //   year: year,
      //   month: month,
      //   day: day,
      // }),
      year: year,
      month: month,
      day: day,
      account: account,
      type: typeBtnSelected,
      category: category,
      amount: amount,
      note: note,
    };
    setTransaction(transaction);

    // reset to default
    setYear(new Date().getFullYear().toString());
    setMonth((new Date().getMonth() + 1).toString());
    setDay(new Date().getDate().toString());
    setAccount('');
    setTypeBtnSelected('Expense');
    setCategory('');
    setAmount(0);
    setNote('');

    return transaction;
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.text}>Date: </Text>
          {/* will change to date picker */}
          <View style={styles.dateView}>
            <TextInput
              style={styles.dateInput}
              placeholder="Year"
              value={year}
              onChangeText={handleYearChange}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.dateInput}
              placeholder="Month"
              value={month}
              onChangeText={handleMonthChange}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.dateInput}
              placeholder="Day"
              value={day}
              onChangeText={handleDayChange}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}>Account: </Text>
          {/* will change to drop down list to choose account */}
          <TextInput
            style={styles.input}
            placeholder="Select an account"
            value={account}
            onChangeText={handleAccountChange}
          />
        </View>
        <View style={styles.view}>
          {/* For choosing income or expense */}
          <Text style={styles.text}>Type: </Text>
          <View style={styles.typeBtnView}>
            <TouchableOpacity>
              <Text
                style={styles.typeBtn}
                onPress={() => handleTypeChange('Expense')}>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={styles.typeBtn}
                onPress={() => handleTypeChange('Income')}>
                Income
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.view}>
          {/* will change to drop down list to choose account */}
          <Text style={styles.text}>Category: </Text>
          <TextInput
            style={styles.input}
            placeholder="Select a category"
            value={category}
            onChangeText={handleCategoryChange}
          />
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
            style={styles.input}
            placeholder="Note"
            value={note}
            onChangeText={handleNoteChange}
          />
        </View>
        <View style={{width: 100, margin: 20}}>
          <Button
            title="Add"
            onPress={() => {
              // setAmount(0);
              // setDay(day);
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
    backgroundColor: 'gray',
    color: 'white',
    padding: 4,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
  },
});
