import { View, StyleSheet, SafeAreaView, Button } from 'react-native'
import React, { useMemo, useState } from 'react'
import BackgroundNavigator from './Background/BackgroundNavigator'
import RowContainerView from '../Components/TaskView/RowContainerView'
import { TaskPersistedData } from '../Types'
import { CloneObject, IsValuableArrayOrString, PickRandomElement, RandomInt } from '../../Common/UtilsTS'

const HomeScreen = ({
    shouldShowPaywallFirstTime,
}: {
    shouldShowPaywallFirstTime: boolean,
}) => {
    const [taskRows, set_taskRows] = useState<TaskPersistedData[][]>([])

    const addRandomTask = () => {
        const taskNames = [
            'hi',
            'ho ho',
            'todo let do it',
            'this what?',
        ]

        const newTask: TaskPersistedData = {
            // @ts-ignore
            uniqueTaskName: (PickRandomElement(taskNames) + RandomInt(0, 999)) ?? ''
        }

        // console.log('added', newTask);

        if (taskRows.length <= 0)
            taskRows.push([])

        taskRows[0].push(newTask)

        set_taskRows(CloneObject(taskRows))
    }

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                flex: 1
            }
        })
    }, [])

    return (
        <View style={style.master}>
            {/* background */}
            <BackgroundNavigator />

            <View style={{ position: 'absolute', backgroundColor: 'mintcream', width: '100%', height: '100%' }}>
                {/* tasks */}
                <SafeAreaView style={{ flex: 1 }}>
                    {
                        IsValuableArrayOrString(taskRows) && IsValuableArrayOrString(taskRows[0]) &&
                        <RowContainerView paramTasks={taskRows[0]} />
                    }
                    <Button title='Add' onPress={addRandomTask} />
                </SafeAreaView>
            </View>
        </View>
    )
}

export default HomeScreen