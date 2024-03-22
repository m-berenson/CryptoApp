import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RootStack from './rootStack/RootStack'

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}

export default AppNavigator
