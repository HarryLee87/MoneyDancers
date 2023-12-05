import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountScreen from '../screens/AccountScreen';
import TransactionScreen from '../screens/TransactionScreen';
import AddScreen from '../screens/AddScreen';
import ChartScreen from '../screens/ChartScreen';
import AboutScreen from '../screens/AboutScreen';
import {Image, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

const accountActiveIcon = require('../img/account-active.png');
const accountInactiveIcon = require('../img/account-inactive.png');
const transactionActiveIcon = require('../img/transaction-active.png');
const transactionInactiveIcon = require('../img/transaction-inactive.png');
const addActiveIcon = require('../img/add-active.png');
const addInactiveIcon = require('../img/add-inactive.png');
const chartActiveIcon = require('../img/chart-active.png');
const chartInactiveIcon = require('../img/chart-inactive.png');
const settingActiveIcon = require('../img/setting-active.png');
const settingInactiveIcon = require('../img/setting-inactive.png');

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Account') {
            iconName = focused ? accountActiveIcon : accountInactiveIcon;
          } else if (route.name === 'Transaction') {
            iconName = focused
              ? transactionActiveIcon
              : transactionInactiveIcon;
          } else if (route.name === 'Add') {
            iconName = focused ? addActiveIcon : addInactiveIcon;
          } else if (route.name === 'Chart') {
            iconName = focused ? chartActiveIcon : chartInactiveIcon;
          } else if (route.name === 'About') {
            iconName = focused ? settingActiveIcon : settingInactiveIcon;
          }
          return <Image source={iconName} style={{width: 30, height: 30}} />;
        },
        tabBarStyle: {
          backgroundColor: '#F3B391',
        },
        headerStyle: {
          backgroundColor: '#FFF9DB',
        },
      })}>
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Transaction" component={TransactionScreen} />
      {/* <Tab.Screen name="Create" component={HomeScreen} options={{ tabBarLabel: '' }} /> */}
      {/* <Tab.Screen
        name="Chart"
        component={ChartScreen}
        options={{headerShown: false}}
      /> */}
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Chart" component={ChartScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
};

export default Navigation;
