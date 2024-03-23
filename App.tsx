import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/services/queries/client'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './src/navigation/Navigator'

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default App
