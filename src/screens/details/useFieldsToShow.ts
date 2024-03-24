import type { DetailRowProps } from '@/components/molecules/DetailRow/DetailRow'
import type { CMCCryptoCurrency } from '@/services/api/types'
import { useMemo } from 'react'

type DetailsReturnType = Omit<DetailRowProps, 'divider'>

export const useDetails = (item?: CMCCryptoCurrency): DetailsReturnType[] =>
  useMemo(
    () =>
      !item
        ? []
        : [
            { label: 'Name', value: item.name },
            { label: 'Symbol', value: item.symbol },
            { label: 'Rank', value: item.cmc_rank ? `#${item.cmc_rank}` : undefined },
            {
              label: 'Price',
              value: item.quote ? `$${item.quote.USD.price.toFixed(2)}` : undefined,
            },
            {
              label: 'Volume 24h',
              value: item.quote ? `$${item.quote.USD.volume_24h.toFixed(2)}` : undefined,
            },
            {
              label: 'Market Cap',
              value: item.quote ? `$${item.quote.USD.market_cap.toFixed(2)}` : undefined,
            },
            {
              label: 'Circulating Supply',
              value: item.circulating_supply
                ? `${item.circulating_supply.toFixed(2)} ${item.symbol}`
                : undefined,
            },
            {
              label: 'Total Supply',
              value: item.total_supply
                ? `${item.total_supply.toFixed(2)} ${item.symbol}`
                : undefined,
            },
            {
              label: 'Max Supply',
              value: item.max_supply ? `${item.max_supply.toFixed(2)} ${item.symbol}` : undefined,
            },
            {
              label: 'Last Updated',
              value: item.last_updated ? new Date(item.last_updated).toLocaleString() : undefined,
            },
          ],
    [item]
  )
