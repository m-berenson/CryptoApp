import React, { useCallback, useMemo, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Header from '@/components/molecules/Header/Header'
import SearchBar from '@/components/atoms/SearchBar/SearchBar'
import Pill from '@/components/molecules/Pill/Pill'
import Spacer from '@/components/atoms/Spacer/Spacer'
import Cell from '@/components/molecules/CryptoCell/Cell'
import type { CMCCryptoCurrency } from '@/services/api/types'
import { useLatestQuery } from '@/services/queries/useLatestQuery'
import type { HomeScreenProps } from '@/navigation/rootStack/RootStack'
import { useFavorites } from '@/services/storage/useFavorites'
import Layout from '@/components/atoms/Layout/Layout'
import { useAuthContext } from '@/services/auth/useAuthContext'
import Button from '@/components/atoms/Button/Button'
import ListEmptyComponent from './components/ListEmptyComponent'
import { spacing } from '@/theme'

const searchMatch = ({ item, search }: { item: CMCCryptoCurrency; search: string }) =>
  item.name.toLowerCase().includes(search.toLowerCase()) ||
  item.symbol.toLowerCase().includes(search.toLowerCase())

const Home = ({ navigation }: HomeScreenProps) => {
  const { favorites } = useFavorites()

  const { signOut, user } = useAuthContext()

  const renderItem = useCallback(
    ({ item }: { item: CMCCryptoCurrency & { isFavorite: boolean } }) => {
      return (
        <Cell
          name={item.name}
          symbol={item.symbol}
          price={item.quote.USD.price.toFixed(2)}
          isFavorite={item.isFavorite}
          onPress={() => navigation.navigate('Details', { id: item.id })}
        />
      )
    },
    [navigation]
  )

  const [isFavsSelected, setIsFavSelected] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { data: queryData, isLoading } = useLatestQuery()

  // TODO: Improve this logic and add debounce
  const data = useMemo(
    () =>
      (!queryData
        ? []
        : !isFavsSelected
        ? searchValue
          ? queryData.filter(item => searchMatch({ item, search: searchValue }))
          : queryData
        : queryData.filter(
            item => favorites.includes(item.id) && searchMatch({ item, search: searchValue })
          )
      ).map(item => ({ ...item, isFavorite: favorites.includes(item.id) })),
    [isFavsSelected, searchValue, queryData, favorites]
  )

  return (
    <Layout>
      <Header userName={user?.user.name?.split(' ')[0] ?? ''} />

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
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.flatlistContainer}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<ListEmptyComponent isLoading={isLoading} message='No data found' />}
      />

      <Spacer vertical='large' />

      <Button title='Sign out' onPress={signOut} />
    </Layout>
  )
}

const Separator = () => <View style={styles.separator} />

const styles = StyleSheet.create({
  flatlistContainer: {
    flexGrow: 1,
  },
  separator: {
    height: spacing.medium,
  },
})

export default Home
