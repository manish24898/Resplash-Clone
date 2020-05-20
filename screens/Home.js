import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as MainActions from '../store/actions/main';
import {getGuest, AccessKey} from '../config/apiConfig';
import ImageTile from '../components/ImageTile';
import {FloatingAction} from 'react-native-floating-action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const HomeScreen = props => {
  const page = useRef(1);
  const dispatch = useDispatch();
  const updatedData = useSelector(state => state.images.images);
  console.log('size:', updatedData.length);

  useEffect(() => {
    dispatch(MainActions.fetchImages(page.current)).then(() => {
      page.current = page.current + 1;
    });
  }, []);

  const fetchMoreImages = () => {
    dispatch(MainActions.fetchImages(page.current)).then(() => {
      page.current = page.current + 1;
    });
  };

  return (
    <View style={styles.main}>
      <FlatList
        data={updatedData}
        renderItem={itemData => (
          <ImageTile
            item={itemData.item}
            onPress={() => {
              props.navigation.navigate('ImageDetails', {item: itemData.item});
            }}
          />
        )}
        onEndReachedThreshold={1}
        onEndReached={fetchMoreImages}
      />
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
