import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const Mybutton = ({
  label = '',
  labelColor = 'black',
  backgroundColor,
  borderColor,
  rounded = true,
  onPressHandler,
  raised = false,
  customStyle,
}) => {
  return (
    <View>
      <Pressable onPress={onPressHandler} style={styles.button}>
        <View
          style={[
            styles.buttonContainer,
            rounded ? styles.rounded : '',
            backgroundColor
              ? {backgroundColor: backgroundColor}
              : {backgroundColor: 'white'},
            borderColor ? {borderColor: borderColor} : {borderColor: 'black'},
          ]}>
          <Text style={[styles.buttonText, {color: labelColor}]}>{label}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Mybutton;

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: '30%',
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttonText: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 500,
  },
});
