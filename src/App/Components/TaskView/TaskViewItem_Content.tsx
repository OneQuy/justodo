import { StyleSheet, Text } from 'react-native'
import React, { useMemo } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'
import SlideInView from '../../../Common/Components/Effects/SlideInView'

const TaskItemView_Content = ({
    task,
    completedShowCallback,
}: {
    task: TaskPersistedAndRuntimeData,
    completedShowCallback: (isAppearOrRemove: boolean) => void,
}) => {

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                position: 'absolute',
                backgroundColor: "#bc8f8f",
                // flex: 1,
                width: '100%',
                height: '100%',
            },

            taskNameTxt: {
            }
        })
    }, [])

    return (
        <SlideInView
            containerStyle={style.master}
            completedCallback={completedShowCallback}
        >
            <Text style={style.taskNameTxt}>{task.persistedData.uniqueTaskName}</Text>
        </SlideInView>
    )
}

export default TaskItemView_Content