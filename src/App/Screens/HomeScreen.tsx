import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import BackgroundNavigator from './Background/BackgroundNavigator'
import RowContainerView from '../Components/TaskView/RowContainerView'
import { TaskPersistedAndRuntimeData, TaskPersistedData } from '../Types'
import { CloneObject, IsValuableArrayOrString, RandomInt } from '../../Common/UtilsTS'
import { IsTaskPersistedDataEqual } from '../Handles/AppUtils'
import { CommonStyles } from '../../Common/CommonConstants'
import LucideIconTextEffectButton from '../../Common/Components/LucideIconTextEffectButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Outline } from '../Constants/Constants_Outline'
import { IconSize } from '../Constants/Constants_Size'
import { CachedMeassure } from '../../Common/PreservedMessure'
import SimpleSharedElements from '../../Common/Components/Effects/SimpleSharedElements'
import { LucideIcon } from '../../Common/Components/LucideIcon'

const HomeScreen = ({
    shouldShowPaywallFirstTime,
}: {
    shouldShowPaywallFirstTime: boolean,
}) => {
    const safeAreaInsets = useSafeAreaInsets()
    const [taskRows, set_taskRows] = useState<TaskPersistedData[][]>([])
    const [showAddTaskPopup, set_showAddTaskPopup] = useState(false)
    const addTaskBtnCachedMeassure = useRef<CachedMeassure>(new CachedMeassure(true))

    const startAnimate = useRef<(toTargetOrOrigin: boolean) => void>((s) => { })

    const addRandomTask = () => {
        const newTask: TaskPersistedData = {
            uniqueTaskName: RandomInt(0, 9999).toString()
        }

        // console.log('added', newTask);

        if (taskRows.length <= 0)
            taskRows.push([])

        taskRows[0].push(newTask)

        set_taskRows(CloneObject(taskRows))
    }

    const actionRemoveTask = useCallback((task: TaskPersistedAndRuntimeData) => {
        for (let row of taskRows) {
            const idx = row.findIndex(t => IsTaskPersistedDataEqual(t, task.persistedData))

            if (idx < 0)
                continue

            row.splice(idx, 1)
            const final = CloneObject(taskRows)
            set_taskRows(final)

            // console.log('removeee', task, final);

            return
        }
    }, [taskRows])

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                flex: 1
            },

            overlayBackgroundView: {
                position: 'absolute', backgroundColor: 'mintcream', width: '100%', height: '100%'
            },

            bottomBarView: {
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: safeAreaInsets.bottom > 0 ? safeAreaInsets.bottom : Outline.Normal,
                marginHorizontal: Outline.Normal,

                // backgroundColor: 'pink',
                // opacity: 0.7,
            },

            addTaskBtn: {
                padding: Outline.Small,
                backgroundColor: 'black',
                minWidth: '17%',
                justifyContent: 'center',
                alignItems: 'center',
            }
        })
    }, [safeAreaInsets])

    return (
        <View style={style.master}>
            {/* background */}
            <BackgroundNavigator />

            <View style={style.overlayBackgroundView}>
                {/* tasks */}
                <View style={CommonStyles.flex_1}>
                    {
                        IsValuableArrayOrString(taskRows) && IsValuableArrayOrString(taskRows[0]) &&
                        <RowContainerView
                            isFirstRow={true}
                            paramTasks={taskRows[0]}
                            actionRemoveTask={actionRemoveTask}
                        />
                    }
                </View>

                {/* bottom bar */}
                <View
                    ref={addTaskBtnCachedMeassure.current.theRef}
                    style={style.bottomBarView}
                >
                    {/* add task btn */}
                    <TouchableOpacity>
                        <View
                            style={style.addTaskBtn}
                        >
                            <LucideIcon name='Plus' color={'white'} />
                        </View>
                    </TouchableOpacity>
                </View>

                {
                    showAddTaskPopup &&
                    <View pointerEvents='none' style={CommonStyles.width100Percent_Height100Percent_PositionAbsolute_JustifyContentCenter_AlignItemsCenter}>
                        <SimpleSharedElements
                            containerStyle={{
                                // flex: 1,

                                height: 500,
                                width: 300,

                                backgroundColor: 'whitesmoke'
                            }}

                            children={
                                <View
                                    style={{
                                        // flex: 1,
                                        height: '100%',
                                        width: '100%',
                                        backgroundColor: 'green'
                                    }}
                                />
                            }

                            targetCachedMeassure={addTaskBtnCachedMeassure.current}

                            doAnimation={startAnimate}
                        />
                    </View>
                }
            </View>
        </View>
    )
}

export default HomeScreen