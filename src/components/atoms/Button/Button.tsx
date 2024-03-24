import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import Text from '../Text/Text'
import { borderRadius, colors, shadows, spacing } from '@/theme'

type ButtonProps = {
  onPress: () => void
  title: string
  disabled?: boolean
  isLoading?: boolean
}

const Button = ({ onPress, title, disabled, isLoading }: ButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress} disabled={isLoading || disabled}>
      {isLoading ? (
        <ActivityIndicator size='small' color={colors.accentColor} />
      ) : (
        <Text variant='button' color='accentColor'>
          {title}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: spacing.medium,
    borderRadius: borderRadius.medium,
    backgroundColor: colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: colors.accentColor,
    alignItems: 'center',

    ...shadows.base,
  },
})

export default Button
