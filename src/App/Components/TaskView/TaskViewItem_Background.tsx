import { View, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { CommonStyles } from '../../../Common/CommonConstants'
import { TaskPersistedAndRuntimeData } from '../../Types'
import ScaleUpView from '../../../Common/Components/Effects/ScaleUpView'
import ImageBackgroundOrView from '../../../Common/Components/ImageBackgroundOrView'

const TaskItemView_Background = ({
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
                backgroundColor: "#b0e0e6",
                // flex: 1,
                width: '100%',
                height: '100%',
            },

            imageBackgroundOrView: {
                backgroundColor: "#6aaafb",
                width: '100%',
                height: '100%',
            },

            taskNameTxt: {
            }
        })
    }, [])

    return (
        <ScaleUpView
            containerStyle={style.master}
            completedCallback={completedShowCallback}
        >
            <ImageBackgroundOrView source={{ uri: undefined }} style={style.imageBackgroundOrView} />
        </ScaleUpView>
    )
}

export default TaskItemView_Background