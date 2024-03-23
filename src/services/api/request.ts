export const request = async <T>({
  url,
  headers,
}: {
  url: string
  headers: HeadersInit_
}): Promise<T> => {
  return fetch(url, { headers, method: 'GET' })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<{ data: T }>
    })
    .then(data => {
      return data.data
    })
}
