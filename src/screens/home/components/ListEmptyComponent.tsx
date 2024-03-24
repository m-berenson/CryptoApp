import Text from '@/components/atoms/Text/Text'
import { colors } from '@/theme'
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

type ListEmptyComponentProps = {
  message: string
  isLoading: boolean
}

const ListEmptyComponent = ({ isLoading, message }: ListEmptyComponentProps) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color={colors.accentColor} size='large' />
      ) : (
        <Text variant='subheading-regular' color='textSecondary' style={styles.message}>
          {message}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
})

export default ListEmptyComponent
