// Created on 23 Aug 2024 (Justodo - Lumia)

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Animated, LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import { CommonStyles } from '../../CommonConstants';
import { CachedMeassure, CachedMeassureResult } from '../../PreservedMessure';

const SimpleSharedElements = ({
    targetCachedMeassure,
    children,
    isSpringOrTiming = true,
    duration = 500,
    containerStyle,
    toTargetOrOrigin = true,
    completedCallback,
    doAnimation,
}: {
    targetCachedMeassure: CachedMeassure,
    children: React.JSX.Element,
    isSpringOrTiming?: boolean,
    duration?: number,
    toTargetOrOrigin?: boolean,
    containerStyle?: StyleProp<ViewStyle>,
    completedCallback?: (toTargetOrOrigin: boolean) => void,
    doAnimation?: React.MutableRefObject<(toTargetOrOrigin: boolean) => void>,
}) => {
    const thisCachedMeassure = useRef<CachedMeassure>(new CachedMeassure(true))
    const [thisCachedMeassureResult, set_thisCachedMeassureResult] = useState<CachedMeassureResult | undefined>()

    const [targetCachedMeassureResult, set_targetCachedMeassureResult] = useState<CachedMeassureResult | undefined>()

    const animatedScaleX = useRef(new Animated.Value(0)).current;
    const animatedScaleY = useRef(new Animated.Value(0)).current;

    const animatedTranslateX = useRef(new Animated.Value(0)).current;
    const animatedTranslateY = useRef(new Animated.Value(0)).current;

    // const animatedBorderRadius = useRef(new Animated.Value(0)).current;

    // const [inited, set_inited] = useState(false)

    // const getWidth = useCallback((targetOrOrigin: boolean): number => {
    //     if (!targetCachedMeassureResult || !thisCachedMeassureResult)
    //         throw new Error('[ne] SimpleSharedElements undefined messures.')

    //     return targetOrOrigin ?
    //         targetCachedMeassureResult.width :
    //         thisCachedMeassureResult.width
    // }, [targetCachedMeassureResult, thisCachedMeassureResult])

    // const getHeight = useCallback((targetOrOrigin: boolean): number => {
    //     if (!targetCachedMeassureResult || !thisCachedMeassureResult)
    //         throw new Error('[ne] SimpleSharedElements undefined messures.')

    //     return targetOrOrigin ?
    //         targetCachedMeassureResult.height :
    //         thisCachedMeassureResult.height
    // }, [targetCachedMeassureResult, thisCachedMeassureResult])

    const getScaleX = useCallback((targetOrOrigin: boolean): number => {
        if (!targetCachedMeassureResult || !thisCachedMeassureResult)
            throw new Error('[ne] SimpleSharedElements undefined messures.')

        return targetOrOrigin ?
            targetCachedMeassureResult.width / thisCachedMeassureResult.width :
            1
    }, [targetCachedMeassureResult, thisCachedMeassureResult])

    const getScaleY = useCallback((targetOrOrigin: boolean): number => {
        if (!targetCachedMeassureResult || !thisCachedMeassureResult)
            throw new Error('[ne] SimpleSharedElements undefined messures.')

        return targetOrOrigin ?
            targetCachedMeassureResult.height / thisCachedMeassureResult.height :
            1
    }, [targetCachedMeassureResult, thisCachedMeassureResult])

    const getTranslateX = useCallback((targetOrOrigin: boolean): number => {
        if (!targetCachedMeassureResult || !thisCachedMeassureResult)
            throw new Error('[ne] SimpleSharedElements undefined messures.')

        return targetOrOrigin ?
            // (thisCachedMeassureResult.width - targetCachedMeassureResult.width)  :
            // (targetCachedMeassureResult.px - thisCachedMeassureResult.px) / 2 :
            0 :
            0
    }, [targetCachedMeassureResult, thisCachedMeassureResult])

    const getTranslateY = useCallback((targetOrOrigin: boolean): number => {
        if (!targetCachedMeassureResult || !thisCachedMeassureResult)
            throw new Error('[ne] SimpleSharedElements undefined messures.')

        return targetOrOrigin ?
            (thisCachedMeassureResult.height + targetCachedMeassureResult.height) / 2 :
            0
    }, [targetCachedMeassureResult, thisCachedMeassureResult, getScaleY])

    const setupStart = useCallback((startIsTargetOrOrigin: boolean) => {
        if (!targetCachedMeassureResult || !thisCachedMeassureResult)
            throw new Error('[ne] SimpleSharedElements undefined messures.')

        // animatedHeight.setValue(getHeight(startIsTargetOrOrigin))
        // animatedWidth.setValue(getWidth(startIsTargetOrOrigin))

        animatedScaleX.setValue(getScaleX(startIsTargetOrOrigin))
        animatedScaleY.setValue(getScaleY(startIsTargetOrOrigin))

        animatedTranslateX.setValue(getTranslateX(startIsTargetOrOrigin))
        animatedTranslateY.setValue(getTranslateY(startIsTargetOrOrigin))
    }, [
        thisCachedMeassureResult,
        targetCachedMeassureResult,

        // getHeight,
        // getWidth,

        getScaleX,
        getScaleY,

        getTranslateX,
        getTranslateY
    ])

    const onLayout = useCallback((_: LayoutChangeEvent) => {
        if (targetCachedMeassureResult && thisCachedMeassureResult)
            return

        thisCachedMeassure.current.GetOrMessure((m) => {
            set_thisCachedMeassureResult(m)

            console.log('thisCachedMeassure', m);
        })

        targetCachedMeassure.GetOrMessure((m) => {
            set_targetCachedMeassureResult(m)

            console.log('targetCachedMeassure', m);
        })
    }, [thisCachedMeassureResult, targetCachedMeassureResult])

    const startAnimate = (toTargetOrOrigin: boolean) => {
        setupStart(!toTargetOrOrigin)

        // console.log(getScaleY(toTargetOrOrigin), getTranslateX(toTargetOrOrigin), getTranslateY(toTargetOrOrigin));

        Animated.parallel([
            Animated.timing(animatedScaleX, {
                toValue: getScaleX(toTargetOrOrigin),
                duration,
                useNativeDriver: false,
            }),

            Animated.timing(animatedScaleY, {
                toValue: getScaleY(toTargetOrOrigin),
                duration,
                useNativeDriver: false,
            }),

            Animated.timing(animatedTranslateX, {
                toValue: getTranslateX(toTargetOrOrigin),
                duration,
                useNativeDriver: false,
            }),

            Animated.timing(animatedTranslateY, {
                toValue: getTranslateY(toTargetOrOrigin),
                duration,
                useNativeDriver: false,
            }),

            // Animated.timing(animatedBorderRadius, {
            //     toValue: toBorderRadius,
            //     duration,
            //     useNativeDriver: false,
            // }),
        ]).start();
    }

    if (doAnimation)
        doAnimation.current = startAnimate

    // useEffect(() => {
    // }, []);

    return (
        <Animated.View
            onLayout={onLayout}
            ref={thisCachedMeassure.current.theRef}
            style={[
                CommonStyles.justifyContentCenter_AlignItemsCenter,
                containerStyle,

                thisCachedMeassureResult && targetCachedMeassureResult ?
                    {
                        transform: [
                            { translateX: animatedTranslateX },
                            { translateY: animatedTranslateY },
                        ]
                    } :
                    undefined,
            ]}
        >
            <Animated.View
                style={[

                    CommonStyles.width100PercentHeight100Percent,
                    // CommonStyles.justifyContentCenter_AlignItemsCenter,

                    thisCachedMeassureResult && targetCachedMeassureResult ?
                        {
                            transform: [
                                { scaleX: animatedScaleX },
                                { scaleY: animatedScaleY },
                            ]
                        } :
                        undefined,
                ]}
            >
                {children}
            </Animated.View>
        </Animated.View >
    )
}

export default SimpleSharedElements