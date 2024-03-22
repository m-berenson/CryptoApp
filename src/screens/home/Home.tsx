import React, { useMemo, useState } from 'react'
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/theme/colors'
import Text from '@/components/atoms/Text/Text'
import Header from '@/components/molecules/Header/Header'
import SearchBar from '@/components/atoms/SearchBar/SearchBar'
import Pill from '@/components/molecules/Pill/Pill'
import Spacer from '@/components/atoms/Spacer/Spacer'
import Cell from '@/components/molecules/CryptoCell/Cell'

type CMCCryptoCurrency = {
  /** The unique CoinMarketCap ID for this cryptocurrency. */
  id: number

  /** The name of this cryptocurrency. */
  name: string

  /** The ticker symbol for this cryptocurrency. */
  symbol: string
}

const MOCKED_DATA: CMCCryptoCurrency[] = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
  },
]

type FavoriteItemKey = `${CMCCryptoCurrency['symbol']}:${CMCCryptoCurrency['id']}`

const FAVORITE_ITEMS: FavoriteItemKey[] = ['BTC:1']

const searchMatch = ({ item, search }: { item: CMCCryptoCurrency; search: string }) =>
  item.name.toLowerCase().includes(search.toLowerCase()) ||
  item.symbol.toLowerCase().includes(search.toLowerCase())

const Home = () => {
  const renderItem = ({ item }: { item: CMCCryptoCurrency }) => {
    return <Cell name={item.name} symbol={item.symbol} price={item.id} isFavorite={false} />
  }

  const [isFavsSelected, setIsFavSelected] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  // TODO: Improve this logic and add debounce
  const data = useMemo(
    () =>
      !isFavsSelected
        ? !!searchValue
          ? MOCKED_DATA.filter(item => searchMatch({ item, search: searchValue }))
          : MOCKED_DATA
        : MOCKED_DATA.filter(
            item =>
              FAVORITE_ITEMS.includes(`${item.symbol}:${item.id}`) &&
              searchMatch({ item, search: searchValue })
          ),
    [isFavsSelected, searchValue]
  )

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.backgroundPrimary, paddingHorizontal: 16, flex: 1 }}
    >
      <Header userName='John Doe' />

      <Spacer vertical='large' />

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
