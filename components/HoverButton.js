import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const TouchableCmp = Platform.OS === 'android' && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;
const DownloadHoverButton = props => {
  return (
    <View style={styles.main}>
      <View style={{overflow:'hidden', borderRadius:100,}}>
      <TouchableCmp onPress={props.onPress} background={TouchableNativeFeedback.Ripple("white", false)} useForeground>
      <View style={styles.mainButton}>
        <Ionicons name={props.show ? "ios-arrow-down" : "ios-arrow-up"} color="white" size={25} />
      </View>
      </TouchableCmp>
      </View>
    </View>
  );
};

export default DownloadHoverButton;

const styles = StyleSheet.create({
    main:{
        position:'absolute',
        zIndex:1000,
    },

  mainButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.slightBlack,
    padding: 20,
    height: 70,
    width: 70,
    borderRadius:100,
  },
  symbol: {
    fontSize: 20,
    color: 'white',
  },
});
