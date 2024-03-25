import React, { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import Text from '@/components/atoms/Text/Text'
import { borderRadius } from '@/theme/borderRadius'
import { spacing } from '@/theme/spacing'
import { shadows } from '@/theme'
import Animated, {
  cancelAnimation,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

type PillProps = {
  isSelected: boolean
  onPress: () => void
  title: string
  titleVariant?: 'label' | 'button'
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Pill: React.FC<PillProps> = ({ isSelected, title, onPress, titleVariant = 'label' }) => {
  const colorSharedValue = useSharedValue(isSelected ? 1 : 0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorSharedValue.value,
        [0, 1],
        [colors.backgroundSecondary, colors.accentColor]
      ),
    }
  })

  useEffect(() => {
    colorSharedValue.value = withTiming(isSelected ? 1 : 0, { duration: 200 })

    return () => cancelAnimation(colorSharedValue)
  }, [isSelected, colorSharedValue])

  return (
    <AnimatedPressable style={[styles.container, animatedStyles]} onPress={onPress}>
      <Text variant={titleVariant} color={isSelected ? 'darkGray' : 'textSecondary'}>
        {title}
      </Text>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: borderRadius.large,
    alignSelf: 'flex-start',
    ...shadows.base,
  },
})

export default Pill
