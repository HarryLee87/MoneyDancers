import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountScreen from '../screens/AccountScreen';
import TransactionScreen from '../screens/TransactionScreen';
import ChartScreen from '../screens/ChartScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Transaction" component={TransactionScreen} />
      {/* <Tab.Screen name="Create" component={HomeScreen} options={{ tabBarLabel: '' }} /> */}
      <Tab.Screen name="Chart" component={ChartScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default Navigation;
