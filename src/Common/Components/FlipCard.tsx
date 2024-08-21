import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, ViewStyle, StyleProp } from 'react-native';
import { CommonStyles } from '../CommonConstants';

/**
 * ### usage
 * ```tsx
<FlipCard
    frontView={
        <View style={{ flex: 1, backgroundColor: RandomColor() }} />
    }

    backView={
        <View style={{ flex: 1, backgroundColor: RandomColor() }} />
    }
/> 
 * ```
 */
const FlipCard = ({
  duration = 300,
  endFlipCallback,

  masterOverideStyle,

  frontView,
  frontContainerViewStyle,

  backView,
  backContainerViewStyle,
}: {
  duration?: number,
  endFlipCallback?: (flipped: boolean) => void,

  masterOverideStyle?: StyleProp<ViewStyle>,

  frontView: React.JSX.Element,
  frontContainerViewStyle?: StyleProp<ViewStyle>,

  backView: React.JSX.Element,
  backContainerViewStyle?: StyleProp<ViewStyle>,
}) => {
  const [flipped, setFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const flipCard = useCallback(() => {
    const toValue = flipped ? 0 : 1

    Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start(() => endFlipCallback?.(!flipped))

    setFlipped(!flipped);
  }, [flipped, duration, endFlipCallback])

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <TouchableWithoutFeedback onPress={flipCard}>
      <View style={[CommonStyles.flex_1, masterOverideStyle]}>
        <Animated.View style={[CommonStyles.width100PercentHeight100Percent, frontContainerViewStyle, frontAnimatedStyle, styles.setup]}>
          {
            frontView
          }
        </Animated.View>
        <Animated.View pointerEvents={'none'} style={[CommonStyles.width100PercentHeight100Percent, backContainerViewStyle, backAnimatedStyle, styles.setup]}>
          {
            backView
          }
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  setup: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
})

export default FlipCard;