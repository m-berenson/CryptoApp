import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '@/screens/home/Home'

type RootStackParamList = {
  Home: undefined
  Details: {}
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default RootStack
