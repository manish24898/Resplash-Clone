import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as MainActions from '../store/actions/main';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FloatingAction} from 'react-native-floating-action';
import CollectionCard from '../components/CollectionCard';
import ErrorImage from '../components/ErrorImage'

const CollectionsScreen = props => {
  const [initialLoading, setInitialLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const page = useRef(1);
  const dispatch = useDispatch();
  const updatedData = useSelector(state => state.images.collections);
  let reload = updatedData.length === 0 ? true : false;
  if (updatedData.length === 0) {
    page.current = 1;
  }
  useEffect(() => {
    setInitialLoading(true);
    setError(false);
    let loader = props.route.params.loadCollections;
    dispatch(loader(page.current))
      .then(() => {
        page.current = page.current + 1;
        setInitialLoading(false);
      })
      .catch(err => {
        setError(true);
        setInitialLoading(false);
      });
  }, [reload]);

  const pullToRefreshHandler = () => {
    setRefreshing(true);
    setInitialLoading(true);
    setError(false);
    dispatch(MainActions.resetCollections())
      .then(() => {
        let loader = props.route.params.loadCollections;
        page.current = 1;
        dispatch(loader(page.current))
          .then(() => {
            page.current = page.current + 1;
            setRefreshing(false);
            setInitialLoading(false);
          })
          .catch(err => {
            setRefreshing(false);
            setInitialLoading(false);
            setError(true);
          });
      })
      .catch(err => {
        setRefreshing(false);
        setInitialLoading(false);
        setError(true);
      });
  };

  const fetchMoreCollections = () => {
    let loader = props.route.params.loadCollections;
    dispatch(loader(page.current))
      .then(() => {
        page.current = page.current + 1;
      })
      .catch(err => {
        setError(true);
      });
  };

  return (
    <View style={styles.main}>
      {initialLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : error ? (
        <FlatList
          style={{marginTop: 100}}
          data={[1]}
          renderItem={() => <ErrorImage text="Something Went Wrong..." />}
          refreshing={refreshing}
          onRefresh={pullToRefreshHandler}
          keyExtractor={item => Math.random()}
        />
      ) : (
        <FlatList
          data={updatedData}
          renderItem={itemData => (
            <CollectionCard
              item={itemData.item}
              navigation={props.navigation}
            />
          )}
          onEndReachedThreshold={1}
          onEndReached={fetchMoreCollections}
          refreshing={refreshing}
          onRefresh={pullToRefreshHandler}
        />
      )}
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
});

export default CollectionsScreen;
