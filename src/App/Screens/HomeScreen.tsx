import { View, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import BackgroundNavigator from './Background/BackgroundNavigator'
import TasksView from '../Components/TasksView'

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

            {/* tasks */}
            <TasksView />
        </View>
    )
}

export default HomeScreen