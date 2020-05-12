import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as MainActions from '../store/actions/main';
import {getGuest, AccessKey} from '../config/apiConfig';

const HomeScreen = (props) => {
  
   

  return (
    <View style={styles.main}>
      <Text>Collections Screens</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
