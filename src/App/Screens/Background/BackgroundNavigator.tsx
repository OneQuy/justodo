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

            <View
                style={[CommonStyles.width100PercentHeight100Percent, { backgroundColor: 'whitesmoke'}]}
            />
        </View>
    )
}

export default BackgroundNavigator