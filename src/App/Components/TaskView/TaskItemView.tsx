import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { TaskPersistedAndRuntimeData, TaskPersistedData } from '../../Types'
import useAnimatedValue from '../../../Common/Hooks/useAnimatedValue'
import { SafeValue } from '../../../Common/UtilsTS'

const TaskItemView = ({
    task
}: {
    task: TaskPersistedAndRuntimeData
}) => {
    const onFlexingAnimationEnd = useCallback((currentValue: number) => {

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
                backgroundColor: 'gray'
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
            <Text style={style.taskNameTxt}>TaskItem</Text>
        </Animated.View>
    )
}

export default TaskItemView