import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native';
import ProfileIcon from '../../components/ProfileIcon';
import Entypo from 'react-native-vector-icons/Entypo';
import {useCollapsibleStack} from 'react-navigation-collapsible';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import UserPhotosTab from '../Profile/UserPhotosTab';
import UserCollectionsTab from '../Profile/UserCollectionsTab';
import UserLikesTab from '../Profile/UserLikesTab';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButtonComponent from '../../components/HeaderButton'

const renderTabBar = props => {
  const renderLabel = ({route, focused, color}) => (
    <Text style={{color, margin: 2}}>{route.title}</Text>
  );

  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'black'}}
      style={{backgroundColor: 'white'}}
      renderLabel={renderLabel}
      activeColor="black"
      inactiveColor="grey"
    />
  );
};

const InfoContainer = props => {
  return (
    <View style={{flexDirection: 'row', padding: 2}}>
      <View>
        <Entypo
          name={props.iconName}
          color="black"
          size={props.iconSize ? props.iconSize : 18}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 20,
        }}>
        <Text style={{marginLeft: 7, ...props.textStyle}}>{props.text}</Text>
      </View>
    </View>
  );
};

const ProfileScreen = props => {
  const user = props.route.params.user;
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: 'photos', title: `${user.total_photos} Photos`},
    {key: 'likes', title: `${user.total_likes} Likes`},
    {key: 'collections', title: `${user.total_collections} Collections`},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'photos':
        return <UserPhotosTab username={user.username} navigation={props.navigation} />;
      case 'likes':
        return <UserLikesTab username={user.username} navigation={props.navigation} />;
      case 'collections':
        return <UserCollectionsTab username={user.username} navigation={props.navigation} />;
      default:
        return null;
    }
  };

  const headerTitle = user.last_name
    ? user.first_name + ' ' + user.last_name
    : user.first_name;

  //console.log(user)
  const {
    onScroll /* Event handler */,
    containerPaddingTop /* number */,
    scrollIndicatorInsetTop /* number */,
    y,
  } = useCollapsibleStack();

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle,
      headerTitleContainerStyle: {
        width: '50%',
      },
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item title="globe" iconName="md-globe" onPress={() => {}} />
        </HeaderButtons>
      ),
    });
  }, []);


  return (
    <Animated.ScrollView
      stickyHeaderIndices={[1]}
      showsVerticalScrollIndicator={false}
      style={styles.main}
      onScroll={onScroll}
      contentContainerStyle={{paddingTop: containerPaddingTop}}
      scrollIndicatorInsets={{top: scrollIndicatorInsetTop}}>
      <View style={styles.infoContainer}>
        <View style={styles.iconAndInfoContainer}>
          <ProfileIcon
            style={{width: 60, height: 60}}
            imageUrl={user.profile_image.medium}
          />

          <View style={{flex: 1, justifyContent: 'center'}}>
            <InfoContainer
              iconName="location-pin"
              text={user.location !== null ? user.location : 'Unknown'}
            />
            <InfoContainer
              iconName="globe"
              iconSize={15}
              text={user.portfolio_url !== null ? user.portfolio_url : 'Null'}
              textStyle={{textDecorationLine: 'underline'}}
            />
          </View>
        </View>
        <View style={styles.bio}>
          <Text style={{textAlign: 'center'}}>{user.bio}</Text>
        </View>
      </View>

      <View style={{height: Dimensions.get('window').height}}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          //swipeEnabled
          children={<View />}
        />
      </View>
    </Animated.ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoContainer: {
    width: '100%',
    //borderWidth: 1,
    padding: 15,
  },
  iconAndInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bio: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
