import { StyleSheet, Animated } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'
import useAnimatedValue from '../../../Common/Hooks/useAnimatedValue'
import { SafeValue } from '../../../Common/UtilsTS'
import FlipCard from '../../../Common/Components/FlipCard'
import TaskViewItem_FrontFace from './TaskViewItem_FrontFace'
import TaskViewItem_BackFace from './TaskViewItem_BackFace'

// const IsLog = true

const TaskItemView = ({
    task,
    isFirstRow,
    actionRemoveTask,
    onFlexingAnimationEndItem,
}: {
    isFirstRow: boolean,
    actionRemoveTask: (task: TaskPersistedAndRuntimeData) => void,
    onFlexingAnimationEndItem: (isAppearOrRemove: boolean, task: TaskPersistedAndRuntimeData) => void,
    task: TaskPersistedAndRuntimeData
}) => {
    const [isActiveBackgroundFrontFace, set_isActiveBackgroundFrontFace] = useState(false)

    // render front face

    const renderFrontFace = useCallback(() => {
        return (
            <TaskViewItem_FrontFace
                isFirstRow={isFirstRow}
                task={task}
                actionRemoveTask={actionRemoveTask}
                isActiveBackgroundFrontFace={isActiveBackgroundFrontFace}
            />
        )
    }, [task, isFirstRow, isActiveBackgroundFrontFace, actionRemoveTask, onFlexingAnimationEndItem])

    // render back face

    const renderBackFace = useCallback(() => {
        return (
            <TaskViewItem_BackFace />
        )
    }, [])

    // end flexing animation

    const onFlexingAnimationEnd = useCallback((currentValue: number) => {
        const isAppearOrRemove = currentValue > 0

        if (isAppearOrRemove) { // appear => start background shows up effect
            set_isActiveBackgroundFrontFace(true)
        }

        onFlexingAnimationEndItem(isAppearOrRemove, task)
    }, [task, onFlexingAnimationEndItem])

    // flexing vars

    const {
        animatedValue: flexingAnimatedValue,
        startAnimation: flexingStartAnimation,
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
                // overflow: 'hidden', // for hide text content (TaskItemView_Content) SlideIn effect
            },
        })
    }, [])

    return (
        <Animated.View
            style={[
                style.master,
                { flex: flexingAnimatedValue }
            ]}
        >
            <FlipCard
                frontView={renderFrontFace()}
                backView={renderBackFace()}
            />
        </Animated.View>
    )
}

export default TaskItemView