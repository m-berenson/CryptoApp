import Config from 'react-native-config'
import { request } from './request'
import { CMCCryptoCurrency } from './types'

export const fetchLatest = async () => {
  return request<CMCCryptoCurrency[]>({
    url: `${Config.COIN_MARKET_CAP_API_URL}/v1/cryptocurrency/listings/latest?start=1&limit=100&convert=USD`,
    headers: {
      'X-CMC_PRO_API_KEY': Config.COIN_MARKET_CAP_API_KEY,
      Accept: 'application/json',
    },
  })
}
