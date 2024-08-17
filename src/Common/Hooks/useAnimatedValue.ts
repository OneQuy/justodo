import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const useAnimatedValue = (initialValue: number, onAnimationComplete?: (currentValue: number) => void) => {
    const animatedValue = useRef(new Animated.Value(initialValue)).current;
    const currentValueRef = useRef(initialValue);

    useEffect(() => {
        // Add a listener to update the ref whenever the animated value changes
        const listenerId = animatedValue.addListener(({ value }) => {
            currentValueRef.current = value;
        });

        // Cleanup the listener when the component unmounts
        return () => {
            animatedValue.removeListener(listenerId);
        };
    }, [animatedValue]);

    const startAnimation = (toValue: number, duration?: number, useNativeDriver = false) => {
        Animated.timing(animatedValue, {
            toValue,
            duration,
            useNativeDriver, // Set to true if using transform properties
        }).start(() => {
            if (onAnimationComplete) {
                onAnimationComplete(currentValueRef.current);
            }
        });
    };

    return { animatedValue, currentValueRef, startAnimation };
};

export default useAnimatedValue