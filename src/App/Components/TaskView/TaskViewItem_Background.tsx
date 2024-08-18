import { StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'
import ScaleUpView from '../../../Common/Components/Effects/ScaleUpView'
import ImageBackgroundOrView from '../../../Common/Components/ImageBackgroundOrView'

const TaskItemView_Background = ({
    task,
    completedShowCallback,
    isScaleUpOrDown,
}: {
    task: TaskPersistedAndRuntimeData,
    completedShowCallback: (isAppearOrRemove: boolean) => void,
    isScaleUpOrDown: boolean,
}) => {

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                // backgroundColor: "#b0e0e6",
                // flex: 1,

                width: '100%',
                height: '100%',
            },

            imageBackgroundOrView: {
                backgroundColor: "#f0e68c",
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
            isScaleUpOrDown={isScaleUpOrDown}
            isSpringOrTiming={false}
            duration={200}
        >
            <ImageBackgroundOrView source={{ uri: undefined }} style={style.imageBackgroundOrView} />
        </ScaleUpView>
    )
}

export default TaskItemView_Background