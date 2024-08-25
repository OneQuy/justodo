import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'
import SlideInView from '../../../Common/Components/Effects/SlideInView'
import LucideIconTextEffectButton from '../../../Common/Components/LucideIconTextEffectButton'
import { IconSize } from '../../Constants/Constants_Size'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TaskItemView_Content = ({
    isFirstRow,
    task,
    completedShowCallback,
    startRemoveTask,
}: {
    isFirstRow: boolean,
    task: TaskPersistedAndRuntimeData,
    completedShowCallback: (isAppearOrRemove: boolean) => void,
    startRemoveTask: () => void,
}) => {
    const insets = useSafeAreaInsets()

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                paddingTop: isFirstRow ? insets.top : 0,

                justifyContent: 'center',
                alignItems: 'center',

                // backgroundColor: "#bc8f8f",
                // flex: 1,
            },

            wrapView: {
                flex: 1,
                // width: '100%',
                // height: '100%',
            },

            taskNameTxt: {
                // width: '100%',
                // height: '100%',
            }
        })
    }, [isFirstRow, insets.top])

    return (
        <SlideInView
            containerStyle={style.master}
            completedCallback={completedShowCallback}
        >
            <View style={style.wrapView}>
                {/* top menu */}
                <LucideIconTextEffectButton
                    selectedBackgroundColor={'#000000'}
                    selectedColorOfTextAndIcon={'#ffffff'}

                    // style={style.addTaskBtn}
                    onPress={startRemoveTask}
                    iconProps={{ name: 'X', size: IconSize.Normal }}
                />

                {/* task name */}

                <Text style={style.taskNameTxt}>{task.persistedData.uniqueTaskName}</Text>
                {/* <Text style={style.taskNameTxt}>{'Todo Task'}</Text> */}
            </View>
        </SlideInView>
    )
}

export default TaskItemView_Content