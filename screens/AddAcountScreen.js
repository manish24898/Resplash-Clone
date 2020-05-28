import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AddAcountScreen = (props) => {
    return (
        <View style={styles.main}>
            <Text>Add Account Screen</Text>
        </View>
    )
}

export default AddAcountScreen

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
