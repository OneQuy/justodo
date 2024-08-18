import { StyleSheet, Animated } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'
import useAnimatedValue from '../../../Common/Hooks/useAnimatedValue'
import { SafeValue } from '../../../Common/UtilsTS'
import TaskItemView_Background from './TaskViewItem_Background'
import TaskItemView_Content from './TaskViewItem_Content'

const IsLog = true

const TaskItemView = ({
    task
}: {
    task: TaskPersistedAndRuntimeData
}) => {
    const [isShowContent, set_isShowContent] = useState(false)
    const [isShowBackground, set_isShowBackground] = useState(false)

    // end flexing animation

    const onFlexingAnimationEnd = useCallback((currentValue: number) => {
        // console.log('done flexing', currentValue, task);

        const isAppearOrRemove = currentValue > 0

        if (isAppearOrRemove) { // appear => start background shows up effect
            set_isShowBackground(true)
        }
    }, [task])

    // end background animation

    const onBackgroundAnimationEnd = useCallback((isAppearOrRemove: boolean) => {
        // if (IsLog) console.log('[onBackgroundAnimationEnd] isAppearOrRemove', isAppearOrRemove);
    }, [])

    // flexing vars

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

            {/* content */}
            {
                // isShowBackground &&
                <TaskItemView_Content
                    completedShowCallback={onBackgroundAnimationEnd}
                    task={task}
                />
            }
        </Animated.View>
    )
}

export default TaskItemView