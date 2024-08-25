import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
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

const HomeScreen = ({
    shouldShowPaywallFirstTime,
}: {
    shouldShowPaywallFirstTime: boolean,
}) => {
    const safeAreaInsets = useSafeAreaInsets()
    const [taskRows, set_taskRows] = useState<TaskPersistedData[][]>([])
    const addTaskBtnCachedMeasure = useRef<CachedMeasure>(new CachedMeasure(true))

    const [showAddTaskPopup, set_showAddTaskPopup] = useState(false)
    const [addTaskPopupStateOpenOrClose, set_addTaskPopupStateOpenOrClose] = useState(false)

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

    const completedCallbackAddTaskPopupAnimation = useCallback((toTargetOrOrigin: boolean) => {
        // console.log(toTargetOrOrigin);

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
                backgroundColor: 'black',
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

                {/* bottom bar */}
                <View
                    style={style.bottomBarView}
                >
                    {/* add task btn */}
                    <TouchableOpacity
                        onPress={() => set_addTaskPopupStateOpenOrClose(t => !t)}
                    >
                        <View
                            ref={addTaskBtnCachedMeasure.current.theRef}
                            style={style.addTaskBtn}
                        >
                            <LucideIcon name='Plus' color={'white'} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* add task popup */}
                {
                    // showAddTaskPopup &&
                    <View pointerEvents='none' style={style.addTaskPopupAbsolute}>
                        <SimpleSharedElements
                            containerStyle={{ // // this must be the config for the visible view of this component
                                height: '50%', // free to adjust
                                width: '100%', // free to adjust

                                // backgroundColor: 'pink'
                            }}

                            backgroundView={
                                <View
                                    style={{
                                        // must

                                        height: '100%', // must 100%
                                        width: '100%', // must 100%

                                        // optionals

                                        backgroundColor: 'red',
                                    }}
                                />
                            }

                            contentView={
                                <View
                                    style={{
                                        // must

                                        height: '100%', // must 100%
                                        width: '100%', // must 100%
                                    }}
                                >
                                    <Text style={{ color: 'white' }}>hehehe</Text>
                                    <Text style={{ color: 'white' }}>hehehe</Text>
                                    <Text style={{ color: 'white' }}>hehehe</Text>
                                    <Text style={{ color: 'white' }}>hehehe</Text>
                                    <Text style={{ color: 'white' }}>hehehe</Text>
                                </View>
                            }

                            toTargetOrOrigin={!addTaskPopupStateOpenOrClose}
                            targetCachedMeasure={addTaskBtnCachedMeasure.current}
                            duration={2000}
                            isSpringOrTiming={true}
                            completedCallback={completedCallbackAddTaskPopupAnimation}
                            doAnimation={startAnimate}
                        />
                    </View>
                }
            </View>
        </View>
    )
}

export default HomeScreen