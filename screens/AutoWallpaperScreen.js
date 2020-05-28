import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AutoWallpaperScreen = (props) => {
    return (
        <View style={styles.main}>
            <Text>Auto Wallpaper Screen</Text>
        </View>
    )
}

export default AutoWallpaperScreen

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
