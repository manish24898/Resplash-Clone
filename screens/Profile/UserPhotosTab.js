import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {getGuest, AccessKey} from '../../config/apiConfig';
import ImageTile from '../../components/ImageTile';
import ErrorImage from '../../components/ErrorImage';
const UserPhotosTab = props => {
  const [initialLoading, setInitialLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updatedData, setUpdatedData] = useState([]);
  const [error, setError] = useState(false);
  const page = useRef(1);

  useEffect(() => {
    const getImages = async () => {
      let response;
      try {
        response = await getGuest.get(`users/${props.username}/photos`, {
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
        setError(true);
        setInitialLoading(false);
      }
    };
    setInitialLoading(true);
    getImages();
  }, []);

  const pullToRefreshHandler = () => {
    setRefreshing(true);
    setInitialLoading(true);
    setError(false);
    page.current = 1;
    const getImages = async () => {
      let response;
      try {
        response = await getGuest.get(`users/${props.username}/photos`, {
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
        setError(true);
        setInitialLoading(false);
        setRefreshing(false);
      }
    };
    getImages();
  };

  const fetchMoreImages = () => {
    setError(false);
    const getImages = async () => {
      let response;
      try {
        response = await getGuest.get(`users/${props.username}/photos`, {
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
        setError(true);
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
          style={{width: Dimensions.get('window').width}}
          nestedScrollEnabled={true}
          data={updatedData}
          renderItem={itemData => (
            <ImageTile
              backgroundColor={itemData.item.color}
              item={itemData.item}
              onPress={() => {
                props.navigation.push('ImageDetails', {
                  item: itemData.item,
                });
              }}
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

export default UserPhotosTab;
