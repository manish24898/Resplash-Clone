import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const ErrorImage = props => {
  return (
    <View style={styles.main}>
      <Image
        style={{width: '100%', height: '100%', borderRadius: 200, opacity: 0.6}}
        source={require('../assets/error.png')}
      />
      <Text style={styles.textStyle}>{props.text}</Text>
    </View>
  );
};

export default ErrorImage;

const styles = StyleSheet.create({
  main: {
    padding: 20,
    height: 200,
    width: 200,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 16,
    color: 'grey',
    opacity: 0.7,
  },
});
