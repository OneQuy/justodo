import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'
import LucideIconTextEffectButton from '../../../Common/Components/LucideIconTextEffectButton'
import { IconSize } from '../../Constants/Constants_Size'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TaskItemView_Menu = ({
    isFirstRow,
    task,
    startRemoveTask,
}: {
    isFirstRow: boolean,
    task: TaskPersistedAndRuntimeData,
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
                padding: isFirstRow ? insets.top : 0,

                // backgroundColor: "#bc8f",
            },

            taskNameTxt: {
                // width: '100%',
                // height: '100%',
            },

            addTaskBtn: {
                // padding: Outline.Small,
                borderWidth: 0,
                minWidth: '15%',
            }
        })
    }, [isFirstRow, insets])

    return (
        <View style={style.master}>
            {/* add task btn */}
            <LucideIconTextEffectButton
                selectedBackgroundColor={'#000000'}
                selectedColorOfTextAndIcon={'#ffffff'}

                // style={style.addTaskBtn}
                onPress={startRemoveTask}
                iconProps={{ name: 'Plus', size: IconSize.Normal }}
            />
        </View>
    )
}

export default TaskItemView_Menu