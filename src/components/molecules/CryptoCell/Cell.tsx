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
  big?: boolean
  disabled?: boolean
}

const CryptoCell: React.FC<CryptoCellProps> = ({
  name,
  symbol,
  price,
  isFavorite,
  onPress,
  big = false,
  disabled = false,
}) => {
  const { colors } = useAppTheme()

  return (
    <Pressable
      style={[
        styles.container,
        { borderColor: isFavorite ? colors.accentColor : colors.cellColor },
        { ...shadows.base },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={{ flex: 1 }}>
        <Text variant={big ? 'subheading-regular' : 'label'}>{name}</Text>
        <Text variant={big ? 'label' : 'caption'}>{symbol}</Text>
      </View>

      <View>
        <Text variant={big ? 'subheading-regular' : 'label'}>{`$${price}`}</Text>
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
    alignItems: 'center',
  },
})

export default CryptoCell
