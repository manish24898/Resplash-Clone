import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import RotatingButton from '../components/RotatingButton';

const TouchableCmp = Platform.OS === 'android' && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;

const Divider = () => {
  return (
    <View style={{borderBottomColor: 'lightgrey', borderBottomWidth: 1, marginVertical:7}} />
  );
};

const CustomDrawer = props => {
  const [toggle, setToggle] = useState(true);
  //console.log(props.labelStyle)
  return (
    <View style={styles.main}>
      <TouchableCmp
        activeOpacity={0.7}
        onPress={() => {
          setToggle(toggle => !toggle);
        }}>
        <View style={styles.topContainer}>
          <Entypo name="picasa" size={Dimensions.get('window').width * 0.25 * 1} color="black" />
          <View style={{flex: 1, marginTop: 10, flexDirection: 'row'}}>
            <View style={{width: '90%'}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>Resplash</Text>
              <Text style={{fontSize: 16}}>Free high-resolution photos</Text>
            </View>
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <RotatingButton menuToggled={toggle} />
            </View>
          </View>
        </View>
      </TouchableCmp>
      <Divider />

      {toggle ? (
        <DrawerContentScrollView>
          <DrawerItem
            label="Home"
            icon={() => <Ionicons name="md-home" size={20} color="black" />}
            labelStyle={props.labelStyle}
            onPress={() => {props.navigation.navigate('Home')}}      
          />
          <DrawerItem
            label="Collections"
            icon={() => <Ionicons name="md-images" size={20} color="black" />}
            labelStyle={props.labelStyle}
            onPress={() => {props.navigation.navigate('Collections')}}
          />
          <Divider />
          <DrawerItem
            label="Auto Wallpaper"
            icon={() => <Octicons name="mirror" size={20} color="black" />}
            labelStyle={props.labelStyle}
            onPress={()=>{props.navigation.navigate("AutoWallpaper")}}
          />
          <Divider />
          <DrawerItem
            label="Support Development"
            icon={() => <Ionicons name="md-heart" size={20} color="black" />}
            labelStyle={props.labelStyle}
            onPress={()=>{}}onPress={()=>{props.navigation.navigate("Support Development")}}
          />
          <DrawerItem
            label="Settings"
            icon={() => <Ionicons name="md-settings" size={20} color="black" />}
            labelStyle={props.labelStyle}
            onPress={()=>{props.navigation.navigate("Settings")}}
          />
          <DrawerItem
            label="About"
            icon={() => <Ionicons name="md-information-circle-outline" size={20} color="black" />}
            labelStyle={props.labelStyle}
            onPress={()=>{props.navigation.navigate("About")}}
          />
        </DrawerContentScrollView>
      ) : (
        <DrawerContentScrollView>
          <DrawerItem 
            label="Add Account" 
            icon={() => <Entypo name="plus" size={20} color="black" />}
            labelStyle={props.labelStyle}
            onPress={()=>{props.navigation.navigate("AddAccount")}} 
          />
        </DrawerContentScrollView>
      )}
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  topContainer: {
    height: Dimensions.get('window').height * 0.3,
    padding: 20,
  },
});
