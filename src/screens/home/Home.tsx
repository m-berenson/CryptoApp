import React, { useMemo, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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

const Home = () => {
  const renderItem = ({ item }: { item: CMCCryptoCurrency }) => {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text>{item.name}</Text>
          <Text>{item.symbol}</Text>
        </View>

        <Text>{item.id}</Text>
      </View>
    )
  }

  const [isFavsSelected, setIsFavSelected] = useState(false)

  const data = useMemo(
    () =>
      !isFavsSelected
        ? MOCKED_DATA
        : MOCKED_DATA.filter(item => FAVORITE_ITEMS.includes(`${item.symbol}:${item.id}`)),
    [isFavsSelected]
  )

  return (
    <SafeAreaView style={{ paddingHorizontal: 16, flex: 1 }}>
      <Text style={{ fontSize: 30 }}>
        👋 ¡Hola, <Text style={{ fontSize: 30, fontWeight: '500' }}>User</Text>!
      </Text>

      <Spacer vertical={20} />

      <Pill
        isSelected={isFavsSelected}
        title='Favorites' // TODO: Replace with string
        onPress={() => setIsFavSelected(prev => !prev)}
      />

      <Spacer vertical={20} />
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />

      <Pressable style={{ alignItems: 'center' }}>
        <Text style={{ color: 'blue', fontSize: 18 }}>Log out</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const Pill = ({
  isSelected,
  title,
  onPress,
}: {
  isSelected: boolean
  title: string
  onPress: () => void
}) => {
  return (
    <Pressable
      style={{
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 16,
        backgroundColor: isSelected ? 'green' : 'black',
        alignSelf: 'flex-start',
      }}
      onPress={onPress}
    >
      <Text style={{ color: isSelected ? 'black' : 'white' }}>{title}</Text>
    </Pressable>
  )
}

const Spacer = ({ vertical, horizontal }: { vertical?: number; horizontal?: number }) => {
  return <View style={{ height: vertical, width: horizontal }} />
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    borderRadius: 8,
  },
})

export default Home
