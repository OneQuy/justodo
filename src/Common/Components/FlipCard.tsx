import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, ViewStyle, StyleProp } from 'react-native';

const FlipCard = ({
  duration = 300,
  endFlipCallback,

  masterStyle,

  frontView,
  frontViewStyle,

  backView,
  backViewStyle,
}: {
  duration?: number,
  endFlipCallback?: (flipped: boolean) => void,

  masterStyle?: StyleProp<ViewStyle>,

  frontView: React.JSX.Element,
  frontViewStyle?: StyleProp<ViewStyle>,

  backView: React.JSX.Element,
  backViewStyle?: StyleProp<ViewStyle>,
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
      <View style={masterStyle}>
        <Animated.View style={[frontViewStyle, frontAnimatedStyle, styles.setup]}>
          {
            frontView
          }
        </Animated.View>
        <Animated.View style={[backViewStyle, backAnimatedStyle, styles.setup]}>
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