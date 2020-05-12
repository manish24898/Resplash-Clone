import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

let TouchableCmp =
  Platform.OS === 'android' && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;



const ImageTile = props => {
  const resizeHeightScale = props.item.height / props.item.width;
  TouchableCmp = props.noFeedback ? TouchableWithoutFeedback : TouchableCmp;
  return (
    <TouchableCmp
      style={{}}
      activeOpacity={0.65}
      onPress={props.onPress}
      useForeground>
      <View
        style={{
          ...styles.main,
          height: Dimensions.get('window').width * resizeHeightScale,
        }}>
        <View style={{flex: 1}}>
           <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: props.item.urls.regular}}
          />
        </View>
      </View>
    </TouchableCmp>
  );
};

export default ImageTile;

const styles = StyleSheet.create({
  main: {
    width: Dimensions.get('window').width,
  },
});
