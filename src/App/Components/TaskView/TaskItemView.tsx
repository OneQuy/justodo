import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { Task } from '../../Types'

const TaskItemView = ({
    task
}: {
    task: Task
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