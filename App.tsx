import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/services/queries/client'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './src/navigation/Navigator'
import AuthProvider from '@/services/auth/AuthProvider'

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
