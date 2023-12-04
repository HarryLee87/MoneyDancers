import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import TransactionExpense from '../components/TransactionExpense';

const TransactionScreen = () => {
  const [reload, setReload] = React.useState(false);

  const handleReload = () => {
    setReload(preState => !preState);
  };

  return (
    <View style={styles.container}>
      <Button title="Reload" onPress={handleReload} />
      <TransactionExpense key={reload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default TransactionScreen;
