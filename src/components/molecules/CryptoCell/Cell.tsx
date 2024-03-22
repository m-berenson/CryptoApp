import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from '@/components/atoms/Text/Text'
import { borderRadius, colors, shadows, spacing, useAppTheme } from '@/theme'

type CryptoCellProps = {
  name: string
  symbol: string
  price: number
  isFavorite: boolean
}

const CryptoCell: React.FC<CryptoCellProps> = ({ name, symbol, price, isFavorite }) => {
  const { colors } = useAppTheme()

  return (
    <View
      style={[
        styles.container,
        { borderColor: isFavorite ? colors.accentColor : colors.cellColor },
        { ...shadows.base },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text variant='label'>{name}</Text>
        <Text variant='caption'>{symbol}</Text>
      </View>

      <View style={styles.priceText}>
        <Text variant='label'>{price}</Text>
      </View>
    </View>
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
