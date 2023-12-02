import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import MainLayout from './layouts/MainLayout';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './components/Navigation';

function App() {

  const Stack = createNativeStackNavigator();

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Navigation />          
        </NavigationContainer>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
