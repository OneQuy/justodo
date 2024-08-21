import { View, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TaskPersistedAndRuntimeData, TaskPersistedData } from '../../Types'
import TaskItemView from './TaskItemView'
import { CalcTargetFlex, IsTaskPersistedDataEqual } from '../../Handles/AppUtils'
import { ArrayRemove, ArrayRemovePredicate, CloneObject } from '../../../Common/UtilsTS'
import { Gap } from '../../Constants/Constants_Outline'

// const IsLog = true
const IsLog = false

const RowContainerView = ({
    isFirstRow,
    paramTasks,
    actionRemoveTask,
}: {
    isFirstRow: boolean,
    paramTasks: TaskPersistedData[],
    actionRemoveTask: (task: TaskPersistedAndRuntimeData) => void,
}) => {
    const [renderTasks, set_renderTasks] = useState<TaskPersistedAndRuntimeData[]>([])

    const onFlexingAnimationEndItem = useCallback((isAppearOrRemove: boolean, task: TaskPersistedAndRuntimeData) => {
        if (isAppearOrRemove) { }
        else { // remove
            const removeRes = ArrayRemove(renderTasks, task)
            // console.log('removeRes', removeRes);

            if (removeRes) {
                const afterRemoveTasks = CloneObject(renderTasks)
                set_renderTasks(afterRemoveTasks)

                if (IsLog) console.log('[RowContainerView] (after remove) changed tasks data:\n' + JSON.stringify(afterRemoveTasks, null, 1));
            }
            else
                throw new Error('[ne] onFlexingAnimationEndItem')
        }
    }, [renderTasks])

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

        for (let i = 0; i < renderTasks.length; i++) {
            var curTask = renderTasks[i]

            // if cur task NOT included in new tasks => prepare for removing effect

            const findCurTaskInNewTasks = newDataTasks.find(i => IsTaskPersistedDataEqual(i.persistedData, curTask.persistedData))

            if (!findCurTaskInNewTasks) { // current task NOT found in param tasks
                if (!curTask.runtimeData)
                    throw new Error('[ne] RowContainerView useEffect')

                // console.log('cccc');
                // LogStringify(curTask)

                if (curTask.runtimeData.targetFlex > 0) // => prepare for removing effect
                    curTask.runtimeData.targetFlex = 0
                else { // => remove 
                    const res = ArrayRemovePredicate(renderTasks, (task) => IsTaskPersistedDataEqual(task.persistedData, curTask.persistedData))

                    // console.log('xxxxx', res);
                    // LogStringify(renderTasks)
                }
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

        const newTasksToAdd = newDataTasks.filter(i => renderTasks.findIndex(cur => IsTaskPersistedDataEqual(i.persistedData, cur.persistedData)) < 0)

        renderTasks.push(...newTasksToAdd)

        // update view

        const finalTasks = CloneObject(renderTasks)

        set_renderTasks(finalTasks)

        if (IsLog) console.log('[RowContainerView] changed tasks data:\n' + JSON.stringify(finalTasks, null, 1));
    }, [paramTasks])

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                backgroundColor: '#fff5ee',
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
                renderTasks.map((task, index) => {
                    return (
                        <TaskItemView
                            key={task.persistedData.uniqueTaskName}
                            isFirstRow={isFirstRow}
                            task={task}
                            actionRemoveTask={actionRemoveTask}
                            onFlexingAnimationEndItem={onFlexingAnimationEndItem}
                        />
                    )
                })
            }
        </View>
    )
}

export default RowContainerView