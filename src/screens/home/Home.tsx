import React, { useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/theme/colors'
import Text from '@/components/atoms/Text/Text'
import Header from '@/components/molecules/Header/Header'
import SearchBar from '@/components/atoms/SearchBar/SearchBar'
import Pill from '@/components/molecules/Pill/Pill'
import Spacer from '@/components/atoms/Spacer/Spacer'
import Cell from '@/components/molecules/CryptoCell/Cell'
import { CMCCryptoCurrency } from '@/services/api/types'
import { useLatestQuery } from '@/services/queries/useLatestQuery'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenProps } from '@/navigation/rootStack/RootStack'

type FavoriteItemKey = `${CMCCryptoCurrency['symbol']}:${CMCCryptoCurrency['id']}`

const FAVORITE_ITEMS: FavoriteItemKey[] = ['BTC:1']

const searchMatch = ({ item, search }: { item: CMCCryptoCurrency; search: string }) =>
  item.name.toLowerCase().includes(search.toLowerCase()) ||
  item.symbol.toLowerCase().includes(search.toLowerCase())

const Home = ({ navigation }: HomeScreenProps) => {
  const renderItem = ({ item }: { item: CMCCryptoCurrency }) => {
    return (
      <Cell
        name={item.name}
        symbol={item.symbol}
        price={item.quote.USD.price.toFixed(2)}
        isFavorite={FAVORITE_ITEMS.includes(`${item.symbol}:${item.id}`)}
        onPress={() => navigation.navigate('Details', { id: item.id })}
      />
    )
  }

  const [isFavsSelected, setIsFavSelected] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { data: queryData, isLoading } = useLatestQuery()

  // TODO: Improve this logic and add debounce
  const data = useMemo(
    () =>
      !queryData
        ? []
        : !isFavsSelected
        ? !!searchValue
          ? queryData.filter(item => searchMatch({ item, search: searchValue }))
          : queryData
        : queryData.filter(
            item =>
              FAVORITE_ITEMS.includes(`${item.symbol}:${item.id}`) &&
              searchMatch({ item, search: searchValue })
          ),
    [isFavsSelected, searchValue, queryData]
  )

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.backgroundPrimary, paddingHorizontal: 16, flex: 1 }}
    >
      <Header userName='John Doe' />

      <Spacer vertical='xlarge' />

      <SearchBar placeholder='Search' onSearch={setSearchValue} value={searchValue} />

      <Spacer vertical='large' />

      <Pill
        isSelected={isFavsSelected}
        title='Favorites' // TODO: Replace with string
        onPress={() => setIsFavSelected(prev => !prev)}
      />

      <Spacer vertical='medium' />

      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isLoading ? (
              <ActivityIndicator color={colors.accentColor} size='large' />
            ) : (
              <Text variant='heading-regular' color='textSecondary'>
                {isFavsSelected ? 'No favorites' : 'No data'}
              </Text>
            )}
          </View>
        )}
      />

      <Pressable style={{ alignItems: 'center' }}>
        <Text variant='button' color='accentColor'>
          Log out
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Home
