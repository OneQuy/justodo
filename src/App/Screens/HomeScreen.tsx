import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import BackgroundNavigator from './Background/BackgroundNavigator'

const HomeScreen = ({
    shouldShowPaywallFirstTime,
}: {
    shouldShowPaywallFirstTime: boolean,
}) => {
    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                flex: 1
            }
        })
    }, [])

    return (
        <View style={style.master}>
            <BackgroundNavigator />
        </View>
    )
}

export default HomeScreen