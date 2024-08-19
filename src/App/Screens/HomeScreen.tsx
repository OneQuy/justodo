import { View, StyleSheet, Button } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import BackgroundNavigator from './Background/BackgroundNavigator'
import RowContainerView from '../Components/TaskView/RowContainerView'
import { TaskPersistedAndRuntimeData, TaskPersistedData } from '../Types'
import { CloneObject, IsValuableArrayOrString, RandomInt } from '../../Common/UtilsTS'
import { IsTaskPersistedDataEqual } from '../Handles/AppUtils'
import { CommonStyles } from '../../Common/CommonConstants'
import LucideIconTextEffectButton from '../../Common/Components/LucideIconTextEffectButton'

const HomeScreen = ({
    shouldShowPaywallFirstTime,
}: {
    shouldShowPaywallFirstTime: boolean,
}) => {
    const [taskRows, set_taskRows] = useState<TaskPersistedData[][]>([])
    
    const addRandomTask = () => {
        const newTask: TaskPersistedData = {
            uniqueTaskName: RandomInt(0, 9999).toString()
        }

        // console.log('added', newTask);

        if (taskRows.length <= 0)
            taskRows.push([])

        taskRows[0].push(newTask)

        set_taskRows(CloneObject(taskRows))
    }

    const actionRemoveTask = useCallback((task: TaskPersistedAndRuntimeData) => {
        for (let row of taskRows) {
            const idx = row.findIndex(t => IsTaskPersistedDataEqual(t, task.persistedData))

            if (idx < 0)
                continue

            row.splice(idx, 1)
            const final = CloneObject(taskRows)
            set_taskRows(final)

            // console.log('removeee', task, final);

            return
        }
    }, [taskRows])

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                flex: 1
            },

            overlayBackgroundView: {
                position: 'absolute', backgroundColor: 'mintcream', width: '100%', height: '100%'
            },

            bottomBarView: {
                flexDirection: 'row',
                justifyContent: 'flex-end'
            },

            addTaskBtn: {
                // aspectRatio: 3,
                borderWidth: 0,
                minWidth: '15%',
            }
        })
    }, [])

    return (
        <View style={style.master}>
            {/* background */}
            <BackgroundNavigator />

            <View style={style.overlayBackgroundView}>
                {/* tasks */}
                <View style={CommonStyles.flex_1}>
                    {
                        IsValuableArrayOrString(taskRows) && IsValuableArrayOrString(taskRows[0]) &&
                        <RowContainerView
                            paramTasks={taskRows[0]}
                            actionRemoveTask={actionRemoveTask}
                        />
                    }
                </View>

                {/* bottom bar */}
                <View style={style.bottomBarView}>
                    {/* add task btn */}
                    <LucideIconTextEffectButton
                        style={style.addTaskBtn}
                        iconProps={{ name: 'Plus' }}
                    />
                </View>
            </View>
        </View>
    )
}

export default HomeScreen