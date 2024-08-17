import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TaskPersistedAndRuntimeData, TaskPersistedData } from '../../Types'
import useAnimatedValue from '../../../Common/Hooks/useAnimatedValue'
import { RandomColor, SafeValue } from '../../../Common/UtilsTS'
import TaskItemView_Background from '../TaskViewItem_Background'

const TaskItemView = ({
    task
}: {
    task: TaskPersistedAndRuntimeData
}) => {
    const [isShowBackground, set_isShowBackground] = useState(false)

    const onFlexingAnimationEnd = useCallback((currentValue: number) => {
        // console.log('done flexing', currentValue, task);

        const isAppearOrRemove = currentValue > 0

        if (isAppearOrRemove) { // appear => start background shows up effect
            set_isShowBackground(true)
        }
    }, [task])

    const onBackgroundAnimationEnd = useCallback((isAppearOrRemove: boolean) => {
        console.log('[onBackgroundAnimationEnd] isAppearOrRemove', isAppearOrRemove);
    }, [])

    const {
        animatedValue: flexingAnimatedValue,
        startAnimation: flexingStartAnimation,
        currentValueRef: flexingCurrentValueRef
    } = useAnimatedValue(0, onFlexingAnimationEnd)

    // on changed target flex

    useEffect(() => {
        const targetFlex = SafeValue(task.runtimeData?.targetFlex, -1)

        if (targetFlex < 0)
            return

        flexingStartAnimation(targetFlex)
    }, [task.runtimeData?.targetFlex])

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                backgroundColor: "#fff0f5",
            },

            taskNameTxt: {
            }
        })
    }, [])

    return (
        <Animated.View style={[
            style.master,
            { flex: flexingAnimatedValue }
        ]}>
            {/* background */}
            {
                isShowBackground &&
                <TaskItemView_Background
                    completedShowCallback={onBackgroundAnimationEnd}
                    task={task}

                />
            }
        </Animated.View>
    )
}

export default TaskItemView