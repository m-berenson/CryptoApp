import { useQuery } from '@tanstack/react-query'
import { fetchLatest } from '../api/endpoints'

const THIRTY_SECONDS_MS = 30 * 1000

export const useLatestQuery = () => {
  const result = useQuery({
    queryKey: ['latest'],
    queryFn: fetchLatest,

    refetchInterval: THIRTY_SECONDS_MS,
  })

  return result
}
