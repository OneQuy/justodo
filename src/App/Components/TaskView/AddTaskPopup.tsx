import { View, StyleSheet, TextInput } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { TaskPersistedData } from '../../Types'
import { Color_BG, Color_Text, Color_Text2 } from '../../Hooks/useTheme'
import { Gap, Outline } from '../../Constants/Constants_Outline'
import { FontSize } from '../../Constants/Constants_FontSize'
import useLocalText from '../../Hooks/useLocalText'
import { BorderRadius } from '../../Constants/Constants_BorderRadius'
import LucideIconTextEffectButton from '../../../Common/Components/LucideIconTextEffectButton'

const AddTaskPopup = ({
    startCloseAddTaskPopup,
}: {
    startCloseAddTaskPopup: (taskToAdd: TaskPersistedData | undefined) => void,
}) => {
    const texts = useLocalText()
    // const [task, set_task] = useState<TaskPersistedData | undefined>()
    const [taskName, set_taskName] = useState('')

    const validTaskName = taskName.length > 0

    const onPressAddTask = useCallback(() => {
        if (validTaskName) {
            startCloseAddTaskPopup({
                uniqueTaskName: taskName,
            })
        }
        else { }
    }, [validTaskName, startCloseAddTaskPopup, taskName])

    const onPressCancel = useCallback(() => {
        startCloseAddTaskPopup(undefined)
    }, [startCloseAddTaskPopup])

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                width: '100%', // must
                height: '100%', // must

                padding: Outline.Medium,
                justifyContent: 'space-between',
                alignItems: 'center',
            },

            taskNameInput: {
                padding: Outline.Normal,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: Color_Text,
                borderRadius: BorderRadius.Small,
                color: Color_Text,
                fontSize: FontSize.Normal,
                width: '100%',
            },

            btnsView: {
                gap: Gap.Normal,
            },

            addTaskBtn: {
                padding: Outline.Normal,
                borderWidth: 0,
                width: '40%',
                // backgroundColor: Color_Text,
            },

            cancelBtn: {
                padding: Outline.Normal,
                // borderWidth: 0,
                width: '40%',
                // backgroundColor: Color_Text,
            }
        })
    }, [])

    return (
        <View style={style.master}>
            <TextInput
                style={style.taskNameInput}
                placeholderTextColor={Color_Text2}
                placeholder={texts.task_name + '...'}
                autoCapitalize='sentences'
                keyboardType='email-address'
                returnKeyType='default'
                onChangeText={(s) => set_taskName(s)}
                value={taskName}
                numberOfLines={1}
                multiline={false}
                maxLength={100}
            />

            <View style={style.btnsView}>
                <LucideIconTextEffectButton
                    selectedColorOfTextAndIcon={validTaskName ? Color_BG : Color_Text}
                    selectedBackgroundColor={validTaskName ? Color_Text : Color_BG}
                    unselectedColorOfTextAndIcon={validTaskName ? Color_Text : Color_BG}

                    notChangeToSelected={!validTaskName}
                    manuallySelected={true}
                    canHandlePressWhenSelected

                    onPress={onPressAddTask}

                    title={texts.add_task}

                    style={style.addTaskBtn}
                />

                <LucideIconTextEffectButton
                    selectedColorOfTextAndIcon={Color_Text}
                    selectedBackgroundColor={Color_BG}
                    unselectedColorOfTextAndIcon={Color_Text}

                    notChangeToSelected={true}

                    onPress={onPressCancel}

                    title={texts.cancel}

                    style={style.cancelBtn}
                />
            </View>
        </View>
    )
}

export default AddTaskPopup