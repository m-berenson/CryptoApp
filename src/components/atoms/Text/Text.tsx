import React from 'react'
import { ColorsKeys, TextVariantKeys, useAppTheme } from '@/theme'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'

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
  const { colors, textVariants } = useAppTheme()

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
