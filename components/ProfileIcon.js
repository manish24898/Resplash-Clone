import React from 'react'
import { View, Text, Image } from 'react-native'

const ProfileIcon = (props) => {
    return (
        <View style={{ width:30, height:30, borderRadius:50, marginRight:20, overflow:'hidden', ...props.style}}>
            <Image style={{width:'100%', height:'100%'}} source={{uri:props.imageUrl}} />
        </View>
    )
}

export default ProfileIcon