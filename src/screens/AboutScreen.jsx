import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>Team Name</Text>
        <Text style={styles.content}>App Dancer</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.title}>App Name</Text>
        <Text style={styles.content}>Money Dancer</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.title}>Team Members</Text>
        <Text style={styles.content}>Tze-Chi Chan</Text>
        <Text style={styles.content}>Jiyeon Heo</Text>
        <Text style={styles.content}>Haewon Lee</Text>
        <Text style={styles.content}>Parinthon Songsana</Text>
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version: 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9DB',
    padding: 20,
  },
  item: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
  versionContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  versionText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default AboutScreen;
