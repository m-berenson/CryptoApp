import type { CMCCryptoCurrency } from '@/services/api/types'
import { useEffect, useMemo, useState } from 'react'

type UseHomeItemsProps = {
  queryData: CMCCryptoCurrency[] | undefined
  isFavsSelected: boolean
  searchValue: string
  favorites: number[]
}

const searchMatch = ({ item, search }: { item: CMCCryptoCurrency; search: string }) =>
  item.name.toLowerCase().includes(search.toLowerCase()) ||
  item.symbol.toLowerCase().includes(search.toLowerCase())

export const useHomeItems = ({
  queryData,
  isFavsSelected,
  searchValue,
  favorites,
}: UseHomeItemsProps) => {
  // debounce search value
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchValue(searchValue)
    }, 500)

    return () => clearTimeout(timeout)
  }, [searchValue])

  const items = useMemo(() => {
    if (!queryData) {
      return []
    }

    return queryData
      .filter(item => {
        const searchMatched = searchMatch({ item, search: debouncedSearchValue })
        const isFavorite = favorites.includes(item.id)

        return !isFavsSelected ? searchMatched : isFavorite && searchMatched
      })
      .map(item => ({ ...item, isFavorite: favorites.includes(item.id) }))
  }, [isFavsSelected, debouncedSearchValue, queryData, favorites])

  return { items }
}
