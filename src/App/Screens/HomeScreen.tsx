import { View, Text } from 'react-native'
import React from 'react'

const HomeScreen = ({
    shouldShowPaywallFirstTime,
}: {
    shouldShowPaywallFirstTime: boolean,
}) => {
    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen