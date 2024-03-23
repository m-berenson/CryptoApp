import { useQuery } from '@tanstack/react-query'
import { fetchLatest } from '../api/endpoints'

export const useLatestQuery = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ['latest'], queryFn: fetchLatest })

  return { data, isLoading, error }
}
