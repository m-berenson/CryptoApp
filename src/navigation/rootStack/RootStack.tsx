import React from 'react'
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack'
import type { CMCCryptoCurrency } from '@/services/api/types'
import Details from '@/screens/details/Details'
import Home from '@/screens/home/Home'

type RootStackParamList = {
  Home: undefined
  Details: { id: CMCCryptoCurrency['id'] }
}

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>
export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen
        name='Details'
        component={Details}
        options={{ presentation: 'containedModal' }}
      />
    </Stack.Navigator>
  )
}

export default RootStack
