import { StyleSheet, Animated } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'
import useAnimatedValue from '../../../Common/Hooks/useAnimatedValue'
import { SafeValue } from '../../../Common/UtilsTS'
import TaskItemView_Background from './TaskViewItem_Background'
import TaskItemView_Content from './TaskViewItem_Content'

// const IsLog = true

const TaskItemView = ({
    task,
    actionRemoveTask,
    onFlexingAnimationEndItem,
}: {
    actionRemoveTask: (task: TaskPersistedAndRuntimeData) => void,
    onFlexingAnimationEndItem: (isAppearOrRemove: boolean, task: TaskPersistedAndRuntimeData) => void,
    task: TaskPersistedAndRuntimeData
}) => {
    const [isShowContent, set_isShowContent] = useState(false)

    const [isShowBackground, set_isShowBackground] = useState(false)
    const [isScaleUpOrDownBackground, set_isScaleUpOrDownBackground] = useState(true)

    // remove 

    const startRemoveTask = useCallback(() => {
        set_isShowContent(false)
        set_isScaleUpOrDownBackground(false)
    }, [])

    // end background animation

    const onContentAnimationEnd = useCallback((isAppearOrRemove: boolean) => {
    }, [])

    // end background animation

    const onBackgroundAnimationEnd = useCallback((isAppearOrRemove: boolean, task: TaskPersistedAndRuntimeData) => {
        // if (IsLog) console.log('[onBackgroundAnimationEnd] isAppearOrRemove', isAppearOrRemove);

        if (isAppearOrRemove) {
            set_isShowContent(true)
        }
        else { // remove
            actionRemoveTask(task)
        }
    }, [actionRemoveTask])

    // end flexing animation

    const onFlexingAnimationEnd = useCallback((currentValue: number) => {
        const isAppearOrRemove = currentValue > 0

        if (isAppearOrRemove) { // appear => start background shows up effect
            set_isShowBackground(true)
        }

        onFlexingAnimationEndItem(isAppearOrRemove, task)
    }, [task, onFlexingAnimationEndItem])

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
                overflow: 'hidden', // for hide text content (TaskItemView_Content) SlideIn effect
            },

            taskNameTxt: {
            }
        })
    }, [])

    return (
        <Animated.View
            style={[
                style.master,
                { flex: flexingAnimatedValue }
            ]}

            onTouchEnd={startRemoveTask}
        >
            {/* background */}
            {
                isShowBackground &&
                <TaskItemView_Background
                    completedShowCallback={onBackgroundAnimationEnd}
                    task={task}
                    isScaleUpOrDown={isScaleUpOrDownBackground}
                />
            }

            {/* content */}
            {
                isShowContent &&
                <TaskItemView_Content
                    completedShowCallback={onContentAnimationEnd}
                    task={task}
                />
            }
        </Animated.View>
    )
}

export default TaskItemView