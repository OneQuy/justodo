// Created on 22 June 2024 (Vocaby)

import React, { useRef, useEffect } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { CommonStyles } from '../../CommonConstants';

const ScaleUpView = ({
    children,
    isSpringOrTiming = true,
    duration = 500,
    delay,
    containerStyle,
    isScaleUpOrDown,
    completedCallback,
}: {
    children: React.JSX.Element,
    isSpringOrTiming?: boolean,
    duration?: number,
    delay?: number,
    isScaleUpOrDown?: boolean,
    containerStyle?: StyleProp<ViewStyle>,
    completedCallback?: () => void,
}) => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const toValue = isScaleUpOrDown ? 1 : 0

        if (isSpringOrTiming === true) {
            Animated.spring(scaleValue, {
                toValue,
                delay,
                useNativeDriver: true,
            }).start(completedCallback)
        }
        else {
            Animated.timing(scaleValue, {
                toValue,
                duration,
                delay,
                useNativeDriver: true,
            }).start(completedCallback);
        }
    }, [isScaleUpOrDown]);

    return (
        <Animated.View style={[CommonStyles.justifyContentCenter_AlignItemsCenter, containerStyle, { transform: [{ scale: scaleValue }] }]}>
            {children}
        </Animated.View>
    );
};

export default ScaleUpView;
