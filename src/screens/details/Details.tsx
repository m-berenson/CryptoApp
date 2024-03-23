import React, { useState } from 'react'
import { type DetailScreenProps } from '@/navigation/rootStack/RootStack'
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, View } from 'react-native'
import Text from '@/components/atoms/Text/Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import { borderRadius, colors, spacing } from '@/theme'
import { CMCCryptoCurrency } from '@/services/api/types'
import { useQuoteQuery } from '@/services/queries/useQuoteQuery'
import Spacer from '@/components/atoms/Spacer/Spacer'
import { useIsFavorite, useUpdateFavorites } from '@/services/storage/useFavorites'
import Pill from '@/components/molecules/Pill/Pill'
import CryptoCell from '@/components/molecules/CryptoCell/Cell'

const FIELDS_TO_SHOW: Array<keyof CMCCryptoCurrency> = ['name', 'symbol', 'cmc_rank']

const QUOTE_FIELDS_TO_SHOW: Array<keyof CMCCryptoCurrency['quote']['USD']> = ['price', 'volume_24h']

const Details = ({ navigation, route }: DetailScreenProps) => {
  const { id } = route.params

  const { data, isLoading, refetch, isRefetching } = useQuoteQuery({ id })

  const currentItem = data && data[id]

  const { update } = useUpdateFavorites()

  const [isFavorite, setIsFavorite] = useState(useIsFavorite(id))

  const handleAddToFavorites = () => {
    setIsFavorite(prev => !prev)

    if (currentItem) {
      update(currentItem)
    }
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.backgroundPrimary, paddingHorizontal: 16, flex: 1 }}
    >
      <Pressable onPress={navigation.goBack} style={{ alignItems: 'flex-end' }}>
        <Text variant='button'>Close</Text>
      </Pressable>

      <Spacer vertical='xlarge' />

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color={colors.accentColor} />
        </View>
      ) : !currentItem ? null : (
        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor={colors.accentColor}
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <Pill
            isSelected={isFavorite}
            onPress={handleAddToFavorites}
            title={isFavorite ? `\u2605` : `\u2606`}
            titleVariant='button'
          />
          <Spacer vertical='large' />

          <CryptoCell
            name={currentItem.name}
            symbol={currentItem.symbol}
            price={currentItem.quote.USD.price.toFixed(2)}
            isFavorite={isFavorite}
            big
            disabled
          />

          <Spacer vertical='large' />

          <View
            style={{
              padding: spacing.medium,
              backgroundColor: colors.cellColor,
              borderRadius: borderRadius.medium,

              // alignItems: 'center',
            }}
          >
            <Text variant='subheading-regular' color='textPrimary'>
              Details
            </Text>

            <Spacer vertical='medium' />

            {FIELDS_TO_SHOW.map((field, index) => (
              <View key={field}>
                <Row label={field} value={currentItem[field]?.toString()} />
                {index < FIELDS_TO_SHOW.length - 1 && <Divider />}
              </View>
            ))}
            <Divider />

            {QUOTE_FIELDS_TO_SHOW.map((field, index) => (
              <View key={field}>
                <Row label={field} value={currentItem.quote.USD[field]?.toString()} />
                {index < QUOTE_FIELDS_TO_SHOW.length - 1 && <Divider />}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const Divider = () => {
  return <View style={{ height: 1, backgroundColor: colors.darkGray }} />
}

const Row = ({ label, value }: { label: string; value?: string }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.medium,
        paddingHorizontal: spacing.small,
      }}
    >
      <Text variant='label' color='textPrimary'>
        {label}
      </Text>
      <Text variant='label' color='textSecondary'>
        {value ?? 'N/A'}
      </Text>
    </View>
  )
}

export default Details
