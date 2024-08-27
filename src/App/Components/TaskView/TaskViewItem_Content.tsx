import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'
import SlideInView from '../../../Common/Components/Effects/SlideInView'
import LucideIconTextEffectButton from '../../../Common/Components/LucideIconTextEffectButton'
import { IconSize } from '../../Constants/Constants_Size'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontBold, FontSize } from '../../Constants/Constants_FontSize'
import TickTask from './TickTask'
import { Gap } from '../../Constants/Constants_Outline'

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

            topbarView: {
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%',
                // flex: 1,
            },

            taskNameView: {
                flex: 1,
                gap: Gap.Normal,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',

                // backgroundColor: 'pink',
            },

            taskNameTxt: {
                // color: 'balck',
                fontSize: FontSize.Medium,
                fontWeight: FontBold.Bold,
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
                <View style={style.topbarView}>
                    <LucideIconTextEffectButton
                        selectedBackgroundColor={'#000000'}
                        selectedColorOfTextAndIcon={'#ffffff'}
                        iconProps={{ name: 'MoreHorizontal', size: IconSize.Normal }}

                    // style={style.addTaskBtn}
                    // onPress={startRemoveTask}
                    />
                </View>

                {/* task name */}

                <View style={style.taskNameView}>
                    <TickTask />
                    <Text numberOfLines={2} adjustsFontSizeToFit style={style.taskNameTxt}>{task.persistedData.uniqueTaskName}</Text>
                </View>
            </View>
        </SlideInView>
    )
}

export default TaskItemView_Content