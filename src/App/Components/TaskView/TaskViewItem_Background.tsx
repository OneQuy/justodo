import { StyleSheet } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'
import ScaleUpView from '../../../Common/Components/Effects/ScaleUpView'
import ImageBackgroundOrView from '../../../Common/Components/ImageBackgroundOrView'

const TaskItemView_Background = ({
    task,
    completedShowCallback,
    isScaleUpOrDown,
}: {
    task: TaskPersistedAndRuntimeData,
    completedShowCallback: (isAppearOrRemove: boolean, task: TaskPersistedAndRuntimeData) => void,
    isScaleUpOrDown: boolean,
}) => {

    const _completedShowCallback = useCallback((isAppearOrRemove: boolean) => {
        completedShowCallback(isAppearOrRemove, task)
    }, [task, completedShowCallback])

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
            completedCallback={_completedShowCallback}
            isScaleUpOrDown={isScaleUpOrDown}
            isSpringOrTiming={false}
            duration={200}
        >
            <ImageBackgroundOrView
                source={{
                    // uri: undefined
                    uri: 'https://images.unsplash.com/photo-1724405143873-cdaa5cac918e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4OXx8fGVufDB8fHx8fA%3D%3D'
                }}
                style={style.imageBackgroundOrView}
            />
        </ScaleUpView>
    )
}

export default TaskItemView_Background