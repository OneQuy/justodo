import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Task } from '../../Types'
import TaskItemView from './TaskItemView'

const RowContainerView = () => {
    const [tasks, set_tasks] = useState<Task[]>([
        {
            name: "todo here this is a task"
        },
        {
            name: "todo here this is a task"
        },
        {
            name: "todo here this is a task"
        },
        {
            name: "todo here this is a task"
        },
    ])

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                position: 'absolute',
            }
        })
    }, [])

    return (
        <View style={style.master}>
            {
                tasks.map((task, index) => {
                    return (
                        <TaskItemView key={index} task={task} />
                    )
                })
            }
        </View>
    )
}

export default RowContainerView