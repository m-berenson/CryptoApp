import type { DetailRowProps } from '@/components/molecules/DetailRow/DetailRow'
import type { CMCCryptoCurrency } from '@/services/api/types'
import { strings } from '@/services/localization/strings'
import { formatNumber } from '@/utils/format'
import { useMemo } from 'react'

type DetailsReturnType = Omit<DetailRowProps, 'divider'>

export const useDetails = (item?: CMCCryptoCurrency): DetailsReturnType[] =>
  useMemo(
    () =>
      !item
        ? []
        : [
            { label: strings.detailsName, value: item.name },
            { label: strings.detailsSymbol, value: item.symbol },
            { label: strings.detailsRank, value: item.cmc_rank ? `#${item.cmc_rank}` : undefined },
            {
              label: strings.detailsPrice,
              value: item.quote ? `$${formatNumber(item.quote.USD.price)} USD` : undefined,
            },
            {
              label: strings.detailsVolume,
              value: item.quote ? `$${formatNumber(item.quote.USD.volume_24h)} USD` : undefined,
            },
            {
              label: strings.detailsMarketCap,
              value: item.quote ? `$${formatNumber(item.quote.USD.market_cap)} USD` : undefined,
            },
            {
              label: strings.detailsCirculatingSupply,
              value: item.circulating_supply
                ? `${formatNumber(item.circulating_supply)} ${item.symbol}`
                : undefined,
            },
            {
              label: strings.detailsTotalSupply,
              value: item.total_supply
                ? `${formatNumber(item.total_supply)} ${item.symbol}`
                : undefined,
            },
            {
              label: strings.detailsMaxSupply,
              value: item.max_supply
                ? `${formatNumber(item.max_supply)} ${item.symbol}`
                : undefined,
            },
            {
              label: strings.detailsLastUpdated,
              value: item.last_updated ? new Date(item.last_updated).toLocaleString() : undefined,
            },
          ],
    [item]
  )
