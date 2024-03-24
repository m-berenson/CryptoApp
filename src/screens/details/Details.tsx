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
import Text from '@/components/atoms/Text/Text'
import { colors } from '@/theme'
import { useQuoteQuery } from '@/services/queries/useQuoteQuery'
import Spacer from '@/components/atoms/Spacer/Spacer'
import { useIsFavorite, useUpdateFavorites } from '@/services/storage/useFavorites'
import Pill from '@/components/molecules/Pill/Pill'
import CryptoCell from '@/components/molecules/CryptoCell/Cell'
import Layout from '@/components/atoms/Layout/Layout'
import DetailRow from '@/components/molecules/DetailRow/DetailRow'
import Card from '@/components/atoms/Card/Card'
import { useDetails } from './useDetails'
import { strings } from '@/services/localization/strings'

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
        <View style={styles.loader}>
          <ActivityIndicator size='large' color={colors.accentColor} />
        </View>
      ) : !currentItem ? (
        <Text variant='subheading-regular'>{strings.error}</Text>
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
            price={currentItem.quote.USD.price.toFixed(2)}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    alignItems: 'flex-end',
  },
})

export default Details
