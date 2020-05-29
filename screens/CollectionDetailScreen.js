import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButtonComponent from '../components/HeaderButton';
import ProfileIcon from '../components/ProfileIcon';
import {AccessKey, getGuest} from '../config/apiConfig';
import ImageTile from '../components/ImageTile';

const CollectionDetailScreen = props => {
  const [initialLoading, setInitialLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const item = props.route.params.item;
  const page = useRef(1);
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: item.title,
      headerTitleContainerStyle: {
        width: '50%',
      },
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item title="globe" iconName="md-globe" onPress={() => {}} />
          <Item title="share" iconName="md-share" onPress={() => {}} />
        </HeaderButtons>
      ),
    });
  }, []);

  useEffect(() => {
    const getImages = async () => {
      let response;
      try {
        response = await getGuest.get(`collections/${item.id}/photos`, {
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

  const fetchMoreImages = () => {
    const getImages = async () => {
      let response;
      try {
        response = await getGuest.get(`collections/${item.id}/photos`, {
          params: {
            page: page.current,
            per_page: 10,
            client_id: AccessKey,
          },
        });
        page.current = page.current + 1;
        setUpdatedData(data => [...data, ...response.data]);
      } catch (err) {
        console.log(err);
      }
    };
    getImages();
  };

  const pullToRefreshHandler = () => {
    setRefreshing(true);
    setInitialLoading(true);
    page.current = 1;

    const getImages = async () => {
      let response;
      try {
        response = await getGuest.get(`collections/${item.id}/photos`, {
          params: {
            page: page.current,
            per_page: 30,
            client_id: AccessKey,
          },
        });
        page.current = page.current + 1;
        setUpdatedData([...response.data]);
        setInitialLoading(false);
        setRefreshing(false)
      } catch (err) {
        console.log(err);
        setInitialLoading(false);
        setRefreshing(false);
      }
    };
    getImages();
  }

  return (
    <View style={styles.main}>
      {item.description && (
        <View style={styles.profileTabContainer}>
          <View style={{...styles.profileTab, width: '90%'}}>
            <TouchableWithoutFeedback
              style={{flex: 1}}
              onPress={() => {
                props.navigation.navigate('Profile', {user: item.user});
              }}>
              <View style={styles.profileTabContainerBase}>
                <Text style={{fontSize: 15, textAlign: 'center'}}>
                  {item.description}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
      <View style={styles.profileTabContainer}>
        <View style={styles.profileTab}>
          <TouchableWithoutFeedback
            style={{flex: 1}}
            onPress={() => {
              props.navigation.navigate('Profile', {user: item.user});
            }}>
            <View style={styles.profileTabContainerBase}>
              <ProfileIcon imageUrl={item.user.profile_image.small} />
              <Text style={{fontSize: 15}}>By {item.user.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {initialLoading ? (
        <ActivityIndicator
          accessibilityLabel="loading"
          color="grey"
          size="large"
        />
      ) : (
        <FlatList
          data={updatedData}
          renderItem={itemData => (
            <ImageTile
              item={itemData.item}
              onPress={() => {
                props.navigation.navigate('ImageDetails', {
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

export default CollectionDetailScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  profileTabContainer: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profileTab: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'row',
  },
  profileTabContainerBase: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
