import React, { useState } from 'react'
import { type DetailScreenProps } from '@/navigation/rootStack/RootStack'
import { Pressable, View } from 'react-native'
import Text from '@/components/atoms/Text/Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/theme'
import { CMCCryptoCurrency } from '@/services/api/types'
import { useQuoteQuery } from '@/services/queries/useQuoteQuery'
import Spacer from '@/components/atoms/Spacer/Spacer'
import { useIsFavorite, useUpdateFavorites } from '@/services/storage/useFavorites'

const FIELDS_TO_SHOW: Array<keyof CMCCryptoCurrency> = ['name', 'symbol']

const QUOTE_FIELDS_TO_SHOW: Array<keyof CMCCryptoCurrency['quote']['USD']> = ['price', 'volume_24h']

const Details = ({ navigation, route }: DetailScreenProps) => {
  const { id } = route.params

  const { data } = useQuoteQuery({ id })

  const currentData = data && data[id]

  const { update } = useUpdateFavorites()

  const [isFavorite, setIsFavorite] = useState(useIsFavorite(id))

  const handleAddToFavorites = () => {
    setIsFavorite(prev => !prev)

    if (currentData) {
      update(currentData)
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

      {FIELDS_TO_SHOW.map(field => (
        <Row
          key={field}
          label={field}
          value={currentData ? currentData[field]?.toString() : undefined}
        />
      ))}

      {QUOTE_FIELDS_TO_SHOW.map(field => (
        <Row
          key={field}
          label={field}
          value={currentData ? currentData.quote.USD[field]?.toString() : undefined}
        />
      ))}

      <Spacer vertical='xlarge' />

      <Pressable
        style={{ backgroundColor: isFavorite ? colors.accentColor : colors.backgroundSecondary }}
        onPress={handleAddToFavorites}
      >
        <Text variant='button' color={isFavorite ? 'darkGray' : 'textSecondary'}>
          Add to favorites
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

const Row = ({ label, value }: { label: string; value?: string }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text variant='label'>{label}</Text>
      <Text variant='label'>{value ?? 'N/A'}</Text>
    </View>
  )
}

export default Details
