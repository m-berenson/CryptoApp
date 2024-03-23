type Quote = {
  price: number
  volume_24h: number
  volume_change_24h: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  market_cap: number
  market_cap_dominance: number
  fully_diluted_market_cap: number
  last_updated: string
}

export type CMCCryptoCurrency = {
  id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number
  num_market_pairs: number
  circulating_supply: number
  total_supply: number
  max_supply: number | null
  infinite_supply: boolean
  last_updated: string
  date_added: string
  tags: string[]
  quote: { USD: Quote }
}

export type ListingLatestResponse = {
  status: {
    timestamp: string
    error_code: number
    error_message: string | null
    elapsed: number
    credit_count: number
    notice: string | null
  }
  data: CMCCryptoCurrency[]
}
