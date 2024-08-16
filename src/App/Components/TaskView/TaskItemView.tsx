import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { TaskPersistedAndRuntimeData, TaskPersistedData } from '../../Types'

const TaskItemView = ({
    task
}: {
    task: TaskPersistedAndRuntimeData
}) => {
    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                // flex: 1
            },

            taskNameTxt: {
            }
        })
    }, [])

    return (
        <View>
            <Text style={style.taskNameTxt}>TaskItem</Text>
        </View>
    )
}

export default TaskItemView