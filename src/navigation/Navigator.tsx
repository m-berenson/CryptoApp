import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStack from './rootStack/RootStack'
import AuthStack from './authStack/AuthStack'
import { useAuthContext } from '@/services/auth/useAuthContext'

const AppNavigator = () => {
  const { user } = useAuthContext()

  return <NavigationContainer>{!!user ? <RootStack /> : <AuthStack />}</NavigationContainer>
}

export default AppNavigator
