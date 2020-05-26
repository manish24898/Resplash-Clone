import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as MainActions from '../store/actions/main';
import {getGuest, AccessKey} from '../config/apiConfig';
import ImageTile from '../components/ImageTile';
import {FloatingAction} from 'react-native-floating-action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = props => {
  const [intialLoading, setInitialLoading] = useState(false);
  const page = useRef(1);
  const dispatch = useDispatch();
  const updatedData = useSelector(state => state.images.images);
  let reload = updatedData.length === 0 ? true : false
  if (updatedData.length === 0){
    page.current = 1;
  }
  //console.log("noeew , page", page.current)
  useEffect(() => {
    //console.log('name', props.route.params.loadHome.name)
    let loader = props.route.params.loadHome;
    setInitialLoading(true);
     dispatch(loader(page.current)).then(() => {
       page.current = page.current + 1;
       setInitialLoading(false)
     }).catch((err) => {
       setInitialLoading(false);
     });
  }, [reload]);


  const fetchMoreImages = () => {
    let loader = props.route.params.loadHome;
    dispatch(loader(page.current)).then(() => {
      page.current = page.current + 1;
    });
  };

  return (
    <View style={styles.main}>
      {intialLoading ? <ActivityIndicator size="large" color="black" /> : <FlatList
        data={updatedData}
        renderItem={itemData => (
          <ImageTile
            backgroundColor={itemData.item.color}
            item={itemData.item}
            onPress={() => {
              props.navigation.navigate('ImageDetails', {item: itemData.item});
            }}
          />
        )}
        onEndReachedThreshold={1}
        onEndReached={fetchMoreImages}
      />}
      
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
