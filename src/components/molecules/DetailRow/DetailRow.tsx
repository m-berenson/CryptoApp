import Divider from '@/components/atoms/Divider/Divider'
import Spacer from '@/components/atoms/Spacer/Spacer'
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
        <Text style={styles.label} variant='label' color='textPrimary'>
          {label}
        </Text>

        <Spacer horizontal='small' />

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
    alignItems: 'center',
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.small,
  },
  label: {
    flex: 1,
  },
})

export default DetailRow
