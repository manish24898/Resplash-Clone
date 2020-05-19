import React, {useState, useEffect} from 'react';
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
  Modal,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButtonComponent from '../components/HeaderButton';
import Colors from '../constants/Colors';
import ImageTile from '../components/ImageTile';
import ProfileIcon from '../components/ProfileIcon';
import {FloatingAction} from 'react-native-floating-action';
import {createIconSet} from 'react-native-vector-icons';

const TouchableCmp =
  Platform.OS === 'android' && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const DetailTile = props => {
  return (
    <View style={styles.detailTile}>
      <View
        style={{width: '15%', justifyContent: 'center', alignItems: 'center'}}>
        <props.iconComponent name={props.iconName} size={30} color="black" />
      </View>
      <Text style={styles.detailFont}>{props.text}</Text>
      {props.color && (
        <View
          style={{
            marginLeft: 20,
            backgroundColor: props.text,
            borderRadius: 50,
            width: 15,
            height: 15,
          }}
        />
      )}
    </View>
  );
};

const ImageDetailsScreen = props => {
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [isActionsVisible, setIsActionsVisible] = useState(true);
  const [icons, setIcons] = useState({
    
  });
  const item = props.route.params.item;

  useEffect(() => {
    const load = async () => {
      const statsIcon = Ionicons.getImageSource("md-stats", 10, "white");
      const infoIcon = Ionicons.getImageSource("md-information-circle-outline", 10, "white");
      const wallpaperIcon = Ionicons.getImageSource("md-image", 10, "white");
      const downloadIcon = Ionicons.getImageSource("md-download", 10, "white");

      const result = await Promise.all([statsIcon, infoIcon, wallpaperIcon, downloadIcon])
      setIcons({
        stats: result[0].uri,
        info : result[1].uri,
        wallpaper : result[2].uri,
        download : result[3].uri
      })
    }
    load();
  }, [])

    const actions = [
    {
      text: 'Stats',
      textColor:'white',
      textBackground:'black',
      icon: require('../assets/analytics-outline.png'),
      name: 'bt_stats',
      color: 'black',
      position: 1,
      
    },
    {
      text: 'Info',
      textColor:'white',
      textBackground:'black',
      icon: require('../assets/information-circle-outline.png'),
      name: 'bt_info',
      color: 'black',
      position: 2,
    },
    {
      text: 'Set as wallpaper',
      textColor:'white',
      textBackground:'black',
      icon: require('../assets/image-outline.png'),
      name: 'bt_wallpaper',
      color: 'black',
      position: 3,
    },
    {
      text: 'Download',
      textColor:'white',
      textBackground:'black',
      icon: require('../assets/download-outline.png'),
      color: 'black',
      name: 'bt_download',
      position: 4,
    },
  ];
  props.navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
        <Item title="globe" iconName="md-globe" onPress={() => {}} />
        <Item title="share" iconName="md-share" onPress={() => {}} />
      </HeaderButtons>
    ),
  });

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView style={styles.main}>
          <ImageTile
            item={item}
            onPress={() => {
              setIsImageViewerVisible(true);
            }}
            noFeedback
          />

          <Modal
            visible={isImageViewerVisible}
            transparent={false}
            onRequestClose={() => {
              setIsImageViewerVisible(false);
            }}>
            <ImageViewer
              renderIndicator={() => {}}
              imageUrls={[{url: item.urls.regular}]}
            />
          </Modal>
          <View style={styles.actionsBar}>
            <View
              style={{
                width: '70%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '100%',
                flexDirection: 'row',
              }}>
              <TouchableWithoutFeedback
                style={{flex: 1}}
                onPress={() => {
                  console.log('here');
                }}>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
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
                  <Ionicons
                    name="md-heart-empty"
                    color={Colors.grey}
                    size={25}
                  />
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
              {
                <Text style={styles.detailFont}>
                  {item.description ? item.description : item.alt_description}
                </Text>
              }
            </View>
            {item.sponsorship && item.sponsorship.sponsor.location && (
              <View style={styles.detail}>
                <DetailTile
                  iconComponent={MaterialIcons}
                  iconName="location-on"
                  text={item.sponsorship.sponsor.location}
                />
              </View>
            )}
            <View style={styles.detail}>
              <DetailTile
                iconComponent={MaterialIcons}
                iconName="date-range"
                text={item.created_at}
              />
            </View>
            <View style={styles.detail}>
              <DetailTile
                iconComponent={Ionicons}
                iconName="md-heart"
                text={item.likes}
              />
            </View>
            <View style={styles.detail}>
              <DetailTile
                iconComponent={Ionicons}
                iconName="md-download"
                text={20}
              />
            </View>
            <View style={styles.detail}>
              <DetailTile
                color
                iconComponent={Ionicons}
                iconName="md-color-palette"
                text={item.color}
              />
            </View>
          </View>
        </ScrollView>
        <FloatingAction
          floatingIcon={
            <View
              style={{backgroundColor: 'black', justifyContent:'center', alignItems:'center', height: '100%', width: '100%'}}>
              <Ionicons name={isActionsVisible ? "ios-arrow-down" : "ios-arrow-up"} color="white" size={25} />
            </View>
          }
          overlayColor="rgba(255,255,255, 0.7)"
          actions={actions}
          actionsPaddingTopBottom={-3}
          onPressItem={name => {
            console.log(`selected button: ${name}`);
          }}
          onStateChange={(state)=> {setIsActionsVisible(!state.isActive)}}
        />
      </View>
    </View>
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
    marginHorizontal: 10,
    width: '100%',
    padding: 10,
  },
  detail: {
    width: '100%',
    paddingVertical: 10,
  },
  detailFont: {
    fontSize: 15,
  },
  detailTile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
