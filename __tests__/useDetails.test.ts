import { type CMCCryptoCurrency } from '@/services/api/types'
import * as useDetails from '@/screens/details/useDetails'
import { renderHook } from '@testing-library/react-native'

const ITEM: CMCCryptoCurrency = {
  name: 'Bitcoin',
  symbol: 'BTC',
  cmc_rank: 1,
  quote: {
    USD: {
      price: 1000,
      volume_24h: 1000,
      market_cap: 1000,
      volume_change_24h: 0,
      percent_change_1h: 0,
      percent_change_24h: 21,
      percent_change_7d: 98,
      market_cap_dominance: 0,
      fully_diluted_market_cap: 0,
      last_updated: '',
    },
  },
  circulating_supply: 1000,
  total_supply: 1000,
  max_supply: 1000,
  last_updated: '2018-08-09T21:56:28.000Z',
  id: 0,
  slug: '',
  num_market_pairs: 0,
  infinite_supply: false,
  date_added: '',
  tags: [],
}

describe('useDetails hook', () => {
  it('should return an empty array when item is not defined', () => {
    const { result } = renderHook(() => useDetails.useDetails(undefined))
    expect(result.current).toEqual([])
  })

  it('should return the details when item is defined', () => {
    const { result } = renderHook(() => useDetails.useDetails(ITEM))
    expect(result.current).toEqual([
      { label: 'Name', value: 'Bitcoin' },
      { label: 'Symbol', value: 'BTC' },
      { label: 'Rank', value: '#1' },
      { label: 'Price', value: '$1000.00 USD' },
      { label: 'Price Change 24h', value: '21.00%' },
      { label: 'Price Change 7d', value: '98.00%' },
      { label: 'Volume 24h', value: '$1000.00 USD' },
      { label: 'Market Cap', value: '$1000.00 USD' },
      { label: 'Circulating Supply', value: '1000.00 BTC' },
      { label: 'Total Supply', value: '1000.00 BTC' },
      { label: 'Max Supply', value: '1000.00 BTC' },
      { label: 'Last Updated', value: '8/9/2018, 6:56:28 PM' },
    ])
  })
})
