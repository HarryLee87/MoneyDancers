import React from 'react';
import MainLayout from '../layouts/MainLayout';
import {SafeAreaView} from 'react-native-safe-area-context';
import AccountScreen from './AccountScreen';
import {ScrollView} from 'react-native-gesture-handler';

const HomeScreen = () => {
  return (
    <MainLayout>
      <SafeAreaView>
        <ScrollView>
          <AccountScreen />
        </ScrollView>
      </SafeAreaView>
    </MainLayout>
  );
};

export default HomeScreen;
