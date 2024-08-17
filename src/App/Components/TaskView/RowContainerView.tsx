import { View, StyleSheet } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { TaskPersistedAndRuntimeData, TaskPersistedData } from '../../Types'
import TaskItemView from './TaskItemView'
import { CalcTargetFlex, IsTaskPersistedDataEqual } from '../../Handles/AppUtils'
import { CloneObject } from '../../../Common/UtilsTS'
import { Gap } from '../../Constants/Constants_Outline'

const IsLog = false

const RowContainerView = ({
    paramTasks,
}: {
    paramTasks: TaskPersistedData[],
}) => {
    const [currentTasks, set_currentTasks] = useState<TaskPersistedAndRuntimeData[]>([])

    // on change tasks data

    useEffect(() => {
        // set target flex for each paramTasks

        const newDataTasks: TaskPersistedAndRuntimeData[] = [] // aka param tasks

        for (let i = 0; i < paramTasks.length; i++) {
            const persistedData = paramTasks[i]

            newDataTasks.push({
                persistedData,

                runtimeData: {
                    targetFlex: CalcTargetFlex(paramTasks[0], persistedData)
                }
            })
        }

        // remove no use task and update target flex current tasks

        for (let i = 0; i < currentTasks.length; i++) {
            var curTask = currentTasks[0]

            // if cur task NOT included in new tasks => prepare for removing effect

            const findCurTaskInNewTasks = newDataTasks.find(i => IsTaskPersistedDataEqual(i.persistedData, curTask.persistedData))

            if (!findCurTaskInNewTasks) { // current task NOT found in param tasks => prepare for removing effect
                if (!curTask.runtimeData) {
                    curTask.runtimeData = {
                        targetFlex: 0,
                    }
                }
                else
                    curTask.runtimeData.targetFlex = 0
            }
            else { // current task found in param tasks => update target flex
                if (!findCurTaskInNewTasks.runtimeData)
                    throw new Error()

                if (!curTask.runtimeData) {
                    curTask.runtimeData = {
                        targetFlex: findCurTaskInNewTasks.runtimeData.targetFlex
                    }
                }
                else
                    curTask.runtimeData.targetFlex = findCurTaskInNewTasks.runtimeData.targetFlex
            }
        }

        // add new task to current tasks

        const newTasksToAdd = newDataTasks.filter(i => currentTasks.findIndex(cur => IsTaskPersistedDataEqual(i.persistedData, cur.persistedData)) < 0)

        currentTasks.push(...newTasksToAdd)

        // update view

        const finalTasks = CloneObject(currentTasks)

        set_currentTasks(finalTasks)

        if (IsLog) console.log('[RowContainerView] changed tasks data:\n' + JSON.stringify(finalTasks, null, 1));
    }, [paramTasks])

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                backgroundColor: 'gray',
                width: '100%',
                height: '13%',
                flexDirection: 'row',
                gap: Gap.Small,
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