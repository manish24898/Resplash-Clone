import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SettingsScreen = (props) => {
    return (
        <View style={styles.main}>
            <Text>Settings Screen</Text>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
