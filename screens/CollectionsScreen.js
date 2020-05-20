import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as MainActions from '../store/actions/main';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FloatingAction} from 'react-native-floating-action';

const CollectionName = crops => {
  return (
    <View style={styles.collectionNameContainer}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>{crops.title}</Text>
      <Text style={{}}>{crops.photos} photos</Text>
    </View>
  );
};

const CollectionsScreen = props => {
  const page = useRef(1);
  const dispatch = useDispatch();
  const updatedData = useSelector(state => state.images.collections);
  console.log('size:', updatedData.length);

  useEffect(() => {
    dispatch(MainActions.fetchCollections(page.current)).then(() => {
      page.current = page.current + 1;
    });
  }, []);

  const renderCollectionCard = item => {
    return (
      <TouchableWithoutFeedback onPress={()=>{console.log("preessed")}}>
      <View style={styles.collectionCard}>
        <Image
          source={{uri: item.cover_photo.urls.regular}}
          style={{height: '80%', width: '100%'}}
        />
        <CollectionName title={item.title} photos={item.total_photos} />
      </View></TouchableWithoutFeedback>
    );
  };

  const fetchMoreCollections = () => {
    dispatch(MainActions.fetchCollections(page.current)).then(() => {
      page.current = page.current + 1;
    });
  };

  return (
    <View style={styles.main}>
      <FlatList
        data={updatedData}
        renderItem={itemData => renderCollectionCard(itemData.item)}
        onEndReachedThreshold={1}
        onEndReached={fetchMoreCollections}
      />
      <FloatingAction
        floatingIcon={
          <View style={styles.bt_upload}>
            <MaterialIcons name="file-upload" color="white" size={25} />
          </View>
        }
        showBackground={false}
        onPressMain={() => {
          console.log('bt_upload');
        }}
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
  bt_upload: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  collectionCard: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.43,
    alignItems: 'center',
  },
  collectionNameContainer: {
    width: '100%',
    height: '20%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'center',
  },
});

export default CollectionsScreen;
