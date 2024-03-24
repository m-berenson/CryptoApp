import { borderRadius, colors, spacing } from '@/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from '../Text/Text'
import Spacer from '../Spacer/Spacer'

type CardProps = {
  children: React.ReactNode
  title: string
}

const Card = ({ children, title }: CardProps) => {
  return (
    <View style={styles.container}>
      <Text variant='subheading-regular' color='textPrimary'>
        {title}
      </Text>

      <Spacer vertical='medium' />

      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    backgroundColor: colors.cellColor,
    borderRadius: borderRadius.medium,
  },
})

export default Card
