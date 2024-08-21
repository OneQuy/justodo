import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'
import LucideIconTextEffectButton from '../../../Common/Components/LucideIconTextEffectButton'
import { IconSize } from '../../Constants/Constants_Size'

const TaskItemView_Menu = ({
    isFirstRow,
    task,
    startRemoveTask,
}: {
    isFirstRow: boolean,
    task: TaskPersistedAndRuntimeData,
    startRemoveTask: () => void,
}) => {

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                position: 'absolute',
                width: '100%',
                height: '100%',


                backgroundColor: "#bc8f",
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
    }, [])

    return (
        <View style={style.master}>
            {/* add task btn */}
            <LucideIconTextEffectButton
                selectedBackgroundColor={'#000000'}
                selectedColorOfTextAndIcon={'#ffffff'}

                style={style.addTaskBtn}
                onPress={() => { console.log(33) }}
                iconProps={{ name: 'Plus', size: IconSize.Normal }}
            />
        </View>
    )
}

export default TaskItemView_Menu