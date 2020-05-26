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
  ActivityIndicator,
  Modal,
  NativeModules
} from 'react-native';
import {getGuest, AccessKey} from '../config/apiConfig';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButtonComponent from '../components/HeaderButton';
import Colors from '../constants/Colors';
import ImageTile from '../components/ImageTile';
import ProfileIcon from '../components/ProfileIcon';
import {FloatingAction} from 'react-native-floating-action';
import * as CustomModal from 'react-native-modal';
import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import WallpaperManager from 'react-native-wallpaper-enhanced';

const TouchableCmp =
  Platform.OS === 'android' && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const ModalItem = props => {
  return (
    <View style={{flexDirection: 'row', padding: 10}}>
      {props.iconComponent ? (
        <props.iconComponent name={props.iconName} size={25} color="black" />
      ) : (
        <Ionicons name={props.iconName} size={25} color="black" />
      )}
      <Text style={{marginLeft: 20}}>{props.children}</Text>
    </View>
  );
};

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
  const [isActionsVisible, setIsActionsVisible] = useState(false);
  const [btStats, setBtStats] = useState(false);
  const [btInfo, setBtInfo] = useState(false);
  const [btWallpaper, setBtWallpaper] = useState(false);

  const [statsData, setStatsData] = useState({set: false, data: null});
  const [infoData, setInfoData] = useState({set: false, data: null});
  const [modalLoading, setModalLoading] = useState(false);
  const item = props.route.params.item;

  const downloadManager = require('react-native-simple-download-manager');

  const setAsWallpaper = () => {
    WallpaperManager.setWallpaper({uri:item.urls.raw + `&h=${Dimensions.get('window').height}&fm=jpg&q=100`,}, (res) => console.log(res))
  }

  const startDownload = async () => {
    let response;
    const downloadConfig = {
      downloadTitle: 'Downloading Image',
      downloadDescription: `${item.id}.jpg`,
      saveAsName: `${item.id}.jpg`,
      allowedInRoaming: true,
      allowedInMetered: true,
      showInDownloads: true,
      external: true,
      path: 'Download/',
    };

    check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(async result => {
      switch (result) {
        case RESULTS.DENIED:
        case RESULTS.GRANTED:
          request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(
            async result => {
              if (result === 'granted') {
                console.log('startig download');
                try {
                  //setModalLoading(true);
                  response = await getGuest.get(`/photos/${item.id}/download`, {
                    params: {
                      id: item.id,
                      client_id: AccessKey,
                    },
                  });
                  try {
                    let res = await downloadManager.download(
                      item.urls.raw + `&h=${Dimensions.get('window').height}&fm=jpg&q=100`,
                      {},
                      downloadConfig,
                    );
                    console.log('download complete : ', res);
                  } catch (errr) {
                    console.log('error download', errr);
                  }
                  //setInfoData({set: true, data: response.data});

                  //setModalLoading(false);
                } catch (err) {
                  console.log(err);
                  //setModalLoading(false);
                }
              }else{
                console.log("someproblem")
              }
            },
          );

          break;
        case RESULTS.BLOCKED:
          console.log(
            'The permission is denied and not requestable anymore.. show alert',
          );
          return;
      }
    });
  };

  const loadInfoContents = async () => {
    let response;
    try {
      setModalLoading(true);
      response = await getGuest.get(`/photos/${item.id}`, {
        params: {
          id: item.id,
          client_id: AccessKey,
        },
      });
      setInfoData({set: true, data: response.data});
      setModalLoading(false);
    } catch (err) {
      console.log(err);
      setModalLoading(false);
    }
  };

  const loadStatsContents = async () => {
    let response;
    try {
      setModalLoading(true);
      response = await getGuest.get(`/photos/${item.id}/statistics`, {
        params: {
          id: item.id,
          client_id: AccessKey,
        },
      });
      setStatsData({set: true, data: response.data});
      setModalLoading(false);
    } catch (err) {
      console.log(err);
      setModalLoading(false);
    }
  };
  const actions = [
    {
      text: 'Stats',
      textColor: 'white',
      textBackground: 'black',
      icon: require('../assets/analytics-outline.png'),
      name: 'bt_stats',
      color: 'black',
      position: 1,
    },
    {
      text: 'Info',
      textColor: 'white',
      textBackground: 'black',
      icon: require('../assets/information-circle-outline.png'),
      name: 'bt_info',
      color: 'black',
      position: 2,
    },
    {
      text: 'Set as wallpaper',
      textColor: 'white',
      textBackground: 'black',
      icon: require('../assets/image-outline.png'),
      name: 'bt_wallpaper',
      color: 'black',
      position: 3,
    },
    {
      text: 'Download',
      textColor: 'white',
      textBackground: 'black',
      icon: require('../assets/download-outline.png'),
      color: 'black',
      name: 'bt_download',
      position: 4,
    },
  ];

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item title="globe" iconName="md-globe" onPress={() => {}} />
          <Item title="share" iconName="md-share" onPress={() => {}} />
        </HeaderButtons>
      ),
    });
  }, []);

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
            style={{borderWidth: 5, borderColor: 'red'}}
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
              style={{
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              }}>
              <Ionicons
                name={isActionsVisible ? 'ios-arrow-down' : 'ios-arrow-up'}
                color="white"
                size={25}
              />
            </View>
          }
          overlayColor="rgba(255,255,255, 0.7)"
          actions={actions}
          actionsPaddingTopBottom={-3}
          onPressItem={name => {
            if (name === 'bt_stats') {
              setBtStats(true);
            } else if (name === 'bt_download') {
              startDownload();
            } else if (name === 'bt_info') {
              setBtInfo(true);
            } else if (name === 'bt_wallpaper') {
              //setBtWallpaper(true);
              setAsWallpaper();
            }
          }}
          onStateChange={state => {
            setIsActionsVisible(!state.isActive);
          }}
        />
      </View>
      {btStats && (
        <CustomModal.ReactNativeModal
          isVisible={btStats}
          onBackButtonPress={() => {
            setBtStats(false);
          }}
          onBackdropPress={() => {
            setBtStats(false);
          }}
          onModalShow={() => {
            loadStatsContents();
          }}>
          <View
            style={{backgroundColor: 'white', borderRadius: 10, padding: 20}}>
            {modalLoading && <ActivityIndicator size="large" color="black" />}
            {!modalLoading && statsData.set && (
              <View>
                <ModalItem iconName="md-download">
                  {statsData.set ? statsData.data.downloads.total : '---'}{' '}
                  Downloads
                </ModalItem>
                <ModalItem iconName="md-heart">
                  {statsData.set ? statsData.data.likes.total : '---'} Likes
                </ModalItem>
                <ModalItem iconName="md-eye">
                  {statsData.set ? statsData.data.views.total : '---'} Views
                </ModalItem>
              </View>
            )}
          </View>
        </CustomModal.ReactNativeModal>
      )}
      {btInfo && (
        <CustomModal.ReactNativeModal
          isVisible={btInfo}
          onBackButtonPress={() => {
            setBtInfo(false);
          }}
          onBackdropPress={() => {
            setBtInfo(false);
          }}
          onModalShow={() => {
            loadInfoContents();
          }}>
          <View
            style={{backgroundColor: 'white', borderRadius: 10, padding: 20}}>
            {modalLoading && <ActivityIndicator size="large" color="black" />}
            {!modalLoading && infoData.set && (
              <View>
                <ModalItem
                  iconName="ruler-horizontal"
                  iconComponent={FontAwesome5}>
                  Dimensions:{' '}
                  {infoData.set && infoData.data.width && infoData.data.height
                    ? infoData.data.width + ' x ' + infoData.data.height
                    : '---'}
                </ModalItem>
                <ModalItem iconName="md-image">
                  {'   '}
                  Make:{' '}
                  {infoData.set && infoData.data.exif && infoData.data.exif.make
                    ? infoData.data.exif.make
                    : '---'}
                </ModalItem>
                <ModalItem iconName="md-camera">
                  {'   '}
                  Model:{'  '}
                  {infoData.set &&
                  infoData.data.exif &&
                  infoData.data.exif.model
                    ? infoData.data.exif.model
                    : '---'}
                </ModalItem>
                <ModalItem
                  iconName="timelapse"
                  iconComponent={MaterialCommunityIcons}>
                  {'  '}
                  Exposure time:{'  '}
                  {infoData.set &&
                  infoData.data.exif &&
                  infoData.data.exif.exposure_time
                    ? infoData.data.exif.exposure_time
                    : '---'}
                </ModalItem>
                <ModalItem iconName="md-aperture">
                  {'   '}
                  Apperture:{'  '}
                  {infoData.set &&
                  infoData.data.exif &&
                  infoData.data.exif.aperture
                    ? infoData.data.exif.aperture
                    : '---'}
                </ModalItem>
                <ModalItem iconName="exposure" iconComponent={MaterialIcons}>
                  {'   '}
                  ISO:{'  '}
                  {infoData.set && infoData.data.exif && infoData.data.exif.iso
                    ? infoData.data.exif.iso
                    : '---'}
                </ModalItem>
                <ModalItem
                  iconName="alpha-f-circle-outline"
                  iconComponent={MaterialCommunityIcons}>
                  {'   '}
                  Focal length:{'    '}
                  {infoData.set &&
                  infoData.data.exif &&
                  infoData.data.exif.focal_length
                    ? infoData.data.exif.focal_length
                    : '---'}
                </ModalItem>
              </View>
            )}
          </View>
        </CustomModal.ReactNativeModal>
      )}

      {btWallpaper && (
        <CustomModal.ReactNativeModal
          isVisible={btWallpaper}
          onBackButtonPress={() => {
            setBtWallpaper(false);
          }}
          onBackdropPress={() => {
            setBtWallpaper(false);
          }}>
          <View style={{backgroundColor: 'white'}}>
            <Text>hello</Text>
          </View>
        </CustomModal.ReactNativeModal>
      )}
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
