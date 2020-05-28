import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SupportDevelopmentScreen = () => {
    return (
        <View style={styles.main}>
            <Text>Support Development Screen</Text>
        </View>
    )
}

export default SupportDevelopmentScreen;

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
