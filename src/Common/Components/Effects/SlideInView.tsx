// Created on 22 June 2024 (Vocaby)

import React, { useRef, useEffect } from 'react';
import { Animated, Dimensions, StyleProp, ViewStyle } from 'react-native';

const SlideInView = ({
    children,
    from = 'right',
    isSpringOrTiming = true,
    duration = 500,
    delay,
    isInOrOut = true,
    containerStyle,
    completedCallback,
}: {
    children: React.JSX.Element,
    from?: 'left' | 'right' | 'top' | 'bottom',
    isSpringOrTiming?: boolean,
    duration?: number,
    delay?: number,
    isInOrOut?: boolean,
    completedCallback?: (isInOrOut: boolean) => void,
    containerStyle?: StyleProp<ViewStyle>,
}) => {
    const translateValue = useRef(new Animated.Value(isInOrOut ? Number.MAX_VALUE : 0)).current;

    useEffect(() => {
        let outsidePosition;
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;

        switch (from) {
            case 'left':
                outsidePosition = -screenWidth;
                break;
            case 'right':
                outsidePosition = screenWidth;
                break;
            case 'top':
                outsidePosition = -screenHeight;
                break;
            case 'bottom':
                outsidePosition = screenHeight;
                break;
            default:
                outsidePosition = -screenWidth;
        }

        const startPosition = isInOrOut ? outsidePosition : 0
        const targetPosition = isInOrOut ? 0 : outsidePosition

        translateValue.setValue(startPosition);

        if (isSpringOrTiming) {
            Animated.spring(translateValue, {
                toValue: targetPosition,
                delay,
                useNativeDriver: true,
            }).start(() => completedCallback?.(isInOrOut))
        }
        else {
            Animated.timing(translateValue, {
                toValue: targetPosition,
                duration,
                delay,
                useNativeDriver: true,
            }).start(() => completedCallback?.(isInOrOut))
        }
    }, [isInOrOut]);

    const transformStyle =
    {
        transform: [
            {
                translateX: from === 'left' || from === 'right' ? translateValue : 0,
            },
            {
                translateY: from === 'top' || from === 'bottom' ? translateValue : 0
            }
        ],
    };

    return (
        <Animated.View style={[transformStyle, containerStyle]}>
            {children}
        </Animated.View>
    );
};

export default SlideInView