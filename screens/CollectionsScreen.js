import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as MainActions from '../store/actions/main';
import {getGuest, AccessKey} from '../config/apiConfig';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FloatingAction} from "react-native-floating-action";
const HomeScreen = (props) => {
  
   

  return (
    <View style={styles.main}>
      <Text>Collections Screens</Text>
      <FloatingAction
        floatingIcon={
          <View
            style={{
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}>
            <MaterialIcons name="file-upload" color="white" size={25} />
          </View>
        }
        showBackground={false}
        onPressMain={()=>{console.log('bt_upload')}}
      />
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
