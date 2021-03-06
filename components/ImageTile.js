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

function getRandomColor() {
  var v = ((Math.random() * 256) | 0).toString(16);
  return '#' + v + v + v;
}

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
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : getRandomColor(),
        }}>
        <View style={{flex: 1}}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: props.item.urls.small}}
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
