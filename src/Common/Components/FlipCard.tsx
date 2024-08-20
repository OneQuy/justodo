import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated } from 'react-native';

interface FlipCardProps {
  frontContent: string;
  backContent: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontContent, backContent }) => {
  const [flipped, setFlipped] = useState(false);
  const animatedValue = new Animated.Value(0);

  const flipCard = () => {
    console.log(flipped);

    if (flipped) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setFlipped(!flipped);
  };

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
      <View style={styles.container}>
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <Text style={styles.text}>{frontContent}</Text>
        </Animated.View>
        <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
          <Text style={styles.text}>{backContent}</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: 200,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 10,
    backfaceVisibility: 'hidden',
  },
  backCard: {
    backgroundColor: 'lightcoral',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FlipCard;