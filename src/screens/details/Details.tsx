import React, { useState } from 'react'
import { type DetailScreenProps } from '@/navigation/rootStack/RootStack'
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { colors } from '@/theme'
import { formatNumber } from '@/utils/format'
import { strings } from '@/services/localization/strings'
import { useDetails } from './useDetails'
import { useIsFavorite, useUpdateFavorites } from '@/services/storage/useFavorites'
import { useQuoteQuery } from '@/services/queries/useQuoteQuery'
import Card from '@/components/atoms/Card/Card'
import CryptoCell from '@/components/molecules/CryptoCell/Cell'
import DetailRow from '@/components/molecules/DetailRow/DetailRow'
import Layout from '@/components/atoms/Layout/Layout'
import Pill from '@/components/molecules/Pill/Pill'
import Spacer from '@/components/atoms/Spacer/Spacer'
import Text from '@/components/atoms/Text/Text'

const FILLED_STAR = '\u2605'
const EMPTY_STAR = '\u2606'

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

  const details = useDetails(currentItem)

  return (
    <Layout>
      <Pressable onPress={navigation.goBack} style={styles.closeButton}>
        <Text variant='button'>{strings.close}</Text>
      </Pressable>

      <Spacer vertical='xlarge' />

      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size='large' color={colors.accentColor} />
        </View>
      ) : !currentItem ? (
        <View style={styles.container}>
          <Text variant='subheading-regular'>{strings.error}</Text>
        </View>
      ) : (
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
            title={isFavorite ? FILLED_STAR : EMPTY_STAR}
            titleVariant='button'
          />
          <Spacer vertical='large' />

          <CryptoCell
            name={currentItem.name}
            symbol={currentItem.symbol}
            price={formatNumber(currentItem.quote.USD.price)}
            isFavorite={isFavorite}
            big
            disabled
          />

          <Spacer vertical='large' />

          <Card title={strings.details}>
            {details.map((detail, index) => (
              <View key={detail.label}>
                <DetailRow
                  label={detail.label}
                  value={detail.value}
                  divider={index < details.length - 1}
                />
              </View>
            ))}
          </Card>
        </ScrollView>
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    alignItems: 'flex-end',
  },
})

export default Details
