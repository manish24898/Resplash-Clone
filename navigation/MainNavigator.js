import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import CollectionsScreen from '../screens/CollectionsScreen'
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButtom from '../components/HeaderButton';
import {View, Button} from 'react-native';
import ImageDetailsScreen from '../screens/ImageDetailsScreen';
import CollectionDetailScreen from '../screens/CollectionDetailScreen';

const HomeScreenStack = createStackNavigator();

const HomeScreenStackNavigator = () => {
  return <HomeScreenStack.Navigator screenOptions={{headerShown:false}}>
    <HomeScreenStack.Screen name="Home" component={HomeScreen} />
    
  </HomeScreenStack.Navigator>
}

const HomeTabsNavigator = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return (
    <HomeTabsNavigator.Navigator
      tabBarOptions={{labelStyle: {fontWeight: 'bold'}}}>
      <HomeTabsNavigator.Screen name="Home" component={HomeScreenStackNavigator} />
      <HomeTabsNavigator.Screen name="Collections" component={CollectionsScreen} />
    </HomeTabsNavigator.Navigator>
  );
};

const StackNavigator = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Resplash"
        component={HomeTabs}
        options={({navigation}) => {
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
              <HeaderButtons HeaderButtonComponent={CustomHeaderButtom}>
                <Item
                  iconName="md-search"
                  title="search"
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
                <Item
                  iconName="md-list"
                  title="list"
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <StackNavigator.Screen name="CollectionDetail" component={CollectionDetailScreen} options={{headerTitle:''}} />
      <StackNavigator.Screen name="ImageDetails" component={ImageDetailsScreen} options={{headerTitle:''}} />
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
