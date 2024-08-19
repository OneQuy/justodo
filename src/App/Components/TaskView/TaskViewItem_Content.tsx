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
                width: '100%',
                height: '100%',

                justifyContent: 'center',
                alignItems: 'center',
                
                // backgroundColor: "#bc8f8f",
                // flex: 1,
            },

            taskNameTxt: {
                // width: '100%',
                // height: '100%',
            }
        })
    }, [])

    return (
        <SlideInView
            containerStyle={style.master}
            completedCallback={completedShowCallback}
        >
            <Text style={style.taskNameTxt}>{task.persistedData.uniqueTaskName}</Text>
            {/* <Text style={style.taskNameTxt}>{'Todo Task'}</Text> */}
        </SlideInView>
    )
}

export default TaskItemView_Content