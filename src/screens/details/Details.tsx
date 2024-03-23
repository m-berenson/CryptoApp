import React from 'react'
import { type DetailScreenProps } from '@/navigation/rootStack/RootStack'
import { Pressable, View } from 'react-native'
import { useLatestQuery } from '@/services/queries/useLatestQuery'
import Text from '@/components/atoms/Text/Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/theme'
import { CMCCryptoCurrency } from '@/services/api/types'
import { useQuoteQuery } from '@/services/queries/useQuoteQuery'
import Spacer from '@/components/atoms/Spacer/Spacer'

const FIELDS_TO_SHOW: Array<keyof CMCCryptoCurrency> = ['name', 'symbol']

const QUOTE_FIELDS_TO_SHOW: Array<keyof CMCCryptoCurrency['quote']['USD']> = ['price', 'volume_24h']

const Details = ({ navigation, route }: DetailScreenProps) => {
  const { id } = route.params

  const { data, isLoading, error } = useQuoteQuery({ id })

  const currentData = data && data[id]

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

      <Pressable style={{ backgroundColor: colors.backgroundSecondary }}>
        <Text variant='button'>Add to favorites</Text>
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
