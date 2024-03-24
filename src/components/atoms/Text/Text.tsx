import React from 'react'
import { colors, textVariants, type ColorsKeys, type TextVariantKeys } from '@/theme'
import type { TextProps as RNTextProps } from 'react-native'
import { Text as RNText } from 'react-native'

type TextProps = {
  variant?: TextVariantKeys
  color?: ColorsKeys
} & RNTextProps

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = 'textPrimary',
  style,
  ...rest
}) => {
  return (
    <RNText
      style={[
        {
          ...textVariants[variant],
          color: colors[color],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  )
}

export default Text
