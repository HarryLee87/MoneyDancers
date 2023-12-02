import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChartScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Chart Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
    }
});

export default ChartScreen;