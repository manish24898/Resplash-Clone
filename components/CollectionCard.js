import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, Image, Dimensions} from 'react-native';

const CollectionName = props => {
  return (
    <View style={styles.collectionNameContainer}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.title}</Text>
      <Text style={{}}>{props.photos} photos</Text>
    </View>
  );
};

const CollectionCard = props => {
  
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.navigation.push('CollectionDetail', {item: props.item});
      }}>
      <View style={styles.collectionCard}>
        <Image
          source={{uri: props.item.cover_photo ? props.item.cover_photo.urls.regular : null}}
          style={{height: '80%', width: '100%'}}
        />
        <CollectionName
          title={props.item.title}
          photos={props.item.total_photos}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CollectionCard;

const styles = StyleSheet.create({
    collectionCard: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.43,
        alignItems: 'center',
      },
      collectionNameContainer: {
        width: '100%',
        height: '20%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
      },
});
