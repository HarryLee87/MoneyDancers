import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, Button, TextInput} from 'react-native';
import { setBudget } from '../services/GetAccountDataQueries';

const SetBudget = ({visible, onClose, onSave, initialBudget}) => {
  const [budget, setBudgetState] = useState(initialBudget);

  useEffect(() => {
    setBudgetState(initialBudget);
  }, [initialBudget]);

  const handleSave = async () => {
    try {
      await setBudget(budget);
      onSave(budget);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Set Budget</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter budget amount"
            keyboardType="numeric"
            value={budget.toString()}
            onChangeText={(text) => {
                const newBudget = text === '' ? 0 : parseFloat(text);
                if (!isNaN(newBudget)) {
                  setBudgetState(newBudget);
                }
              }}
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} style={styles.button} />
            <Button title="Cancel" onPress={onClose} style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default SetBudget;
