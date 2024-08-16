import { View, StyleSheet, SafeAreaView } from 'react-native'
import React, { useMemo } from 'react'
import BackgroundNavigator from './Background/BackgroundNavigator'
import RowContainerView from '../Components/TaskView/RowContainerView'

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
            {/* background */}
            <BackgroundNavigator />

            <View style={{ position: 'absolute', backgroundColor: 'green', width: '100%', height: '100%' }}>
                {/* tasks */}
                <SafeAreaView style={{ flex: 1 }}>
                    <RowContainerView />
                </SafeAreaView>
            </View>
        </View>
    )
}

export default HomeScreen