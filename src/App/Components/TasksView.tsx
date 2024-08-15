import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Task } from '../Types'
import TaskItem from './TaskItem'

const TasksView = () => {
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
                        <TaskItem key={index} task={task} />
                    )
                })
            }
        </View>
    )
}

export default TasksView