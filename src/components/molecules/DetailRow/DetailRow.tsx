import Divider from '@/components/atoms/Divider/Divider'
import Text from '@/components/atoms/Text/Text'
import { spacing } from '@/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export type DetailRowProps = {
  label: string
  value?: string
  divider?: boolean
}

const DetailRow = ({ label, value, divider }: DetailRowProps) => {
  return (
    <View>
      <View style={styles.container}>
        <Text variant='label' color='textPrimary'>
          {label}
        </Text>
        <Text variant='label' color='textSecondary'>
          {value ?? 'N/A'}
        </Text>
      </View>
      {divider ? <Divider /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.small,
  },
})

export default DetailRow
