import React from 'react';
import { View } from 'react-native';
import Animated, {
  withDelay,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

import { Button } from './button';
import { Text } from './text';

import { X } from '~/lib/icons/X';

const AnimatedPressable = Animated.createAnimatedComponent(Button);

const AnimatedText = Animated.createAnimatedComponent(Text);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

const FloatingActionButtonItem = ({
  isExpanded,
  index,
  buttonLetter,
}: {
  isExpanded: SharedValue<boolean>;
  index: number;
  buttonLetter: string;
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;

    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 100;

    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [{ translateY: withDelay(delay, translateValue) }],
      opacity: withDelay(delay, withTiming(scaleValue)),
    };
  });

  return (
    <AnimatedPressable className="absolute max-w-full" variant="outline" style={[animatedStyles]}>
      <AnimatedText className="text-nowrap font-medium">{buttonLetter}</AnimatedText>
    </AnimatedPressable>
  );
};

export function FloatingActionButton() {
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const rotateValue = !isExpanded.value ? '45deg' : '90deg';

    return {
      transform: [{ rotate: withTiming(rotateValue) }],
    };
  }, [isExpanded.value]);

  return (
    <View className="absolute bottom-3 right-3 h-16 w-full flex-1 flex-col items-end">
      <AnimatedPressable
        onPress={handlePress}
        className="z-10 size-16 flex-1 rounded-full p-2"
        style={plusIconStyle}>
        <X className="size-4 text-primary-foreground" />
      </AnimatedPressable>
      <FloatingActionButtonItem isExpanded={isExpanded} index={1} buttonLetter="Add program" />
      <FloatingActionButtonItem
        isExpanded={isExpanded}
        index={2}
        buttonLetter="Start Empty Workout"
      />
      <FloatingActionButtonItem isExpanded={isExpanded} index={3} buttonLetter="F" />
    </View>
  );
}
