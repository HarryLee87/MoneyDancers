import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import MainLayout from './layouts/MainLayout';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigation from './components/Navigation';
import CreateTables from './database/CreateTables';
import InputCategories from './database/InputCategories';
import TestInputQueries from './database/TestInputQueries';
import DeleteData from './database/DeleteData';

function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    // DeleteData();
    CreateTables();
    InputCategories(); // input init data to categories tables
    TestInputQueries(); // input init data to incomes, expenses tables
  }, []);

  return (
    <MainLayout>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </SafeAreaView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({});

export default App;
