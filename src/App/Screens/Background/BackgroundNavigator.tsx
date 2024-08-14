import { View, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native'
import React, { useMemo } from 'react'
import { CommonStyles } from '../../../Common/CommonConstants'

const BackgroundNavigator = () => {
    const style = useMemo(() => {
        return StyleSheet.create({
            master: { flex: 1 }
        })
    }, [])

    return (
        <View
            style={style.master}
        >
            <StatusBar translucent backgroundColor="transparent" />

            <ImageBackground
                style={CommonStyles.width100PercentHeight100Percent}
                source={{ uri: 'https://images.unsplash.com/photo-1487147264018-f937fba0c817?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            />
        </View>
    )
}

export default BackgroundNavigator