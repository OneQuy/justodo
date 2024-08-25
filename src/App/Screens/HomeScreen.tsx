import { View, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import BackgroundNavigator from './Background/BackgroundNavigator'
import RowContainerView from '../Components/TaskView/RowContainerView'
import { TaskPersistedAndRuntimeData, TaskPersistedData } from '../Types'
import { CloneObject, IsValuableArrayOrString, RandomInt } from '../../Common/UtilsTS'
import { IsTaskPersistedDataEqual } from '../Handles/AppUtils'
import { CommonStyles } from '../../Common/CommonConstants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Outline } from '../Constants/Constants_Outline'
import SimpleSharedElements from '../../Common/Components/Effects/SimpleSharedElements'
import { LucideIcon } from '../../Common/Components/LucideIcon'
import { CachedMeasure } from '../../Common/PreservedMessure'
import ScaleUpView from '../../Common/Components/Effects/ScaleUpView'
import { Color_BG, Color_Text } from '../Hooks/useTheme'

const ShowAddTaskPopupDuration = 300

const HomeScreen = ({
    shouldShowPaywallFirstTime,
}: {
    shouldShowPaywallFirstTime: boolean,
}) => {
    const safeAreaInsets = useSafeAreaInsets()
    const [taskRows, set_taskRows] = useState<TaskPersistedData[][]>([])
    const addTaskBtnCachedMeasure = useRef<CachedMeasure>(new CachedMeasure(true))

    const [showAddTaskPopup, set_showAddTaskPopup] = useState(false)
    const [toTargetOrOriginAddTaskPopup, set_toTargetOrOriginAddTaskPopup] = useState(false)
    const [isScaleUpOrDownPlusIconAddTaskBtn, set_isScaleUpOrDownPlusIconAddTaskBtn] = useState(true)

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

    const startCloseAddTaskPopup = useCallback(() => {
        set_toTargetOrOriginAddTaskPopup(true)
        set_isScaleUpOrDownPlusIconAddTaskBtn(true)
    }, [])

    const startShowAddTaskPopup = useCallback(() => {
        if (!showAddTaskPopup) { // not showed yet
            set_showAddTaskPopup(true)
            set_toTargetOrOriginAddTaskPopup(false)
            set_isScaleUpOrDownPlusIconAddTaskBtn(false)
        }
    }, [showAddTaskPopup])

    const completedCallbackAddTaskPopupAnimation = useCallback((toTargetOrOrigin: boolean) => {
        if (toTargetOrOrigin) { // closed popup
            set_showAddTaskPopup(false)
        }
    }, [])

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

    const marginBottom: number = useMemo(() => {
        return safeAreaInsets.bottom > 0 ? safeAreaInsets.bottom : Outline.Normal
    }, [safeAreaInsets])

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
                marginBottom,
                marginHorizontal: Outline.Normal,

                // backgroundColor: 'pink',
                // opacity: 0.7,
            },

            addTaskBtn: {
                padding: Outline.Small,
                backgroundColor: Color_BG,
                minWidth: '17%',
                justifyContent: 'center',
                alignItems: 'center',
            },

            addTaskPopupAbsolute: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: marginBottom,
                paddingHorizontal: Outline.Normal,
                // backgroundColor: 'red',
            },
        })
    }, [marginBottom])

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

                {/* add task popup (absolute) */}
                {
                    showAddTaskPopup &&
                    <View style={style.addTaskPopupAbsolute}>
                        <SimpleSharedElements
                            containerStyle={{ // this must be the config for the visible view of this component
                                height: '50%', // free to adjust
                                width: '100%', // free to adjust

                                // backgroundColor: 'pink'
                            }}

                            backgroundView={
                                <View
                                    style={[
                                        // must
                                        CommonStyles.width100PercentHeight100Percent, // must 100%

                                        // optionals
                                        {
                                            backgroundColor: Color_BG,
                                        }
                                    ]}
                                />
                            }

                            contentView={ // this maybe animated opacity
                                <View
                                    style={[
                                        // must
                                        CommonStyles.width100PercentHeight100Percent, // must 100%

                                        // optionals
                                        {
                                        }
                                    ]}
                                >
                                    <Text style={{ color: Color_Text }}>hehehe</Text>
                                    <Text style={{ color: Color_Text }}>hehehe</Text>
                                    <Text style={{ color: Color_Text }}>hehehe</Text>
                                    <Text style={{ color: Color_Text }}>hehehe</Text>
                                    <Text style={{ color: Color_Text }}>hehehe</Text>
                                    <Button title='close' onPress={startCloseAddTaskPopup} />
                                </View>
                            }

                            autoAnimateOnLayout={true}
                            toTargetOrOrigin={toTargetOrOriginAddTaskPopup}
                            targetCachedMeasure={addTaskBtnCachedMeasure.current}
                            duration={ShowAddTaskPopupDuration}
                            isSpringOrTiming={false}
                            completedCallback={completedCallbackAddTaskPopupAnimation}
                            doAnimation={startAnimate}
                        />
                    </View>
                }

                {/* bottom bar */}
                <View
                    style={style.bottomBarView}
                >
                    {/* add task btn */}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={startShowAddTaskPopup}
                    >
                        <View
                            ref={addTaskBtnCachedMeasure.current.theRef}
                            style={style.addTaskBtn}
                        >
                            <ScaleUpView
                                isScaleUpOrDown={isScaleUpOrDownPlusIconAddTaskBtn}
                                duration={ShowAddTaskPopupDuration}
                                isSpringOrTiming={false}
                            >
                                <LucideIcon name='Plus' color={Color_Text} />
                            </ScaleUpView>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default HomeScreen