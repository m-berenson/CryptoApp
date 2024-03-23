import { useQuery } from '@tanstack/react-query'
import { fetchLatest, fetchQuote } from '../api/endpoints'
import { CMCCryptoCurrency } from '../api/types'

const THIRTY_SECONDS_MS = 30 * 1000

export const useQuoteQuery = ({ id }: { id: CMCCryptoCurrency['id'] }) => {
  const result = useQuery({
    queryKey: ['quote', id],
    queryFn: () => fetchQuote({ id }),
    refetchInterval: THIRTY_SECONDS_MS,
  })

  return result
}
