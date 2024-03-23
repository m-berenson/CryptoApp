import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Text from '@/components/atoms/Text/Text'
import { borderRadius, colors, shadows, spacing, useAppTheme } from '@/theme'

type CryptoCellProps = {
  name: string
  symbol: string
  price: string
  isFavorite: boolean
  onPress?: () => void
}

const CryptoCell: React.FC<CryptoCellProps> = ({ name, symbol, price, isFavorite, onPress }) => {
  const { colors } = useAppTheme()

  return (
    <Pressable
      style={[
        styles.container,
        { borderColor: isFavorite ? colors.accentColor : colors.cellColor },
        { ...shadows.base },
      ]}
      onPress={onPress}
    >
      <View style={{ flex: 1 }}>
        <Text variant='label'>{name}</Text>
        <Text variant='caption'>{symbol}</Text>
      </View>

      <View style={styles.priceText}>
        <Text variant='label'>{`$${price}`}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    flexDirection: 'row',
    backgroundColor: colors.cellColor,
    borderRadius: borderRadius.medium,
    borderWidth: 0.5,
  },
  priceText: {
    justifyContent: 'center',
  },
})

export default CryptoCell
