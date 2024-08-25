// Created on 23 Aug 2024 (Justodo - Lumia)
// Issues and resolutions: https://stackoverflow.com/questions/41831300/react-native-animations-translatex-and-translatey-while-scaling

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Animated, LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';
import { CommonStyles } from '../../CommonConstants';
import { CachedMeasure, CachedMeasureResult } from '../../PreservedMessure';

const SimpleSharedElements = ({
    targetCachedMeasure,
    contentView,
    backgroundView,
    isSpringOrTiming = false,
    duration = 500,
    containerStyle,
    toTargetOrOrigin = true,
    completedCallback,
    doAnimation,
}: {
    targetCachedMeasure: CachedMeasure,

    /**
     * animated 'opacity'
     */
    contentView?: React.JSX.Element,

    backgroundView?: React.JSX.Element,
    isSpringOrTiming?: boolean,
    duration?: number,
    toTargetOrOrigin?: boolean,
    containerStyle?: StyleProp<ViewStyle>,
    completedCallback?: (toTargetOrOrigin: boolean) => void,
    doAnimation?: React.MutableRefObject<(toTargetOrOrigin: boolean) => void>,
}) => {
    const thisCachedMeasure = useRef<CachedMeasure>(new CachedMeasure(true))
    const [thisCachedMeasureResult, set_thisCachedMeasureResult] = useState<CachedMeasureResult | undefined>()

    const [targetCachedMeasureResult, set_targetCachedMeasureResult] = useState<CachedMeasureResult | undefined>()

    const inited = targetCachedMeasureResult !== undefined && thisCachedMeasureResult !== undefined

    const animatedOpacity = useRef(new Animated.Value(1)).current;

    const animatedScaleX = useRef(new Animated.Value(0)).current;
    const animatedScaleY = useRef(new Animated.Value(0)).current;

    const animatedTranslateX = useRef(new Animated.Value(0)).current;
    const animatedTranslateY = useRef(new Animated.Value(0)).current;

    // const animatedBorderRadius = useRef(new Animated.Value(0)).current;

    const getOpacity = useCallback((targetOrOrigin: boolean): number => {
        return targetOrOrigin ?
            0 :
            1
    }, [targetCachedMeasureResult, thisCachedMeasureResult])

    const getScaleX = useCallback((targetOrOrigin: boolean): number => {
        if (!targetCachedMeasureResult || !thisCachedMeasureResult)
            throw new Error('[ne] SimpleSharedElements undefined messures.')

        return targetOrOrigin ?
            targetCachedMeasureResult.width / thisCachedMeasureResult.width :
            1
    }, [targetCachedMeasureResult, thisCachedMeasureResult])

    const getScaleY = useCallback((targetOrOrigin: boolean): number => {
        if (!targetCachedMeasureResult || !thisCachedMeasureResult)
            throw new Error('[ne] SimpleSharedElements undefined messures.')

        return targetOrOrigin ?
            targetCachedMeasureResult.height / thisCachedMeasureResult.height :
            1
    }, [targetCachedMeasureResult, thisCachedMeasureResult])

    const getTranslateX = useCallback((targetOrOrigin: boolean): number => {
        if (!targetCachedMeasureResult || !thisCachedMeasureResult)
            throw new Error('[ne] SimpleSharedElements undefined messures.')

        return targetOrOrigin ?
            (targetCachedMeasureResult.px - thisCachedMeasureResult.px - (thisCachedMeasureResult.width / 2 - targetCachedMeasureResult.width / 2)) :
            // 0 :
            0
    }, [targetCachedMeasureResult, thisCachedMeasureResult])

    const getTranslateY = useCallback((targetOrOrigin: boolean): number => {
        if (!targetCachedMeasureResult || !thisCachedMeasureResult)
            throw new Error('[ne] SimpleSharedElements undefined messures.')

        return targetOrOrigin ?
            (targetCachedMeasureResult.py - thisCachedMeasureResult.py - (thisCachedMeasureResult.height / 2 - targetCachedMeasureResult.height / 2)) :
            // 0 : 
            0
    }, [targetCachedMeasureResult, thisCachedMeasureResult, getScaleY])

    const setupStart = useCallback((startIsTargetOrOrigin: boolean) => {
        if (!targetCachedMeasureResult || !thisCachedMeasureResult)
            throw new Error('[ne] SimpleSharedElements undefined messures.')

        animatedOpacity.setValue(getOpacity(startIsTargetOrOrigin))

        animatedScaleX.setValue(getScaleX(startIsTargetOrOrigin))
        animatedScaleY.setValue(getScaleY(startIsTargetOrOrigin))

        animatedTranslateX.setValue(getTranslateX(startIsTargetOrOrigin))
        animatedTranslateY.setValue(getTranslateY(startIsTargetOrOrigin))
    }, [
        thisCachedMeasureResult,
        targetCachedMeasureResult,

        getOpacity,

        getScaleX,
        getScaleY,

        getTranslateX,
        getTranslateY
    ])

    const onLayout = useCallback(async (_: LayoutChangeEvent) => {
        if (targetCachedMeasureResult && thisCachedMeasureResult)
            return

        const [
            _thisCachedMeasureResult,
            _targetCachedMeasureResult
        ] = await Promise.all([
            thisCachedMeasure.current.GetOrMeasureAsync(),
            targetCachedMeasure.GetOrMeasureAsync(),
        ])

        set_thisCachedMeasureResult(_thisCachedMeasureResult)
        set_targetCachedMeasureResult(_targetCachedMeasureResult)

        // console.log('thisCachedMeasure', _thisCachedMeasureResult);
        // console.log('targetCachedMeasure', _targetCachedMeasureResult);
    }, [thisCachedMeasureResult, targetCachedMeasureResult])

    const startAnimate = (toTargetOrOrigin: boolean) => {
        setupStart(!toTargetOrOrigin)

        // console.log(getScaleY(toTargetOrOrigin), getTranslateX(toTargetOrOrigin), getTranslateY(toTargetOrOrigin));

        Animated.parallel([
            (!isSpringOrTiming ? Animated.timing : Animated.spring)(animatedOpacity, {
                toValue: getOpacity(toTargetOrOrigin),
                duration,
                useNativeDriver: false,
            }),

            (!isSpringOrTiming ? Animated.timing : Animated.spring)(animatedScaleX, {
                toValue: getScaleX(toTargetOrOrigin),
                duration,
                useNativeDriver: false,
            }),

            (!isSpringOrTiming ? Animated.timing : Animated.spring)(animatedScaleY, {
                toValue: getScaleY(toTargetOrOrigin),
                duration,
                useNativeDriver: false,
            }),

            (!isSpringOrTiming ? Animated.timing : Animated.spring)(animatedTranslateX, {
                toValue: getTranslateX(toTargetOrOrigin),
                duration,
                useNativeDriver: false,
            }),

            (!isSpringOrTiming ? Animated.timing : Animated.spring)(animatedTranslateY, {
                toValue: getTranslateY(toTargetOrOrigin),
                duration,
                useNativeDriver: false,
            }),

            // (!isSpringOrTiming ? Animated.timing : Animated.spring)(animatedBorderRadius, {
            //     toValue: toBorderRadius,
            //     duration,
            //     useNativeDriver: false,
            // }),
        ]).start(() => completedCallback?.(toTargetOrOrigin));
    }

    if (doAnimation)
        doAnimation.current = startAnimate

    useEffect(() => {
        if (!inited)
            return

        startAnimate(toTargetOrOrigin)
    }, [toTargetOrOrigin]);


    return (
        // translate XY view
        <Animated.View
            onLayout={onLayout}
            ref={thisCachedMeasure.current.theRef}
            style={[
                CommonStyles.justifyContentCenter_AlignItemsCenter,
                { opacity: inited ? 1 : 0 },
                containerStyle,

                inited ?
                    {
                        transform: [
                            { translateX: animatedTranslateX },
                            { translateY: animatedTranslateY },
                        ]
                    } :
                    undefined,
            ]}
        >
            {/* scale XY view */}
            <Animated.View
                style={[
                    CommonStyles.width100PercentHeight100Percent,

                    inited ?
                        {
                            transform: [
                                { scaleX: animatedScaleX },
                                { scaleY: animatedScaleY },
                            ]
                        } :
                        undefined,
                ]}
            >
                {/* opacity view */}
                <View
                    style={[
                        CommonStyles.width100PercentHeight100Percent,
                    ]}
                >
                    {backgroundView}
                </View>

                {/* opacity view */}
                <Animated.View
                    style={[
                        CommonStyles.width100PercentHeight100Percent,
                        {
                            position: 'absolute',
                            opacity: animatedOpacity
                        }
                    ]}
                >
                    {contentView}
                </Animated.View>
            </Animated.View>
        </Animated.View >
    )
}

export default SimpleSharedElements