import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo, useState } from 'react'
import BackgroundNavigator from './Background/BackgroundNavigator'
import { Task } from '../Types'
import TaskView from '../Components/TaskView'

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
            <TaskView />
        </View>
    )
}

export default HomeScreen