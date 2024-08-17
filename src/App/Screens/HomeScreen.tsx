import { View, StyleSheet, SafeAreaView, Button } from 'react-native'
import React, { useMemo, useState } from 'react'
import BackgroundNavigator from './Background/BackgroundNavigator'
import RowContainerView from '../Components/TaskView/RowContainerView'
import { TaskPersistedData } from '../Types'
import { CloneObject, PickRandomElement, RandomInt } from '../../Common/UtilsTS'

const HomeScreen = ({
    shouldShowPaywallFirstTime,
}: {
    shouldShowPaywallFirstTime: boolean,
}) => {
    const [rowTasks, set_rowTasks] = useState<TaskPersistedData[]>([])

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
        
        rowTasks.push(newTask)

        set_rowTasks(CloneObject<TaskPersistedData[]>(rowTasks))
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
                    <RowContainerView paramTasks={rowTasks} />
                    <Button title='Add' onPress={addRandomTask} />
                </SafeAreaView>
            </View>
        </View>
    )
}

export default HomeScreen