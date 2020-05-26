import React, {useState, useEffect, useRef} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import {useDispatch} from 'react-redux';
import * as MainActions from '../store/actions/main';
import CollectionsScreen from '../screens/CollectionsScreen';
import Menu, {MenuItem} from 'react-native-material-menu';
import {
  View,
  Text,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  HeaderButtons,
  Item,
  OverflowMenuProvider,
} from 'react-navigation-header-buttons';
import CustomHeaderButtom from '../components/HeaderButton';
import ImageDetailsScreen from '../screens/ImageDetailsScreen';
import CollectionDetailScreen from '../screens/CollectionDetailScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo'
const TouchableCmp =
  Platform.OS === 'android' && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const actionMenu = {
  home: [
    {
      name: 'Latest',
      loader: MainActions.fetchImages.bind(this, 'latest'),
      icon:<Ionicons name="md-flower" color="black" size={20} />
    },
    {
      name: 'Oldest',
      loader: MainActions.fetchImages.bind(this, 'oldest'),
      icon:<Entypo name="back-in-time" color="black" size={20} />
    },
    {
      name: 'Popular',
      loader: MainActions.fetchImages.bind(this, 'popular'),
      icon:<Ionicons name="md-heart" color="black" size={20} />
    },
  ],
  collections: [{
    name : "All",
    loader: MainActions.fetchCollectionsAll,
    icon:<Foundation name="mountains" color="black" size={20} />
  }, {
    name :'Featured',
    loader:MainActions.fetchCollectionsFeatured,
    icon:<MaterialCommunityIcons name="star-circle" color="black" size={20} />
  }],
};

const HomeTabsNavigator = createMaterialTopTabNavigator();

const HomeTabs = ({route}) => {
  console.log('jaja', route.params);
  return (
    <HomeTabsNavigator.Navigator
      tabBarOptions={{labelStyle: {fontWeight: 'bold'}}}>
      <HomeTabsNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
        initialParams={{loadHome: route.params.loadHome}}
      />
      <HomeTabsNavigator.Screen
        name="Collections"
        component={CollectionsScreen}
        initialParams={{loadCollections: route.params.loadCollections}}
      />
    </HomeTabsNavigator.Navigator>
  );
};

const StackNavigator = createStackNavigator();

const HomeStackNavigator = ({navigation, route}) => {
  const [homeFunc, setHomeFunc] = useState(actionMenu.home[0]);
  const [collectionsFunc, setCollectionsFunc] = useState(actionMenu.collections[0]);
  const menuRef = useRef();
  const dispatch = useDispatch();

  const getHeaderMaterialMenuOptions = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'Home';
    console.log(routeName);
    switch (routeName) {
      case 'Home':
        return actionMenu.home;
      case 'Collections':
        return actionMenu.collections;
    }
  };

  useEffect(() => {
    navigation.navigate('Resplash', {
      screen: 'Home',
      params: {
        loadHome: homeFunc.loader,
        loadCollections : collectionsFunc.loader
      },
    });
  }, [homeFunc]);

  return (
      <StackNavigator.Navigator>
        <StackNavigator.Screen
          name="Resplash"
          component={HomeTabs}
          initialParams={{loadHome: homeFunc.loader, loadCollections: collectionsFunc.loader}}
          options={({navigation, route}) => {
            return {
              headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButtom}>
                  <Item
                    iconName="md-menu"
                    title="menu"
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}
                  />
                </HeaderButtons>
              ),
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <HeaderButtons HeaderButtonComponent={CustomHeaderButtom}>
                    <Item title="search" iconName="md-search" />
                  </HeaderButtons>

                  <Menu
                    ref={menuRef}
                    button={
                      <View style={{borderRadius: 20, overflow: 'hidden'}}>
                        <TouchableCmp
                          background={TouchableNativeFeedback.Ripple(
                            'grey',
                            true,
                          )}
                          onPress={() => {
                            menuRef.current.show();
                          }}>
                          <View
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 15,
                              borderRadius: 20,
                              overflow: 'hidden',
                            }}>
                            <Ionicons name="md-list" color="black" size={25} />
                          </View>
                        </TouchableCmp>
                      </View>
                    }>
                    {getHeaderMaterialMenuOptions(route).map(item => (
                      <MenuItem onPress={() => {
                            if (item.name == "All" || item.name == "Featured")
                            {
                              dispatch(MainActions.resetCollections());
                              setCollectionsFunc(item)
                            }
                            else{
                              dispatch(MainActions.resetImages());
                              setHomeFunc(item)
                            }
                            
                            menuRef.current.hide()
                      }} key={item.name} style={{padding:0, width:Dimensions.get('window').width * 0.5}} textStyle={{fontSize:16,}}>
                        {item.icon}
                        {'   '}
                    <Text>{item.name}</Text>
                      </MenuItem>
                    ))}
                  </Menu>
                </View>
              ),
            };
          }}
        />
        <StackNavigator.Screen
          name="CollectionDetail"
          component={CollectionDetailScreen}
          options={{headerTitle: ''}}
        />
        <StackNavigator.Screen
          name="ImageDetails"
          component={ImageDetailsScreen}
          options={{headerTitle: ''}}
        />
      </StackNavigator.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
