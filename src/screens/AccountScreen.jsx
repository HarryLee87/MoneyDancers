import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import * as Progress from 'react-native-progress';

const AccountScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.summaryContainer}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryTitle}>Assets</Text>
                    <Text style={styles.assetsValue}>$4,400</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryTitle}>Liabilities</Text>
                    <Text style={styles.liabilitiesValue}>$1,150</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryTitle}>Total</Text>
                    <Text style={styles.totalValue}>$3,250</Text>
                </View>
            </View>
             {/* Budget Progress Bar */}
            <View style={styles.budgetContainer}>
            <Text style={styles.budgetTitle}>My Budget</Text>
            <Progress.Bar progress={0.75} width={null} color="#BF4342" height={30} style={styles.progressBar} />
            <Text style={styles.budgetPercentage}>75%</Text>
        </View>

            {/* Account Details */}
            <View style={styles.accountContainer}>
                <Text style={styles.accountTitle}>My Account</Text>
                {/* Cash */}
                <View style={styles.accountItem}>
                    <Text style={styles.accountType}>Cash</Text>
                    <Text style={styles.accountValue}>$200</Text>
                </View>
                {/* Debit */}
                <View style={styles.accountItem}>
                    <Text style={styles.accountType}>Debit</Text>
                    <Text style={styles.accountValue}>$200</Text>
                </View>
                {/* Chequing */}
                <View style={styles.accountItem}>
                    <Text style={styles.accountType}>Chequing</Text>
                    <Text style={styles.accountValue}>$200</Text>
                </View>
                {/* Savings */}
                <View style={styles.accountItem}>
                    <Text style={styles.accountType}>Saving</Text>
                    <Text style={styles.accountValue}>$200</Text>
                </View>
                {/* Credit Cards */}
                <View style={styles.accountItem}>
                    <Text style={styles.accountType}>Credit Cards</Text>
                    <Text style={styles.accountValueRed}>$1,000</Text>
                </View>
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF9DB',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#FBEB9B',
        height: 70,
    },
    summaryItem: {
        alignItems: 'center',
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    assetsValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },
    liabilitiesValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    budgetContainer: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    budgetTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    progressBar: {
        height: 30,
        width: '100%',
        backgroundColor: '#6A994E',
        borderRadius: 5,
    },
    budgetPercentage: {
        fontSize: 18,
        color: '#000',
        position: 'absolute',
        right: '5%',
        top: '15%',
    },
    accountContainer: {
        paddingHorizontal: 20,
    },
    accountTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    accountItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FBEB9B',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    accountType: {
        fontSize: 18,
        color: '#000',
    },
    accountValue: {
        fontSize: 18,
        color: '#457D43',
    },
    accountValueRed: {
        fontSize: 18,
        color: '#FF5555',
    },
});

export default AccountScreen;