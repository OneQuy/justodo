import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'
import TaskViewItem_BackFace_StatItemView from './TaskViewItem_BackFace_StatItemView'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TaskViewItem_BackFace = ({
    isFirstRow,
    task,
}: {
    isFirstRow: boolean,
    task: TaskPersistedAndRuntimeData,
}) => {
    const insets = useSafeAreaInsets()

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                backgroundColor: "#aabbee",
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingTop: isFirstRow ? insets.top : 0,
            },
        })
    }, [insets.top, isFirstRow])

    return (
        <View style={style.master}>
            <TaskViewItem_BackFace_StatItemView />
            <TaskViewItem_BackFace_StatItemView />
            <TaskViewItem_BackFace_StatItemView />
        </View>
    )
}

export default TaskViewItem_BackFace