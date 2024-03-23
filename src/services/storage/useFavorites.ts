import { useCallback, useEffect, useState } from 'react'
import { CMCCryptoCurrency } from '../api/types'
import { getObject, onKeyChange, setItem } from './storage'

export type FavoriteItemKey = CMCCryptoCurrency['id']

const FAVORITE_KEY = 'Favorites'

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItemKey[]>([])

  useEffect(() => {
    const updateFavorites = () => {
      const readFavorites = getObject<FavoriteItemKey[]>({ key: FAVORITE_KEY })

      setFavorites(readFavorites ?? [])
    }

    updateFavorites()

    const removeSubscription = onKeyChange(FAVORITE_KEY, updateFavorites)

    return () => removeSubscription()
  }, [])

  return { favorites }
}

export const useUpdateFavorites = () => {
  const update = useCallback((favorite: CMCCryptoCurrency) => {
    const prevFavorites = getObject<FavoriteItemKey[]>({ key: FAVORITE_KEY }) ?? []
    const isAlreadyFavorite = prevFavorites.includes(favorite.id)

    setItem({
      key: FAVORITE_KEY,
      value: isAlreadyFavorite
        ? prevFavorites.filter(favKey => favKey !== favorite.id)
        : [...prevFavorites, favorite.id],
    })
  }, [])

  return { update }
}

export const useIsFavorite = (favoriteId: CMCCryptoCurrency['id']) => {
  const readFavorites = getObject<FavoriteItemKey[]>({ key: FAVORITE_KEY })

  return readFavorites?.includes(favoriteId) ?? false
}
