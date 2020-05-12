import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
  Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButtonComponent from '../components/HeaderButton';
import Colors from '../constants/Colors';
import ImageTile from '../components/ImageTile';
import ProfileIcon from '../components/ProfileIcon';

const TouchableCmp =
  Platform.OS === 'android' && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const DetailTile = props => {
  return (
    <View style={styles.detailTile}>
      <View style={{width:'15%', justifyContent:'center', alignItems:'center'}}><props.iconComponent name={props.iconName} size={30} color="black" /></View>
      <Text style={styles.detailFont}>{props.text}</Text>
      {props.color && <View style={{marginLeft:20,backgroundColor:props.text, borderRadius:50, width:15, height:15,}} />}
    </View>
  );
};

const ImageDetailsScreen = props => {
    const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const item = props.route.params.item;
  props.navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
        <Item title="globe" iconName="md-globe" onPress={() => {}} />
        <Item title="share" iconName="md-share" onPress={() => {}} />
      </HeaderButtons>
    ),
  });

  return (
    <ScrollView style={styles.main}>
      <ImageTile item={item} onPress={() => {setIsImageViewerVisible(true)}} noFeedback />
      <Modal
          visible={isImageViewerVisible}
          transparent={false}
          onRequestClose={() => {setIsImageViewerVisible(false)}}>
          <ImageViewer renderIndicator={() => {}} imageUrls={[{url:item.urls.regular}]} />
        </Modal>
      <View style={styles.actionsBar}>
        <View
          style={{
            width: '50%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '100%',
            marginHorizontal: 10,
            flexDirection: 'row',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('here');
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <ProfileIcon imageUrl={item.user.profile_image.small} />
              <Text style={{fontSize: 15}}>By {item.user.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            width: '30%',
            height: '100%',
            flexDirection: 'row',
            marginHorizontal: 10,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableCmp
            onPress={() => {
              console.log('hi');
            }}
            useForeground>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                paddingHorizontal: 3,
                paddingVertical: 1,
                borderRadius: 50,
              }}>
              <Ionicons name="md-heart-empty" color={Colors.grey} size={25} />
            </View>
          </TouchableCmp>
          <TouchableCmp
            onPress={() => {
              console.log('hi');
            }}
            useForeground>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                paddingHorizontal: 3,
                paddingVertical: 1,
                borderRadius: 50,
              }}>
              <MaterialIcons
                name="bookmark-border"
                color={Colors.grey}
                size={25}
              />
            </View>
          </TouchableCmp>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailFont}>{item.description ? item.description : item.alt_description}</Text>
        </View>
        {item.sponsorship && <View style={styles.detail}><DetailTile iconComponent={MaterialIcons} iconName="location-on" text={item.sponsorship.sponsor.location} /></View>}
        <View style={styles.detail}><DetailTile iconComponent={MaterialIcons} iconName="date-range" text={item.created_at} /></View>
        <View style={styles.detail}><DetailTile iconComponent={Ionicons} iconName="md-heart" text={item.likes} /></View>
        <View style={styles.detail}><DetailTile iconComponent={Ionicons} iconName="md-download" text={20} /></View>
        <View style={styles.detail}><DetailTile color iconComponent={Ionicons} iconName="md-color-palette" text={item.color} /></View>
      </View>
    </ScrollView>
  );
};

export default ImageDetailsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageView: {
    width: '100%',
  },
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.offWhite,
    height: Dimensions.get('window').height * 0.07,
  },
  detailsContainer: {
    marginHorizontal:10,
    width: '100%',
    padding: 10,
  },
  detail: {
    width: '100%',
    paddingVertical:10,
  },
  detailFont: {
    fontSize: 15,
  },
  detailTile:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      
  }
});
