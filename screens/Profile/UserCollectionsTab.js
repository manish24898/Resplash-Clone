import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {getGuest, AccessKey} from '../../config/apiConfig';
import CollectionCard from '../../components/CollectionCard'
const UserCollectionsTab = props => {
  const [initialLoading, setInitialLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updatedData, setUpdatedData] = useState([]);
  const page = useRef(1);

  useEffect(() => {
    const getImages = async () => {
      let response;
      try {
        response = await getGuest.get(`users/${props.username}/collections`, {
          params: {
            page: page.current,
            per_page: 30,
            client_id: AccessKey,
          },
        });
        page.current = page.current + 1;
        setUpdatedData([...response.data]);
        setInitialLoading(false);
      } catch (err) {
        console.log(err);
        setInitialLoading(false);
      }
    };
    setInitialLoading(true);
    getImages();
  }, []);

  const pullToRefreshHandler = () => {
    setRefreshing(true);
    setInitialLoading(true);
    page.current = 1;
    const getImages = async () => {
      let response;
      try {
        response = await getGuest.get(`users/${props.username}/collections`, {
          params: {
            page: page.current,
            per_page: 30,
            client_id: AccessKey,
          },
        });
        page.current = page.current + 1;
        setUpdatedData([...response.data]);
        setInitialLoading(false);
        setRefreshing(false);
      } catch (err) {
        console.log(err);
        setInitialLoading(false);
        setRefreshing(false);
      }
    };
    getImages();
  };

  const fetchMoreImages = () => {
    const getImages = async () => {
      let response;
      try {
        response = await getGuest.get(`users/${props.username}/collections`, {
          params: {
            page: page.current,
            per_page: 30,
            client_id: AccessKey,
          },
        });
        page.current = page.current + 1;
        setUpdatedData(data => [...data, ...response.data]);
        setInitialLoading(false);
      } catch (err) {
        console.log(err);
        setInitialLoading(false);
      }
    };
    setInitialLoading(true);
    getImages();
  };


  return (
    <View style={styles.main}>
      {initialLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          style={{width: Dimensions.get('window').width}}
          nestedScrollEnabled={true}
          data={updatedData}
          renderItem={itemData => (
            <CollectionCard
              item={itemData.item}
              navigation={props.navigation}
            />
          )}
          onEndReachedThreshold={1}
          onEndReached={fetchMoreImages}
          refreshing={refreshing}
          onRefresh={pullToRefreshHandler}
        />
      )}
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

export default UserCollectionsTab;
