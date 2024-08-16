import { View, StyleSheet } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { TaskPersistedAndRuntimeData, TaskPersistedData } from '../../Types'
import TaskItemView from './TaskItemView'

const RowContainerView = ({
    paramTasks,
}: {
    paramTasks: TaskPersistedData[],
}) => {
    const [currentTasks, set_currentTasks] = useState<TaskPersistedAndRuntimeData[]>([])

    // on change tasks data

    useEffect(() => {

    }, [paramTasks])

    // style

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

    // render

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