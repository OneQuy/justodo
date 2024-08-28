// Created on 22 June 2024 (Vocaby)

import React, { useRef, useEffect, useCallback } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { CommonStyles } from '../../CommonConstants';

const ScaleUpView = ({
    children,
    isSpringOrTiming = true,
    disable = false,
    duration = 500,
    delay,
    containerStyle,
    isScaleUpOrDown = true,
    completedCallback,
}: {
    children: React.JSX.Element[] | React.JSX.Element,
    isSpringOrTiming?: boolean,
    disable?: boolean,
    duration?: number,
    delay?: number,
    isScaleUpOrDown?: boolean,
    containerStyle?: StyleProp<ViewStyle>,
    completedCallback?: (isScaleUpOrDown: boolean) => void,
}) => {
    const scaleValue = useRef(new Animated.Value(disable ? 1 : 0)).current;

    const animate = useCallback(() => {
        const startValue = isScaleUpOrDown ? 0 : 1
        const toValue = isScaleUpOrDown ? 1 : 0

        scaleValue.setValue(startValue)

        if (isSpringOrTiming === true) {
            Animated.spring(scaleValue, {
                toValue,
                delay,
                useNativeDriver: true,
            }).start(() => completedCallback?.(isScaleUpOrDown))
        }
        else {
            Animated.timing(scaleValue, {
                toValue,
                duration,
                delay,
                useNativeDriver: true,
            }).start(() => completedCallback?.(isScaleUpOrDown))
        }
    }, [isScaleUpOrDown, isSpringOrTiming, completedCallback]);

    useEffect(() => {
        if (disable)
            return

        animate()
    }, [isScaleUpOrDown, disable]);

    return (
        <Animated.View
            style={[
                CommonStyles.justifyContentCenter_AlignItemsCenter,
                containerStyle,
                { transform: [{ scale: scaleValue }] }
            ]}
        >
            {children}
        </Animated.View>
    );
};

export default ScaleUpView;
