import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProfileScreen = (props) => {
    return (
        <View style={styles.main}>
            <Text>Profile Screen</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
