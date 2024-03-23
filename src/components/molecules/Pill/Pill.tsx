import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'
import Text from '@/components/atoms/Text/Text'
import { borderRadius } from '@/theme/borderRadius'
import { spacing } from '@/theme/spacing'
import { shadows } from '@/theme'

type PillProps = {
  isSelected: boolean
  onPress: () => void
  title: string
  titleVariant?: 'label' | 'button'
}

const Pill: React.FC<PillProps> = ({ isSelected, title, onPress, titleVariant = 'label' }) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? colors.accentColor : colors.backgroundSecondary,
        },
        { ...shadows.base },
      ]}
      onPress={onPress}
    >
      <Text variant={titleVariant} color={isSelected ? 'darkGray' : 'textSecondary'}>
        {title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: borderRadius.large,
    alignSelf: 'flex-start',
  },
})

export default Pill
