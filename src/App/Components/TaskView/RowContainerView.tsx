import { View, StyleSheet } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Task } from '../../Types'
import TaskItemView from './TaskItemView'

const RowContainerView = () => {
    const [currentTasks, set_currentTasks] = useState<Task[]>([])

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                backgroundColor: 'pink',
                width: '100%',
                height: '13%',
                flexDirection: 'row'
            }
        })
    }, [])

    return (
        <View style={style.master}>
            {
                currentTasks.map((task, index) => {
                    return (
                        <TaskItemView key={index} task={task} />
                    )
                })
            }
        </View>
    )
}

export default RowContainerView