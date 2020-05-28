import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AboutScreen = (props) => {
    return (
        <View style={styles.main}>
            <Text>About Screen</Text>
        </View>
    )
}

export default AboutScreen

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
